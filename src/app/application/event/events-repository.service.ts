import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Observable, ReplaySubject} from 'rxjs/Rx'

import {Event} from './event'
import {EventWriterService, EventDraft} from './event-writer.service'
import {EventAdapterService} from './event-adapter.service'
import {EventResponse} from './event-response'
import {EVENTS_PATH} from './event-const'
import {AnswerDraft} from '../answer/answer-draft';

@Injectable()
export class EventsRepositoryService {
  constructor(private af: AngularFire,
              private writer: EventWriterService,
              private adapter: EventAdapterService) {}

  add(draft: EventDraft): firebase.Promise<void> {
    return this.writer.write(draft)
  }

  sendAnswer(draft: AnswerDraft) {
    return this.writer.sendAnswer(draft)
  }

  getEventsByGroups$(groups: string[]): Observable<Event[]> {
    const events$ = new ReplaySubject<Event[]>()

    if (!groups || groups.length < 1) {
      return events$
    }

    groups.forEach(groupId => {
      const query = {orderByChild: 'group', equalTo: groupId}
      this.af.database
        .list(`/${EVENTS_PATH}`, {query})
        .map((res: EventResponse[]) => res.map(v => this.adapter.adapt(v)))
        .subscribe(res => events$.next(res))
    })

    return events$
  }

  getEvent$(eventId: string): Observable<Event> {
    return this.af.database
      .object(`/${EVENTS_PATH}/${eventId}`)
      .map((res: EventResponse) => this.adapter.adapt(res))
  }
}
