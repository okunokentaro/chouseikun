/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, Component} from '@angular/core'
import {AngularFire} from 'angularfire2'

import {AppComponent} from './app.component'
import {MockAngularFire} from './mocks/vendor/mock-angular-fire'

@Component({
  selector: 'ch-header',
  template: ''
})
class MockHeaderComponent {}

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderComponent
      ],
      providers: [
        {provide: AngularFire, useClass: MockAngularFire}
      ]
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
