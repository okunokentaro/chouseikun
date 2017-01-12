import {Component, OnInit} from '@angular/core'
const Cal = require('cal')

@Component({
  selector: 'ch-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const cal = new Cal({
      year: 2014,
      month: 12,
      date: 4,
      fromMonday: 1
    })

    console.log(cal.getDayArr())
    console.log(cal.getCalArr())
  }

}
