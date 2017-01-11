import {Component, OnInit} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.statusHasChanged.subscribe((v) => {this.isLoggedIn = v})
  }

  login() {
    this.auth.login()
  }

  logout() {
    this.auth.logout()
  }
}
