import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Subject} from 'rxjs/Subject'

import {User} from '../../application/user/user'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {EventsRepositoryService} from '../../application/event/events-repository.service'

@Component({
  selector   : 'ch-events',
  templateUrl: './events.component.html',
  styleUrls  : ['./events.component.css']
})
export class EventsComponent implements OnInit {
  my: User
  eventId: string
  event$: any

  constructor(private route: ActivatedRoute,
              private usersRepository: UsersRepositoryService,
              private eventsRepository: EventsRepositoryService) {
  }

  ngOnInit() {
    const eventId$ = new Subject<string>()
    eventId$.subscribe(eventId => {
      this.event$ = this.eventsRepository.getEvent$(eventId)
    })

    this.route.params
      .map(p => p['id'])
      .subscribe(id => {
        this.eventId = id
        eventId$.next(this.eventId)
      })

    this.usersRepository.myUser$.subscribe(my => {
      this.my = my
    })
  }

}
