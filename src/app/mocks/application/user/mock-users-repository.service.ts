import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class MockUsersRepositoryService {
  myUser$ = new Subject<any>()

  prepareResisterUser() {
  }

}
