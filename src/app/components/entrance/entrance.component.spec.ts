/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {EntranceComponent} from './entrance.component'

describe('EntranceComponent', () => {
  let component: EntranceComponent
  let fixture: ComponentFixture<EntranceComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceComponent ]
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
