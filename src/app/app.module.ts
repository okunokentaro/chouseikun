import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import {NgSemanticModule} from '../ng-semantic/ng-semantic.module'
import {ConfiguredAngularFireModule} from './firebase-config'
import {ROUTING} from './app.routing'

import {AppComponent} from './app.component'
import {HeaderComponent} from './components/header/header.component'
import {EntranceComponent} from './components/entrance/entrance.component'
import {AuthButtonComponent} from './components/auth-button/auth-button.component'
import {MainComponent} from './components/main/main.component'
import {NewEventComponent} from './components/new-event/new-event.component'

import {AuthService} from './services/auth.service'
import {UsersRepositoryService} from './application/user/users-repository.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntranceComponent,
    AuthButtonComponent,
    MainComponent,
    NewEventComponent
  ],
  imports: [
    ConfiguredAngularFireModule,
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ROUTING,
  ],
  providers: [
    AuthService,
    UsersRepositoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
