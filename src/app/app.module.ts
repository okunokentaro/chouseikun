import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {AngularFireModule} from "angularfire2";

import {ConfiguredAngularFireModule} from "./firebase-config"
import {AppComponent} from './app.component'
import {HeaderComponent} from './components/header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    ConfiguredAngularFireModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
