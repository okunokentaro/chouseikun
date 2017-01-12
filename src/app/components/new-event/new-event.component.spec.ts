/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'

import {NewEventComponent} from './new-event.component'
import {AppTestingModule} from '../../mocks/app-testing.module'

describe('NewEventComponent', () => {
  let component: NewEventComponent
  let fixture: ComponentFixture<NewEventComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent)
    component = fixture.componentInstance
    component.my = {
      groups: ['dummy']
    } as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
