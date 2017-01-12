import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'
import {Router} from '@angular/router'

import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {User} from '../../application/user/user'
import {AuthService} from '../../services/auth.service'
import {EVENTS_PATH} from '../../application/event/events-repository.service'

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

  constructor(private af: AngularFire,
              private users: UsersRepositoryService,
              private auth: AuthService,
              private router: Router) {
    const groups$ = new Subject<string[]>()

    this.users.myUser$.subscribe((my) => {
      this.my = my
      groups$.next(my.groups)
    })

    groups$.subscribe((groups) => {
      groups.forEach((groupId) => {
        const query = {orderByChild: 'group', equalTo: groupId}
        this.af.database.list(`/${EVENTS_PATH}`, {query}).subscribe((res) => {
          this.events = res
        })
      })
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
}
