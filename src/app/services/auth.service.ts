import {Injectable} from '@angular/core'
import {AngularFire, FirebaseAuthState} from 'angularfire2'
import {Subject, Observable} from 'rxjs'

import {UsersRepositoryService} from '../application/user/users-repository.service'
import {User} from '../application/user/user'

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Unknown
}

@Injectable()
export class AuthService {
  whenLoggedIn = new Subject<any>()
  whenLoggedOut = new Subject<any>()

  my: User

  private loginStatus: LoginStatus

  constructor(private af: AngularFire,
              private usersRepository: UsersRepositoryService) {
    const state$ = new Subject<FirebaseAuthState>()

    this.af.auth.subscribe((state) => {
      this.loginStatus = !!state
        ? LoginStatus.LoggedIn
        : LoginStatus.NotLoggedIn

      if (this.statusIsLoggedIn()) {
        this.whenLoggedIn.next(null)
        state$.next(state)

      } else if (this.statusIsNotLoggedIn()) {
        this.whenLoggedOut.next(null)
      }
    })

    this.usersRepository.prepareResisterUser(state$)
    this.usersRepository.myUser$.subscribe((my) => this.my = my)
  }

  login() {
    this.af.auth.login()
  }

  logout() {
    this.af.auth.logout()
  }

  statusIsLoggedIn(): boolean {
    return this.loginStatus === LoginStatus.LoggedIn
  }

  statusIsNotLoggedIn(): boolean {
    return this.loginStatus === LoginStatus.NotLoggedIn
  }

  statusIsUnknown(): boolean {
    return this.loginStatus === LoginStatus.Unknown
  }
}
