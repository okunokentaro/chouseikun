import {Component, OnInit, ElementRef} from '@angular/core'

@Component({
  selector: 'ui-button',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent implements OnInit {
  private elem: HTMLElement

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement
  }

  ngOnInit() {
    this.elem.classList.add('ui', 'button')
  }
}
