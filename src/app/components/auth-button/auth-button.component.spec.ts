/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {NgSemanticModule} from '../../../ng-semantic/ng-semantic.module'
import {AuthButtonComponent} from './auth-button.component'
import {AuthService} from '../../services/auth.service'
import {MockAuthService} from '../../mocks/services/mock-auth.service'

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent
  let fixture: ComponentFixture<AuthButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgSemanticModule
      ],
      declarations: [
        AuthButtonComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
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
