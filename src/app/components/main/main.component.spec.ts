/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'

import {MainComponent} from './main.component'
import {UsersRepositoryService} from '../../application/user/users-repository.service'
import {UsersRepositoryServiceMock} from '../../application/user/users-repository.service.mock'
import {EventsRepositoryService} from '../../application/event/events-repository.service'
import {EventsRepositoryServiceMock} from '../../application/event/events-repository.service.mock'
import {AuthService} from '../../services/auth.service'
import {AuthServiceMock} from '../../services/auth.service.mock'

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MainComponent
      ],
      providers: [
        {provide: UsersRepositoryService, useClass: UsersRepositoryServiceMock},
        {provide: EventsRepositoryService, useClass: EventsRepositoryServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
