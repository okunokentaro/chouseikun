import * as firebase from 'firebase'
import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'
import {FormGroup, FormControl} from '@angular/forms'

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
  eventFormGroup: FormGroup

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

    this.eventFormGroup = new FormGroup({
      name         : new FormControl(),
      selectedGroup: new FormControl()
    });
  }

  ngOnInit() {
    this.screenState = 'Main'
  }

  onClickNewEvent() {
    this.screenState = 'NewEvent'
  }

  onSubmit() {
    this.screenState = 'Main'

    const group = this.my.groups[parseInt(this.eventFormGroup.value.selectedGroup, 10)]
    if (this.my && group) {
      const uuid = uuidGen()
      console.log(this.eventFormGroup.value.selectedGroup)
      this.af.database.object(`/${EVENTS_PATH}/${uuid}`).set({
        name    : this.eventFormGroup.value.name,
        group   : group,
        creator : this.my.uid,
        version : 1,
        created : firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.eventFormGroup.value.name = ''
      })
    }
  }

  onClickCancelNewEvent() {
    this.screenState = 'Main'
  }
}
