import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {Subject} from 'rxjs/Rx'
import {ReplaySubject} from 'rxjs/Rx'
import {Observable} from 'rxjs/Rx'
import {
  AngularFire, FirebaseAuthState,
  FirebaseListObservable
} from 'angularfire2'

import {User, PartialUser} from './user'

const USERS_PATH = 'users'

const getTwitterId = (google: any): string => {
  return google.uid
}

const myUserFromAuthState = (state: FirebaseAuthState): PartialUser => {
  return {
    name    : state.auth.displayName,
    uid     : state.uid,
    photoURL: state.auth.photoURL,
    googleId: getTwitterId(state.google)
  }
}

@Injectable()
export class UsersRepositoryService {
  myUser$ = new ReplaySubject<User>()
  private uids$ = new Subject<string[]>()

  constructor(private af: AngularFire) {
    this.af.database
      .list(`/${USERS_PATH}`)
      .subscribe(res => {
        const uids = res.map(v => v.$key)
        this.uids$.next(uids)
      })
  }

  prepareResisterUser(auth$: Subject<FirebaseAuthState>) {
    Observable.zip(auth$, this.uids$)
      .subscribe(values => {
        const [state, uids] = values

        const my = myUserFromAuthState(state)

        const userExists = uids.find(v => v === my.uid)
        if (!userExists) {
          this.addUser(my)
          return
        }
        this.fetchMyUser(my.uid)
      })
  }

  getUsers$(): FirebaseListObservable<any[]> {
    return this.af.database
      .list(`/${USERS_PATH}`)
  }

  private addUser(user: PartialUser) {
    this.af.database
      .object(`/${USERS_PATH}/${user.uid}`)
      .set({
        name    : user.name,
        googleId: user.googleId,
        photoURL: user.photoURL,
        version : 1,
        created : firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP,
      }).then(() => {
        this.fetchMyUser(user.uid)
      })
  }

  private fetchMyUser(uid: string) {
    this.af.database
      .list(`/${USERS_PATH}/${uid}`)
      .subscribe(res => {
        const my = res.reduce((obj, v) => {
          obj[v.$key] = !!v.$value
            ? v.$value
            : Object.keys(v).filter((key) => !/^\$/.test(key))
          return obj
        }, {})
        my.uid = uid
        this.myUser$.next(my)
      })
  }
}
