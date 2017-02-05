/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'

import {EventAdapterService} from './event-adapter.service'
import {EventWriterService} from './event-writer.service'
import {EventWriterServiceMock} from './event-writer.service.mock'

describe('EventAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventAdapterService,
        {provide: EventWriterService, useClass: EventWriterServiceMock},
      ]
    })
  })

  it('should ...', inject([EventAdapterService], (service: EventAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
