/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'

import {MainComponent} from './main.component'
import {HeaderComponent} from '../header/header.component'
import {AuthService} from '../../services/auth.service'
import {MockAuthService} from '../../mocks/services/mock-auth.service'
import {RouterTestingModule} from "@angular/router/testing";

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MainComponent,
        HeaderComponent,
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
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
