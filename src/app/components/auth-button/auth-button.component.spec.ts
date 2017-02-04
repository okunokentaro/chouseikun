/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'

import {AuthButtonComponent} from './auth-button.component'
import {AuthService} from '../../services/auth.service'
import {AuthServiceMock} from '../../services/auth.service.mock'

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent
  let fixture: ComponentFixture<AuthButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthButtonComponent
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
