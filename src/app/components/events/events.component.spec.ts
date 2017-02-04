/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'

import {EventsComponent} from './events.component'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {UsersRepositoryServiceMock} from '../../application/user/users-repository.service.mock'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {EventsRepositoryServiceMock} from '../../application/event/events-repository.service.mock'

describe('EventsComponent', () => {
  let component: EventsComponent
  let fixture: ComponentFixture<EventsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        EventsComponent,
      ],
      providers: [
        {provide: UsersRepositoryService, useClass: UsersRepositoryServiceMock},
        {provide: EventsRepositoryService, useClass: EventsRepositoryServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
