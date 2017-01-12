import {
  Component, OnInit, ElementRef, Input, ViewChild,
  AfterViewInit, Output, EventEmitter, HostListener
} from '@angular/core'

@Component({
  selector: 'ui-button',
  template: '<button #BUTTON><ng-content></ng-content></button>'
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('BUTTON') buttonRef: ElementRef
  @Output() uiClick = new EventEmitter()
  private elem: HTMLElement
  private _disabled = false

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

  @Input()
  set disabled(v: boolean) {
    this._disabled = v
    const className = 'disabled'
    if (v) {
      this.buttonRef.nativeElement.classList.add(className)
    } else {
      this.buttonRef.nativeElement.classList.remove(className)
    }
  }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    if (this._disabled) {
      ev.preventDefault()
      return
    }
    this.uiClick.emit(ev)
  }
}
