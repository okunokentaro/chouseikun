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
  due: Date
  comment: string
  rawCandidates: string

  @Input() my: User
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  constructor(private events: EventsRepositoryService) {}

  ngOnInit() {
    this.initDue()
  }

  onSubmit() {
    if (!this.my) {
      return
    }

    const draft = {
      creator: this.my.uid,
      name   : this.name,
      group  : this.my.groups[parseInt(this.group, 10)],
      due    : this.due,
      comment: this.comment,
      candidates: this.rawCandidates.split('/n')
    }

    this.events.add(draft).then(() => {
      this.submit.emit(null)
      this.name = ''
    })
  }

  onClickCancelNewEvent() {
    this.cancel.emit(null)
  }

  private initDue() {
    const date = new Date()
    date.setDate(date.getDate() + 7) // one week later
    this.due = date
  }
}
