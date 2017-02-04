import {Injectable} from '@angular/core'
import {ReplaySubject} from 'rxjs/ReplaySubject'

import {User} from './user'

@Injectable()
export class UsersRepositoryServiceMock {

  myUser$ = new ReplaySubject<User>()

  prepareResisterUser() {
    //
  }

}
