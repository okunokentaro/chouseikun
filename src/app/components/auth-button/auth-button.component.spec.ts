/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {AuthButtonComponent} from './auth-button.component'
import {AppTestingModule} from '../../mocks/app-testing.module'

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent
  let fixture: ComponentFixture<AuthButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppTestingModule
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
