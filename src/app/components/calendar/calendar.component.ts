import {Component, OnInit, Output, EventEmitter} from '@angular/core'
const Cal = require('cal.js')

const getLastMonth = () => {
  const first = this.weeks[0][0]
  const date = new Date(`${first.YYYY}-${first.MM}-${first.DD}`)
  if (first.isLastMonth) {
    return date
  }
  date.setMonth(date.getMonth() - 1)
  return date
}

const getNextMonth = () => {
  const last = this.weeks[5][6]
  const date = new Date(`${last.YYYY}-${last.MM}-${last.DD}`)
  if (last.isNextMonth) {
    return date
  }
  date.setMonth(date.getMonth() + 1)
  return date
}

@Component({
  selector: 'ch-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  daysOfWeek: any[]
  weeks: any[][]
  label: string
  @Output() clickDate = new EventEmitter()

  constructor() { }

  ngOnInit() {
    this.initCalendar(new Date())
  }

  onClickToLastMonth() {
    this.initCalendar(getLastMonth())
  }

  onClickToNextMonth() {
    this.initCalendar(getNextMonth())
  }

  onClickDate($event: MouseEvent, d: any) {
    const date = new Date(d.year, d.month, d.date);
    this.clickDate.emit({$event, date})
  }

  isToday(d: any): boolean {
    const today = new Date()

    const a = new Date(d.year, d.month, d.date);
    const b = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    return a.getTime() === b.getTime()
  }

  private initCalendar(date: Date) {
    const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    const cal  = new Cal({
      year      : y,
      month     : m,
      date      : d,
      fromMonday: true
    })

    this.label = `${y}/${m}`

    this.daysOfWeek = cal.getDayArr()
    this.weeks = cal.getCalArr().reduce((result, day, idx) => {
      const weekIdx = Math.floor(idx / this.daysOfWeek.length)
      result[weekIdx] = result[weekIdx] || []
      result[weekIdx].push(day)
      return result
    }, [])
  }
}
