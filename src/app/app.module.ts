import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import {NgSemanticModule} from '../ng-semantic/ng-semantic.module'
import {ConfiguredAngularFireModule} from './firebase-config'

import {AppComponent} from './app.component'
import {HeaderComponent} from './components/header/header.component'
import {EntranceComponent} from './components/entrance/entrance.component'
import {AuthButtonComponent} from './components/auth-button/auth-button.component'

import {AuthService} from './services/auth.service'
import {ROUTING} from './app.routing';
import { MainComponent } from './components/main/main.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntranceComponent,
    AuthButtonComponent,
    MainComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
