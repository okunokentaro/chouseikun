/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'

import {EntranceComponent} from './entrance.component'
import {AuthService} from '../../services/auth.service'
import {AuthServiceMock} from '../../services/auth.service.mock'

describe('EntranceComponent', () => {
  let component: EntranceComponent
  let fixture: ComponentFixture<EntranceComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        EntranceComponent
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
