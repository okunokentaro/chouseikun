import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class EventsRepositoryServiceMock {

  getEvent$(): Observable<any> {
    return Observable.from([])
  }

}
