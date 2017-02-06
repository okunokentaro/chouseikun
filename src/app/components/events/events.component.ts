import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Subject, Subscription} from 'rxjs/Rx'

import {User} from '../../application/user/user'
import {Event} from '../../application/event/event'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import { AnswerDraft } from '../../application/answer/answer-draft';

@Component({
  selector   : 'ch-events',
  templateUrl: './events.component.html',
  styleUrls  : ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  subscriptions = [] as Subscription[]
  my: User
  eventId: string
  event: Event
  answer: {[candidateId: string]: number}
  comment: string
  table: string[][]

  constructor(private route: ActivatedRoute,
              private usersRepository: UsersRepositoryService,
              private eventsRepository: EventsRepositoryService) {
    this.answer = {}
  }

  ngOnInit() {
    const eventId$ = new Subject<string>()
    eventId$.subscribe(eventId => {
      this.subscriptions.push(
        this.eventsRepository
          .getEvent$(eventId)
          .subscribe(v => {
            this.event = v
            this.table = this.event.getAnsweredTable()
            this.initAnswer()
          })
      )
    })

    this.subscriptions.push(
      this.route.params
        .map(p => p['id'])
        .subscribe(id => {
          this.eventId = id
          eventId$.next(this.eventId)
        })
    )

    this.subscriptions.push(
      this.usersRepository.myUser$
        .subscribe(my => {
          this.my = my
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onClickO(candidateId: string) {
    this.setAnswer(candidateId, 2)
  }

  onClickA(candidateId: string) {
    this.setAnswer(candidateId, 1)
  }

  onClickX(candidateId: string) {
    this.setAnswer(candidateId, 0)
  }

  onClickSend() {
    const draft = new AnswerDraft(
      this.my,
      this.event,
      this.answer,
      this.comment,
    )

    this.eventsRepository.sendAnswer(draft)
  }

  private initAnswer() {
    this.event.candidates.forEach(v => {
      this.setAnswer(v.id, 0)
    })
  }

  private setAnswer(candidateId: string, value: number) {
    this.answer[candidateId] = value
  }

}
