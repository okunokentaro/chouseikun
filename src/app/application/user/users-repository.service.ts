import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {Subject, Observable} from 'rxjs'
import {AngularFire, FirebaseAuthState} from 'angularfire2'

export type PartialUser = {
  uid: string
  name: string
  photoURL: string
  twitterId: string
}

export type User = PartialUser & {
  groups: string[]
  created: number
  modified: number
  version: number
}

const USERS_PATH = 'users'

const getTwitterId = (twitter: any): string => {
  return !!twitter.uid
    ? twitter.uid
    : twitter.accessToken.split('-')[0]
}

const myUserFromAuthState = (state: FirebaseAuthState): PartialUser => {
  return {
    name     : state.auth.displayName,
    uid      : state.uid,
    photoURL : state.auth.photoURL,
    twitterId: getTwitterId(state.twitter)
  }
}

@Injectable()
export class UsersRepositoryService {
  myUser$ = new Subject<User>()
  private uids$ = new Subject<string[]>()

  constructor(private af: AngularFire) {
    this.af.database.list(`/${USERS_PATH}`).subscribe((res) => {
      const uids = res.map((v) => v.$key)
      this.uids$.next(uids)
    })
  }

  prepareResisterUser(auth$: Subject<FirebaseAuthState>) {
    Observable.zip(auth$, this.uids$).subscribe((values) => {
      const [state, uids] = values

      const my = myUserFromAuthState(state)

      const userExists = uids.find((v) => v === my.uid)
      if (!userExists) {
        this.addUser(my)
        return
      }
      this.getMyUser(my.uid)
    })
  }

  private addUser(user: PartialUser) {
    this.af.database.object(`/${USERS_PATH}/${user.uid}`).set({
      name      : user.name,
      twitterId : user.twitterId,
      photoURL  : user.photoURL,
      version   : 1,
      created   : firebase.database.ServerValue.TIMESTAMP,
      modified  : firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      this.getMyUser(user.uid)
    })
  }

  private getMyUser(uid: string) {
    this.af.database.list(`/${USERS_PATH}/${uid}`).subscribe((res) => {
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
