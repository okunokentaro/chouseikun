import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'
import {AngularFire} from 'angularfire2'
import {Subject, Observable} from 'rxjs'

const crypto = require('crypto-browserify')

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Unknown
}

@Injectable()
export class AuthService {
  whenLoggedIn = new Subject<any>()
  whenLoggedOut = new Subject<any>()

  displayName: string
  uid: string
  photoURL: string

  private loginStatus: LoginStatus

  constructor(private af: AngularFire,
              private http: Http) {
    const user$  = new Subject<string[]>()
    const uids$ = new Subject<string[]>()

    this.af.auth.subscribe((res) => {
      this.loginStatus = !!res
        ? LoginStatus.LoggedIn
        : LoginStatus.NotLoggedIn

      if (this.statusIsLoggedIn()) {
        this.whenLoggedIn.next(null)

        this.displayName = res.auth.displayName
        this.uid         = res.uid
        this.photoURL    = res.auth.photoURL

        user$.next([this.uid, this.displayName])

      } else if (this.statusIsNotLoggedIn()) {
        this.whenLoggedOut.next(null)
      }
    })

    this.af.database.list('/users').subscribe((res) => {
      const uids = res.map((v) => v.$key)
      uids$.next(uids)
    })

    Observable.zip(user$, uids$).subscribe((values) => {
      const [uid, displayName] = values[0]
      const uids               = values[1]

      const userExists = uids.find((v) => v === uid)
      if (!userExists) {
        this.af.database.object(`/users/${uid}`).set({name: displayName})
      }
    })

    const decipher = (cipheredText: string): string => {
      const password = [location.hostname,location.port].join(':')
      const decipher = crypto.createDecipher('aes192', password)
      decipher.update(cipheredText, 'hex', 'utf8')
      return decipher.final('utf8')
    }

    const cipheredApiKeys = [
      '0fa9ad0f42b74489b73c5b59b2d26c2e',
      'cba4463038a3a336d4648b4dd3f946ea'
    ]
    const cipheredApiSecrets = [
      '68c1e34ff9c38ac9ca0ce74c2bec44fc',
      '491ea7a80ec84e23fa95687f41f35ae4',
      'aa4c3592311246fbea45bffe77f57413',
      '70dbc0be2f5f02cec7372d238ee48901'
    ]

    const apiKey    = cipheredApiKeys   .map((v) => decipher(v)).join('')
    const apiSecret = cipheredApiSecrets.map((v) => decipher(v)).join('')

    const credential = `${apiKey}:${apiSecret}`
    const headers = new Headers({'Authorization': `Basic ${credential}`});
    const options = new RequestOptions({headers});
    this.http.post('https://api.twitter.com/oauth2/token', {}, options)
    this.http.get('https://api.twitter.com/1.1/users/lookup.json')
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
