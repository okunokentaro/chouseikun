import {
  Component, OnInit, ElementRef, Input, ViewChild,
  AfterViewInit
} from '@angular/core'

@Component({
  selector: 'ui-button',
  template: '<button #BUTTON><ng-content></ng-content></button>'
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('BUTTON') buttonRef: ElementRef
  private elem: HTMLElement

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.buttonRef.nativeElement.classList.add('ui', 'button')
  }

  @Input()
  set type(v: string) {
    this.buttonRef.nativeElement.setAttribute('type', v)
  }

  @Input()
  set inverted(v: boolean) {
    if (v) {
      this.buttonRef.nativeElement.classList.add('inverted')
    }
  }

  @Input()
  set primary(v: boolean) {
    if (v) {
      this.buttonRef.nativeElement.classList.add('primary')
    }
  }
}
