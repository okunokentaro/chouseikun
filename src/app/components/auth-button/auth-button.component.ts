import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'ch-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  login() {
    this.auth.login()
  }

  logout() {
    this.auth.logout()
  }
}
