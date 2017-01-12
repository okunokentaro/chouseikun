import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class MockAngularFire {
  auth = new Subject()
  database = {
    list: () => new Subject()
  }
}
