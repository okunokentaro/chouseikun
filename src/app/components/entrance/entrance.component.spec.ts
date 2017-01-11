/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'

import {EntranceComponent} from './entrance.component'
import {NgSemanticModule} from '../../../ng-semantic/ng-semantic.module'
import {AuthService} from '../../services/auth.service'
import {MockAuthService} from '../../mocks/services/mock-auth.service'

describe('EntranceComponent', () => {
  let component: EntranceComponent
  let fixture: ComponentFixture<EntranceComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgSemanticModule,
      ],
      declarations: [
        EntranceComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
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
