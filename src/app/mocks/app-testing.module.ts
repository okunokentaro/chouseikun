import {NgModule} from '@angular/core'

import {AppModule} from '../app.module'
import {AuthService} from '../services/auth.service'
import {MockAuthService} from './services/mock-auth.service'

@NgModule({
  exports: [
    AppModule
  ],
  providers: [
    {provide: AuthService, useClass: MockAuthService},
  ],
})
export class AppTestingModule { }
