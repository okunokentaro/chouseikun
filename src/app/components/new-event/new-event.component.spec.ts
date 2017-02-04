/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'

import {NewEventComponent} from './new-event.component'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {EventsRepositoryServiceMock} from '../../application/event/events-repository.service.mock'

describe('NewEventComponent', () => {
  let component: NewEventComponent
  let fixture: ComponentFixture<NewEventComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewEventComponent
      ],
      providers: [
        {provide: EventsRepositoryService, useClass: EventsRepositoryServiceMock},
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
