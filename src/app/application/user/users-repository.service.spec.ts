/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AngularFire} from 'angularfire2'

import {UsersRepositoryService} from './users-repository.service'
import {MockAngularFire} from '../../mocks/vendor/mock-angular-fire'

describe('UsersRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersRepositoryService,
        {provide: AngularFire, useClass: MockAngularFire}
      ]
    })
  })

  it('should ...', inject([UsersRepositoryService], (service: UsersRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
