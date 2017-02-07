import {Injectable} from '@angular/core'

import {Event} from './event'
import {EventWriterService} from './event-writer.service'
import {
  EventResponse, EventResponseV02,
  EventResponseV03, EventResponseV04
} from './event-response'

@Injectable()
export class EventAdapterService {

  constructor(private writer: EventWriterService) {}

  adapt(res: EventResponse): Event {
    const v2Res: EventResponseV02 = this.convert1to2(res)
    const v3Res: EventResponseV03 = this.convert2to3(v2Res)
    const v4Res: EventResponseV04 = this.convert3to4(v3Res)

    const candidates = (() => {
      if (!v4Res.candidates) {
        return []
      }
      return Object.keys(v4Res.candidates)
        .reduce((output, v) => {
          output.push({
            id       : v,
            value    : v4Res.candidates[v].value,
            sortOrder: v4Res.candidates[v].sortOrder
          })
          return output
        }, [])
    })()

    const candidatesSorted = candidates.sort((a, b) => {
      return a.sortOrder - b.sortOrder
    })

    const adapted = {
      candidates: candidatesSorted,
      comment   : v4Res.comment,
      created   : v4Res.created,
      creator   : v4Res.creator,
      due       : v4Res.due,
      group     : v4Res.group,
      modified  : v4Res.modified,
      name      : v4Res.name,
      version   : v4Res.version,
      eventId   : v4Res.$key,
      answers   : v4Res.answers || {},
    }

    return new Event(adapted)
  }

  private convert1to2(res: EventResponse): EventResponseV02 {
    const currentVersion = res.version

    const candidates = (() => {
      if (res.version === 1) {
        if (!res.candidates) {
          return {}
        }
        return Object.keys(res.candidates).reduce((output, v, idx) => {
          output[v] = {
            value    : res.candidates[v],
            sortOrder: idx,
          }
          return output
        }, {})
      }
      return res.candidates
    })()

    delete res.candidates
    const retVal = Object.assign({}, res) as any as EventResponseV02
    retVal.candidates = candidates

    if (currentVersion === 1) {
      this.writer.convert1to2(retVal)
      retVal.version += 1
    }

    return retVal
  }

  private convert2to3(res: EventResponse): EventResponseV03 {
    const currentVersion = res.version

    res.answers = res.answers || {}

    const retVal = res as any as EventResponseV03
    if (currentVersion === 2) {
      this.writer.convert2to3(retVal)
      retVal.version += 1
    }

    return retVal
  }

  private convert3to4(res: EventResponse): EventResponseV04 {
    const currentVersion = res.version

    res.answers = Object.keys(res.answers).reduce((output, userId) => {
      const answer   = res.answers[userId].answer
      const comment  = res.answers[userId].comment
      output[userId] = {
        answer: {
          candidateId: answer.candidateId,
          chosen:      answer.value,
        },
        comment,
      }
      return output
    }, {})

    const retVal = res as any as EventResponseV04
    if (currentVersion === 3) {
      this.writer.convert3to4(retVal)
      retVal.version += 1
    }

    return retVal
  }

}
