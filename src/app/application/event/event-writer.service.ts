import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {uuidGen} from '../../utils/uuid-gen'
import {EVENTS_PATH} from './event-const'
import {
  EventResponseV02, EventResponseV03,
  EventResponseV04
} from './event-response'
import {AnswerDraft} from '../answer/answer-draft';

export interface EventDraft {
  candidates: string
  comment   : string
  creator   : string
  due       : Date
  group     : string
  name      : string
}

const LATEST_VERSION = 4

const formatCandidates = (draft: EventDraft) => {
  return draft.candidates
    .split('\n')
    .reduce((output, v, idx) => {
      output[uuidGen()] = {
        value    : v,
        sortOrder: idx
      }
      return output
    }, {})
}

const eventPath = (eventId: string) => {
  return `/${EVENTS_PATH}/${eventId}`
}

@Injectable()
export class EventWriterService {

  constructor(private af: AngularFire) { }

  write(draft: EventDraft): firebase.Promise<void> {
    console.assert(!!draft && !!draft.group, 'draft.group is should not be undefined')

    const eventId = uuidGen()
    return this.af.database
      .object(eventPath(eventId))
      .set({
        creator   : draft.creator,
        name      : draft.name,
        group     : draft.group,
        due       : draft.due.getTime(),
        comment   : draft.comment,
        candidates: formatCandidates(draft),
        answers   : {},
        created   : firebase.database.ServerValue.TIMESTAMP,
        modified  : firebase.database.ServerValue.TIMESTAMP,
        version   : LATEST_VERSION,
      })
  }

  sendAnswer(draft: AnswerDraft): firebase.Promise<void> {
    draft.answers[draft.uid] = {
      answer : draft.answer,
      comment: draft.comment
    }

    return this.af.database
      .object(eventPath(draft.eventId))
      .update({
        answers : draft.answers,
        modified: firebase.database.ServerValue.TIMESTAMP,
      })
  }

  convert1to2(event: EventResponseV02) {
    this.af.database
      .object(eventPath(event.$key))
      .update({
        candidates: event.candidates,
        modified  : firebase.database.ServerValue.TIMESTAMP,
        version   : 2,
      })
  }

  convert2to3(event: EventResponseV03) {
    this.af.database
      .object(eventPath(event.$key))
      .update({
        answers : event.answers,
        modified: firebase.database.ServerValue.TIMESTAMP,
        version : 3,
      })
  }

  convert3to4(event: EventResponseV04) {
    this.af.database
      .object(eventPath(event.$key))
      .update({
        answers : event.answers,
        modified: firebase.database.ServerValue.TIMESTAMP,
        version : 4,
      })
  }

}
