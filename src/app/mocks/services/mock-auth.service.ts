import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class MockAuthService {
  whenLoggedIn = new Subject<any>()
  whenLoggedOut = new Subject<any>()

  statusIsLoggedIn() {
    return false
  }

  statusIsNotLoggedIn() {
    return false
  }
}
