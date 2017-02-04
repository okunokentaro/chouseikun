/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AngularFire} from 'angularfire2'

import {EventWriterService} from './event-writer.service'
import {AngularFireMock} from '../../vendor-mocks/angular-fire.mock'

describe('EventWriterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventWriterService,
        {provide: AngularFire, useClass: AngularFireMock}
      ]
    })
  })

  it('should ...', inject([EventWriterService], (service: EventWriterService) => {
    expect(service).toBeTruthy()
  }))
})
