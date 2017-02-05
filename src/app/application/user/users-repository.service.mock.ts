import {Injectable} from '@angular/core'
import {ReplaySubject} from 'rxjs/Rx'

import {User} from './user'

@Injectable()
export class UsersRepositoryServiceMock {

  myUser$ = new ReplaySubject<User>()

  prepareResisterUser() {
    //
  }

}
