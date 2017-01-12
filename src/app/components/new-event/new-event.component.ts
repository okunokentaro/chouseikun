import * as firebase from 'firebase'
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {uuidGen} from '../../utils/uuid-gen'
import {EVENTS_PATH} from '../main/main.component'
import {User} from '../../application/user/user'

@Component({
  selector: 'ch-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  name: string
  group: string

  @Input() my: User
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  constructor(private af: AngularFire) {}

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit(null)

    const group = this.my.groups[parseInt(this.group, 10)]
    if (this.my && group) {
      const uuid = uuidGen()
      this.af.database.object(`/${EVENTS_PATH}/${uuid}`).set({
        name    : this.name,
        group   : group,
        creator : this.my.uid,
        version : 1,
        created : firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.name = ''
      })
    }
  }

  onClickCancelNewEvent() {
    this.cancel.emit(null)
  }
}
