import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'

import {User} from '../../application/user/user'
import {EventsRepositoryService} from '../../application/event/events-repository.service'

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

  constructor(private events: EventsRepositoryService) {}

  ngOnInit() {
  }

  onSubmit() {
    if (!this.my) {
      return
    }

    const group = this.my.groups[parseInt(this.group, 10)]
    this.events.add(this.my.uid, this.name, group).then(() => {
      this.submit.emit(null)
      this.name = ''
    })
  }

  onClickCancelNewEvent() {
    this.cancel.emit(null)
  }
}
