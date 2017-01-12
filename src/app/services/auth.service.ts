import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject, Observable} from 'rxjs'

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Unknown
}

type Personal = {
  uid: string
  name: string
  photoURL: string
  twitterId: string
}

@Injectable()
export class AuthService {
  whenLoggedIn = new Subject<any>()
  whenLoggedOut = new Subject<any>()

  displayName: string
  uid: string
  photoURL: string

  private loginStatus: LoginStatus

  constructor(private af: AngularFire) {
    const personal$ = new Subject<Personal>()
    const uids$ = new Subject<string[]>()

    this.af.auth.subscribe((res) => {
      this.loginStatus = !!res
        ? LoginStatus.LoggedIn
        : LoginStatus.NotLoggedIn

      if (this.statusIsLoggedIn()) {
        this.whenLoggedIn.next(null)

        console.log(res.twitter)
        this.displayName = res.auth.displayName
        this.uid         = res.uid
        this.photoURL    = res.auth.photoURL

        personal$.next({
          uid      : this.uid,
          name     : this.displayName,
          photoURL : this.photoURL,
          twitterId: res.twitter.uid
        })

      } else if (this.statusIsNotLoggedIn()) {
        this.whenLoggedOut.next(null)
      }
    })

    this.af.database.list('/users').subscribe((res) => {
      const uids = res.map((v) => v.$key)
      uids$.next(uids)
    })

    Observable.zip(personal$, uids$).subscribe((values) => {
      const [personal, uids] = values

      const userExists = uids.find((v) => v === personal.uid)
      if (!userExists) {
        this.af.database.object(`/users/${personal.uid}`).set({
          name      : personal.name,
          twitterId : personal.twitterId,
          photoURL  : personal.photoURL,
          version   : 1,
          created   : firebase.database.ServerValue.TIMESTAMP,
          modified  : firebase.database.ServerValue.TIMESTAMP
        })
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
