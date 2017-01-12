import * as firebase from 'firebase'
import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

import {
  UsersRepositoryService,
  User
} from '../../application/user/users-repository.service'
import {uuidGen} from '../../utils/uuid-gen'

type ScreenState = 'Main' | 'NewEvent'

const EVENTS_PATH = 'events'

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  my: User
  events: any[]
  screenState: ScreenState
  eventName: string

  constructor(private af: AngularFire,
              private users: UsersRepositoryService) {
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
    this.screenState = 'Main'
  }

  onClickNewEvent() {
    this.screenState = 'NewEvent'
  }

  onSubmit() {
    this.screenState = 'Main'

    if (this.my) {
      const uuid = uuidGen()
      this.af.database.object(`/${EVENTS_PATH}/${uuid}`).set({
        name    : this.eventName,
        group   : this.my.groups[0],
        creator : this.my.uid,
        version : 1,
        created : firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.eventName = ''
      })
    }
  }

  onClickCancelNewEvent() {
    this.screenState = 'Main'
  }
}
