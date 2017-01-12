/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {EventsRepositoryService} from './events-repository.service'
import {AngularFire} from 'angularfire2'

import {MockAngularFire} from '../../mocks/vendor/mock-angular-fire'

describe('EventsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsRepositoryService,
        {provide: AngularFire, useClass: MockAngularFire}
      ]
    })
  })

  it('should ...', inject([EventsRepositoryService], (service: EventsRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
