import {Component, OnInit, ElementRef} from '@angular/core'

@Component({
  selector: 'ui-container',
  template: '<ng-content></ng-content>'
})
export class ContainerComponent implements OnInit {
  private elem: HTMLElement

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement
  }

  ngOnInit() {
    this.elem.classList.add('ui', 'container')
  }
}
