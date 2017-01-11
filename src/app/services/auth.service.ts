import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

@Injectable()
export class AuthService {
  statusHasChanged = new Subject<boolean>()
  private isLoggedIn: boolean

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.isLoggedIn = !!auth
      this.statusHasChanged.next(this.isLoggedIn)
    })
  }

  login() {
    this.af.auth.login()
  }

  logout() {
    this.af.auth.logout()
  }
}
