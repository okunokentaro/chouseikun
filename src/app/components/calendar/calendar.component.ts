import {Component, OnInit} from '@angular/core'
const Cal = require('cal.js')

@Component({
  selector: 'ch-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const date = new Date()
    const cal  = new Cal({
      year      : date.getFullYear(),
      month     : date.getMonth() + 1,
      date      : date.getDate(),
      fromMonday: true
    })

    console.log(cal.getDayArr())
    console.log(cal.getCalArr())
  }

}
