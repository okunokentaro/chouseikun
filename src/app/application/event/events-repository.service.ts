import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {uuidGen} from '../../utils/uuid-gen'

export const EVENTS_PATH = 'events'

@Injectable()
export class EventsRepositoryService {
  constructor(private af: AngularFire) { }

  add(creator: string,
      name: string,
      group: string): firebase.Promise<void> {
    console.assert(!!group, 'group is should not be undefined')

    const uuid = uuidGen()
    return this.af.database.object(`/${EVENTS_PATH}/${uuid}`).set({
      creator,
      name,
      group,
      created : firebase.database.ServerValue.TIMESTAMP,
      modified: firebase.database.ServerValue.TIMESTAMP,
      version : 1,
    })
  }
}
