/* tslint:disable:no-unused-variable */
import {AngularFire} from 'angularfire2'
import {TestBed, async, inject} from '@angular/core/testing'

import {AuthService} from './auth.service'
import {AngularFireMock} from '../vendor-mocks/angular-fire.mock'
import {UsersRepositoryService} from '../application/user/users-repository.service'
import {UsersRepositoryServiceMock} from '../application/user/users-repository.service.mock'

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: UsersRepositoryService, useClass: UsersRepositoryServiceMock},
        {provide: AngularFire, useClass: AngularFireMock}
      ]
    })
  })

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy()
  }))
})
