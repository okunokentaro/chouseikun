/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, Component, NO_ERRORS_SCHEMA} from '@angular/core'
import {AngularFire} from 'angularfire2'
import {RouterTestingModule} from '@angular/router/testing'

import {AppComponent} from './app.component'
import {MockAngularFire} from './mocks/vendor/mock-angular-fire'
import {HeaderComponent} from './components/header/header.component'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {provide: AngularFire, useClass: MockAngularFire}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
