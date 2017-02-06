import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Subject, Subscription} from 'rxjs/Rx'

import {User} from '../../application/user/user'
import {Event} from '../../application/event/event'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {
  AnswerDraft,
  AnswerModel
} from '../../application/answer/answer-draft';

@Component({
  selector   : 'ch-events',
  templateUrl: './events.component.html',
  styleUrls  : ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  subscriptions = [] as Subscription[]
  my         : User
  eventId    : string
  event      : Event
  answerModel: AnswerModel
  comment    : string
  table      : string[][]

  constructor(private route: ActivatedRoute,
              private usersRepository: UsersRepositoryService,
              private eventsRepository: EventsRepositoryService) {
    this.answerModel = {}
  }

  ngOnInit() {
    const eventId$ = new Subject<string>()
    eventId$.subscribe(eventId => {
      this.subscriptions.push(
        this.eventsRepository
          .getEvent$(eventId)
          .subscribe(event => {
            this.event = event
            this.table = this.event.getAnsweredTable()
            this.initAnswer(this.my, this.event)
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
          this.initAnswer(this.my, this.event)
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
      this.answerModel,
      this.comment,
    )

    this.eventsRepository.sendAnswer(draft)
  }

  private initAnswer(user: User, event: Event) {
    if (!user || !this.event.answeredUsers.find(u => u === user.uid)) {
      event.candidates.forEach(v => this.setAnswer(v.id, 0))
      return
    }
    const myAnswer = event.answers[user.uid].answer
    event.candidates.forEach(v => {
      const target = myAnswer.find(answer => answer.candidateId === v.id)
      this.setAnswer(v.id, target.value)
    })
  }

  private setAnswer(candidateId: string, value: number) {
    this.answerModel[candidateId] = value
  }

}
