import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {uuidGen} from '../../utils/uuid-gen'
import {EVENTS_PATH} from './events-repository.service'

export interface EventDraft {
  candidates: string
  comment   : string
  creator   : string
  due       : Date
  group     : string
  name      : string
}

const formatCandidates = (draft: EventDraft) => {
  return draft.candidates
    .split('\n')
    .reduce((output, v) => {
      output[uuidGen()] = v
      return output
    }, {})
}

@Injectable()
export class EventWriterService {

  constructor(private af: AngularFire) { }

  write(draft: EventDraft): firebase.Promise<void> {
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

}
