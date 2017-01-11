/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'
import {Subject} from 'rxjs'

import {NgSemanticModule} from '../../../ng-semantic/ng-semantic.module'
import {HeaderComponent} from './header.component'
import {AuthService} from '../../services/auth.service'
import {MockAuthService} from '../../mocks/services/mock-auth.service'
import {AuthButtonComponent} from '../auth-button/auth-button.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgSemanticModule
      ],
      declarations: [
        HeaderComponent,
        AuthButtonComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
