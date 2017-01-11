import {Subject} from 'rxjs'

export class MockAuthService {
  statusHasChanged = new Subject()

  statusIsLoggedIn() {
    return false
  }

  statusIsNotLoggedIn() {
    return false
  }
}
