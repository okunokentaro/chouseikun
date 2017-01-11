import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe((auth) => {
      if (auth && auth.uid) {
        console.log(1)
      } else {
        console.log(0)
      }
    })
  }

  login() {
    this.af.auth.login()
  }

  logout() {
    this.af.auth.logout()
  }
}
