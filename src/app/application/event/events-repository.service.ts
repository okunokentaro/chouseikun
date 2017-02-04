import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {ReplaySubject, Observable} from 'rxjs'

import {uuidGen} from '../../utils/uuid-gen'
import {Event} from './event'

export interface EventDraft {
  candidates: string
  comment   : string
  creator   : string
  due       : Date
  group     : string
  name      : string
}

type CandidatesResponse = {[id: string]: string} | undefined

interface EventResponse {
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

const formatCandidates = (draft: EventDraft) => {
  return draft.candidates
    .split('\n')
    .reduce((output, v) => {
      output[uuidGen()] = v
      return output
    }, {})
}

@Injectable()
export class EventsRepositoryService {
  constructor(private af: AngularFire) {
  }

  add(draft: EventDraft): firebase.Promise<void> {
    console.assert(!!draft && !!draft.group, 'draft.group is should not be undefined')

    return this.af.database
      .object(`/${EVENTS_PATH}/${uuidGen()}`)
      .set({
        creator   : draft.creator,
        name      : draft.name,
        group     : draft.group,
        due       : draft.due.getTime(),
        comment   : draft.comment,
        candidates: formatCandidates(draft),
        created   : firebase.database.ServerValue.TIMESTAMP,
        modified  : firebase.database.ServerValue.TIMESTAMP,
        version   : 1,
      })
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
        .map((res: EventResponse[]) => res.map(v => this.adapt(v)))
        .subscribe(res => events$.next(res))
    })

    return events$
  }

  getEvent$(eventId: string): Observable<Event> {
    return this.af.database
      .object(`/${EVENTS_PATH}/${eventId}`)
      .map((res: EventResponse) => this.adapt(res))
  }

  private adapt(res: EventResponse): Event {
    const candidates = (() => {
      if (!res.candidates) {
        return []
      }
      return Object.keys(res.candidates)
        .reduce((output, v) => {
          output.push({id: v, value: res.candidates[v]})
          return output
        }, [])
    })()

    const adapted = {
      candidates,
      comment : res.comment,
      created : res.created,
      creator : res.creator,
      due     : res.due,
      group   : res.group,
      modified: res.modified,
      name    : res.name,
      version : res.version,
      eventId : res.$key,
    }

    return new Event(adapted)
  }
}
