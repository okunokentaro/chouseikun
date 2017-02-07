import {Injectable} from '@angular/core'

import {Event} from './event'
import {EventResponse} from './event-response'

@Injectable()
export class EventAdapterService {

  constructor() {}

  adapt(res: EventResponse): Event {
    const candidates = (() => {
      if (!res.candidates) {
        return []
      }
      return Object.keys(res.candidates)
        .reduce((output, candidateId) => {
          output.push({
            candidateId,
            contents : res.candidates[candidateId].contents,
            sortOrder: res.candidates[candidateId].sortOrder
          })
          return output
        }, [])
    })()

    const candidatesSorted = candidates.sort((a, b) => {
      return a.sortOrder - b.sortOrder
    })

    const adapted = {
      candidates: candidatesSorted,
      comment   : res.comment,
      created   : res.created,
      creator   : res.creator,
      due       : res.due,
      group     : res.group,
      modified  : res.modified,
      name      : res.name,
      version   : res.version,
      eventId   : res.$key,
      answers   : res.answers || {},
    }

    return new Event(adapted)
  }

}
