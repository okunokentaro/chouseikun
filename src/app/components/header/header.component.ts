import {Component, OnInit, Input} from '@angular/core'

import {User} from '../../application/user/user'

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() my: User

  ngOnInit() {}
}
