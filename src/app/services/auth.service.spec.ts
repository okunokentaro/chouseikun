/* tslint:disable:no-unused-variable */
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

import {TestBed, async, inject} from '@angular/core/testing'
import {AuthService} from './auth.service'
import {MockAngularFire} from '../mocks/vendor/mock-angular-fire'
import {UsersRepositoryService} from '../application/user/users-repository.service'
import {MockUsersRepositoryService} from '../mocks/application/user/mock-users-repository.service'

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: UsersRepositoryService, useClass: MockUsersRepositoryService},
        {provide: AngularFire, useClass: MockAngularFire}
      ]
    })
  })

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy()
  }))
})
