import {Component, OnInit, OnDestroy} from '@angular/core'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {Router} from '@angular/router'

import {AuthService} from '../../services/auth.service'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {User} from '../../application/user/user'
import {Event} from '../../application/event/event'

type ScreenState = 'Main' | 'NewEvent'

@Component({
  selector   : 'ch-main',
  templateUrl: './main.component.html',
  styleUrls  : ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  my: User
  events: Event[]
  screenState: ScreenState
  subscriptions: Subscription[]

  constructor(private usersRepository: UsersRepositoryService,
              private auth: AuthService,
              private router: Router,
              private eventsRepository: EventsRepositoryService) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth
        .whenLoggedOut$
        .subscribe(() => this.router.navigate(['']))
    )

    const groups$ = new Subject<string[]>()
    groups$.subscribe(groups => {
      this.subscriptions.push(
        this.eventsRepository
          .getEventsByGroups$(groups)
          .subscribe(v => this.events = v)
      )
    })

    this.subscriptions.push(
      this.usersRepository.myUser$.subscribe(my => {
        this.my = my
        groups$.next(my.groups)
      })
    )

    this.screenState = 'Main'
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onClickNewEvent() {
    this.screenState = 'NewEvent'
  }

  onSubmit() {
    this.screenState = 'Main'
  }

  onClickCancelNewEvent() {
    this.screenState = 'Main'
  }

  onClickEvent(event: Event) {
    this.router.navigate(['events', event.eventId])
  }
}
