import {Injectable} from '@angular/core'

import {Event} from './event'
import {EventWriterService} from './event-writer.service'
import {
  EventResponse,
  EventResponseV02,
  EventResponseV03
} from './event-response'

@Injectable()
export class EventAdapterService {

  constructor(private writer: EventWriterService) {}

  adapt(res: EventResponse): Event {
    const v2Res: EventResponseV02 = this.convert1to2(res)
    const v3Res: EventResponseV03 = this.convert2to3(v2Res)

    const candidates = (() => {
      if (!v3Res.candidates) {
        return []
      }
      return Object.keys(v3Res.candidates)
        .reduce((output, v) => {
          output.push({
            id       : v,
            value    : v3Res.candidates[v].value,
            sortOrder: v3Res.candidates[v].sortOrder
          })
          return output
        }, [])
    })()

    const candidatesSorted = candidates.sort((a, b) => {
      return a.sortOrder - b.sortOrder
    })

    const adapted = {
      candidates: candidatesSorted,
      comment   : v3Res.comment,
      created   : v3Res.created,
      creator   : v3Res.creator,
      due       : v3Res.due,
      group     : v3Res.group,
      modified  : v3Res.modified,
      name      : v3Res.name,
      version   : v3Res.version,
      eventId   : v3Res.$key,
      answers   : v3Res.answers || {},
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
    const retVal = Object.assign({}, res) as EventResponseV02
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

    const retVal = res as EventResponseV03
    if (currentVersion === 2) {
      this.writer.convert2to3(retVal)
      retVal.version += 1
    }

    return retVal
  }

}
