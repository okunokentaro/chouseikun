import {Injectable} from '@angular/core'

import {Event} from './event'
import {EventWriterService} from './event-writer.service'
import {EventResponse, EventResponseV2} from './event-response'

@Injectable()
export class EventAdapterService {

  constructor(private writer: EventWriterService) {}

  adapt(res: EventResponse): Event {
    const v2Res: EventResponseV2 = this.convert1to2(res)

    const candidates = (() => {
      if (!v2Res.candidates) {
        return []
      }
      return Object.keys(v2Res.candidates)
        .reduce((output, v) => {
          output.push({
            id       : v,
            value    : v2Res.candidates[v].value,
            sortOrder: v2Res.candidates[v].sortOrder
          })
          return output
        }, [])
    })()

    const candidatesSorted = candidates.sort((a, b) => {
      return a.sortOrder - b.sortOrder
    })

    const adapted = {
      candidates: candidatesSorted,
      comment   : v2Res.comment,
      created   : v2Res.created,
      creator   : v2Res.creator,
      due       : v2Res.due,
      group     : v2Res.group,
      modified  : v2Res.modified,
      name      : v2Res.name,
      version   : v2Res.version,
      eventId   : v2Res.$key,
    }

    return new Event(adapted)
  }

  private convert1to2(res: EventResponse): EventResponseV2 {
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
    const retVal = Object.assign({}, res) as EventResponseV2
    retVal.candidates = candidates

    if (res.version === 1) {
      this.writer.convert1to2(retVal)
    }

    return retVal
  }

}
