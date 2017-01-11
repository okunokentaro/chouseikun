import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {BehaviorSubject} from 'rxjs'

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Unknown
}

@Injectable()
export class AuthService {
  statusHasChanged = new BehaviorSubject<LoginStatus>(LoginStatus.Unknown)
  private loginStatus: LoginStatus

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.loginStatus = !!auth
        ? LoginStatus.LoggedIn
        : LoginStatus.NotLoggedIn
      this.statusHasChanged.next(this.loginStatus)
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
