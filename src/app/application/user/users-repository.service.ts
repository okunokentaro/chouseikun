import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {Subject, Observable} from 'rxjs'
import {AngularFire, FirebaseAuthState} from 'angularfire2'

export type User = {
  uid: string
  name: string
  photoURL: string
  twitterId: string
}

const USERS_PATH = 'users'

const getTwitterId = (twitter: any): string => {
  return !!twitter.uid
    ? twitter.uid
    : twitter.accessToken.split('-')[0]
}

const getMyUser = (state: FirebaseAuthState): User => {
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

      const my = getMyUser(state)
      this.myUser$.next(my)

      const userExists = uids.find((v) => v === my.uid)
      if (!userExists) {
        this.addUser(my)
      }
    })
  }

  private addUser(user: User) {
    this.af.database.object(`/${USERS_PATH}/${user.uid}`).set({
      name      : user.name,
      twitterId : user.twitterId,
      photoURL  : user.photoURL,
      version   : 1,
      created   : firebase.database.ServerValue.TIMESTAMP,
      modified  : firebase.database.ServerValue.TIMESTAMP
    })
  }
}
