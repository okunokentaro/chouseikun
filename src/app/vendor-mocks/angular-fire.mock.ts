import {Injectable} from '@angular/core'
import {Subject} from 'rxjs/Subject'

@Injectable()
export class AngularFireMock {
  auth = new Subject()
  database = {
    list  : () => new Subject(),
    object: () => new Subject(),
  }
}
