import {Component, OnInit} from '@angular/core'
import {Subject} from 'rxjs'
import {Router} from '@angular/router'

import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {User} from '../../application/user/user'
import {AuthService} from '../../services/auth.service'
import {EventsRepositoryService} from '../../application/event/events-repository.service'

type ScreenState = 'Main' | 'NewEvent'

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  my: User
  events: any[]
  screenState: ScreenState

  constructor(private usersRepository: UsersRepositoryService,
              private auth: AuthService,
              private router: Router,
              private eventsRepository: EventsRepositoryService) {
    const groups$ = new Subject<string[]>()

    this.usersRepository.myUser$.subscribe(my => {
      this.my = my
      groups$.next(my.groups)
    })

    groups$.subscribe((groups) => {
      this.eventsRepository
        .eventsByGroups$(groups)
        .subscribe(events => this.events = events)
    })
  }

  ngOnInit() {
    this.auth.whenLoggedOut.subscribe(() => {
      this.router.navigate([''])
    })

    this.screenState = 'Main'
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

  onClickEvent(event: any) {
    this.router.navigate(['event', event.$key])
  }
}
