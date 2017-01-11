import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {LoginStatus, AuthService} from '../../services/auth.service'

@Component({
  selector: 'ch-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {
  loginStatus: LoginStatus

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.auth.statusHasChanged.subscribe((v) => {
      this.loginStatus = v
      if (this.statusIsLoggedIn()) {
        this.router.navigate(['main'])
      }
    })
  }

  login() {
    this.auth.login()
  }

  logout() {
    this.auth.logout()
  }

  statusIsLoggedIn(): boolean {
    return this.loginStatus === LoginStatus.LoggedIn
  }

  statusIsNotLoggedIn(): boolean {
    return this.loginStatus === LoginStatus.NotLoggedIn
  }

  statusIsUnknown(): boolean {
    return this.loginStatus === LoginStatus.Unknown
  }
}
