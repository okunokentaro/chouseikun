/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { EventAdapterService } from './event-adapter.service'

describe('EventAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventAdapterService]
    })
  })

  it('should ...', inject([EventAdapterService], (service: EventAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
