/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'
import {Subject} from 'rxjs'

import {NgSemanticModule} from '../../../ng-semantic/ng-semantic.module'
import {HeaderComponent} from './header.component'
import {AuthService} from '../../services/auth.service'
import {MockAuthService} from '../../mocks/services/mock-auth.service'

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
        HeaderComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
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
