import {Subject} from 'rxjs'

export class MockAuthService {
  statusHasChanged = new Subject()
}
