/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {UsersRepositoryService} from './users-repository.service'

describe('UsersRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersRepositoryService]
    })
  })

  it('should ...', inject([UsersRepositoryService], (service: UsersRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
