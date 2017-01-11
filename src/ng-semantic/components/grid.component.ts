import {Component, OnInit, ElementRef} from '@angular/core'

@Component({
  selector: 'ui-grid',
  template: '<ng-content></ng-content>'
})
export class GridComponent implements OnInit {
  private elem: HTMLElement

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement
  }

  ngOnInit() {
    this.elem.classList.add('ui', 'grid')
  }
}
