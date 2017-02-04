/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AngularFire} from 'angularfire2'

import {EventsRepositoryService} from './events-repository.service'
import {AngularFireMock} from '../../vendor-mocks/angular-fire.mock'
import {EventWriterService} from './event-writer.service'
import {EventWriterServiceMock} from './event-writer.service.mock'
import {EventAdapterService} from './event-adapter.service'
import {EventAdapterServiceMock} from './event-adapter.service.mock'

describe('EventsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide : EventsRepositoryService,
          useClass: EventsRepositoryService,
          deps    : [EventWriterService]
        },
        {provide: AngularFire, useClass: AngularFireMock},
        {provide: EventWriterService, useClass: EventWriterServiceMock},
        {provide: EventAdapterService, useClass: EventAdapterServiceMock},
      ]
    })
  })

  it('should ...', inject([EventsRepositoryService], (service: EventsRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
