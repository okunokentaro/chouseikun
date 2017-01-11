import {Component, OnInit, ElementRef, Input} from '@angular/core'

@Component({
  selector: 'ui-column',
  template: '<ng-content></ng-content>'
})
export class ColumnComponent implements OnInit {
  private elem: HTMLElement

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement
  }

  ngOnInit() {
    this.elem.classList.add('wide', 'column')
  }

  @Input()
  set n(n: number) {
    const map = {
      1:  'one',
      2:  'two',
      3:  'three',
      4:  'four',
      5:  'five',
      6:  'six',
      7:  'seven',
      8:  'eight',
      9:  'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
    }
    this.elem.classList.add(map[n])
  }
}
