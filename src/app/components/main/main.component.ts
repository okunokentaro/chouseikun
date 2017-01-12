import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {
  UsersRepositoryService,
  User
} from '../../application/user/users-repository.service'
import {Subject} from "rxjs";

@Component({
  selector: 'ch-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  my: User
  events: any[]

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
        this.af.database.list(`/events`, {query}).subscribe((res) => {
          this.events = res
        })
      })
    })
  }

  ngOnInit() {
  }
}
