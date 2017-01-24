import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'

import {User} from '../../application/user/user'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {DAYS_OF_WEEK} from '../calendar/calendar.component'

const getLabel = (date: Date) => {
  const dowStr = DAYS_OF_WEEK[date.getDay()]
  return `${date.getMonth() + 1}/${date.getDate()}（${dowStr}） 19:00〜`
}

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
  candidates: string

  @Input() my: User
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  constructor(private events: EventsRepositoryService) {}

  ngOnInit() {
    this.candidates = ''
    this.initDue()
  }

  onSubmit() {
    if (!this.my) {
      return
    }

    const draft = {
      creator   : this.my.uid,
      name      : this.name,
      group     : this.my.groups[parseInt(this.group, 10)],
      due       : this.due,
      comment   : this.comment,
      candidates: this.candidates
    }

    this.events.add(draft).then(() => {
      this.submit.emit(null)
      this.name = ''
    })
  }

  onClickCancelNewEvent() {
    this.cancel.emit(null)
  }

  onClickDate(ev: {$event: MouseEvent, date: Date}) {
    const date = ev.date
    const label = getLabel(date)

    this.candidates = (() => {
      const tmp = this.candidates.split('\n')
      tmp.push(label)
      return tmp.filter((v) => !!v).join('\n')
    })()
  }

  private initDue() {
    const date = new Date()
    date.setDate(date.getDate() + 7) // one week later
    this.due = date
  }
}
