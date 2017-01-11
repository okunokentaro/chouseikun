import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Unknown
}

@Injectable()
export class AuthService {
  whenLoggedIn = new Subject<any>()
  whenLoggedOut = new Subject<any>()
  private loginStatus: LoginStatus

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.loginStatus = !!auth
        ? LoginStatus.LoggedIn
        : LoginStatus.NotLoggedIn

      if (this.statusIsLoggedIn()) {
        this.whenLoggedIn.next(null)
      } else if (this.statusIsNotLoggedIn()) {
        this.whenLoggedOut.next(null)
      }
    })
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
