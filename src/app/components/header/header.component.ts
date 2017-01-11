import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {AuthService, LoginStatus} from '../../services/auth.service'

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginStatus: LoginStatus

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.auth.statusHasChanged.subscribe((v) => {
      this.loginStatus = v
      if (this.statusIsNotLoggedIn()) {
        this.router.navigate([''])
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
