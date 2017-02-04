import {Injectable} from '@angular/core'

import {EventResponse} from './events-repository.service'
import {Event} from './event'

@Injectable()
export class EventAdapterService {

  constructor() { }

  adapt(res: EventResponse): Event {
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
