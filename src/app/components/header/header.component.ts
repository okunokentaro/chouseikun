import {Component, OnInit} from '@angular/core'

import {AuthService, LoginStatus} from '../../services/auth.service'

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginStatus: LoginStatus

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.statusHasChanged.subscribe((v) => this.loginStatus = v)
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
