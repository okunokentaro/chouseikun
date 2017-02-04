import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {ReplaySubject} from 'rxjs/ReplaySubject'
import {Observable} from 'rxjs/Observable'

import {Event} from './event'
import {EventWriterService, EventDraft} from './event-writer.service'
import {EventAdapterService} from './event-adapter.service'

type CandidatesResponse = {[id: string]: string} | undefined

export interface EventResponse {
  candidates: CandidatesResponse
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
}

export const EVENTS_PATH = 'events'

@Injectable()
export class EventsRepositoryService {
  constructor(private af: AngularFire,
              private writer: EventWriterService,
              private adapter: EventAdapterService) {}

  add(draft: EventDraft): firebase.Promise<void> {
    return this.writer.write(draft)
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
