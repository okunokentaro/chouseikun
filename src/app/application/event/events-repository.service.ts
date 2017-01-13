import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

import {uuidGen} from '../../utils/uuid-gen'

export interface EventDraft {
  creator: string
  name: string
  group: string
  due: Date
  comment: string
  candidates: string[]
}

export const EVENTS_PATH = 'events'

@Injectable()
export class EventsRepositoryService {
  constructor(private af: AngularFire) { }

  add(draft: EventDraft): firebase.Promise<void> {
    console.assert(!!draft && !!draft.group, 'draft.group is should not be undefined')

    const uuid = uuidGen()
    return this.af.database.object(`/${EVENTS_PATH}/${uuid}`).set({
      creator : draft.creator,
      name    : draft.name,
      group   : draft.group,
      due     : draft.due.getTime(),
      comment : draft.comment,
      created : firebase.database.ServerValue.TIMESTAMP,
      modified: firebase.database.ServerValue.TIMESTAMP,
      version : 1,
    })
  }

  eventsByGroups$(groups): Subject<any[]> {
    const events$ = new Subject<any[]>()

    groups.forEach((groupId) => {
      const query = {orderByChild: 'group', equalTo: groupId}
      this.af.database.list(`/${EVENTS_PATH}`, {query}).subscribe((res) => {
        events$.next(res)
      })
    })

    return events$
  }
}