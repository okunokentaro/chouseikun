import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'ch-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {
  constructor(public auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.auth.whenLoggedIn.subscribe(() => {
      this.router.navigate(['main'])
    })
  }
}
