import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {AngularFireModule} from "angularfire2";

import {NgSemanticModule} from '../ng-semantic/ng-semantic.module'
import {ConfiguredAngularFireModule} from "./firebase-config"
import {AppComponent} from './app.component'
import {HeaderComponent} from './components/header/header.component'

import {AuthService} from './services/auth.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    ConfiguredAngularFireModule,
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
