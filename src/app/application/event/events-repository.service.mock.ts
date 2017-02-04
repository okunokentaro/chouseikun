import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class EventsRepositoryServiceMock {

  getEvent$(): Observable<any> {
    return Observable.from([])
  }

}
