/* tslint:disable:no-unused-variable */
import {AngularFire} from 'angularfire2'
import {Subject} from 'rxjs'

import {TestBed, async, inject} from '@angular/core/testing'
import {AuthService} from './auth.service'
import {MockAngularFire} from '../mocks/vendor/mock-angular-fire'

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFire, useClass: MockAngularFire}
      ]
    })
  })

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy()
  }))
})
