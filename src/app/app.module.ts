import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {DateValueAccessorModule} from 'angular-date-value-accessor'

import {NgSemanticModule} from '../ng-semantic/ng-semantic.module'
import {ConfiguredAngularFireModule} from './firebase-config'
import {ROUTING} from './app.routing'

import {AppComponent} from './app.component'
import {HeaderComponent} from './components/header/header.component'
import {EntranceComponent} from './components/entrance/entrance.component'
import {AuthButtonComponent} from './components/auth-button/auth-button.component'
import {MainComponent} from './components/main/main.component'
import {NewEventComponent} from './components/new-event/new-event.component'
import {CalendarComponent} from './components/calendar/calendar.component'

import {AuthService} from './services/auth.service'
import {UsersRepositoryService} from './application/user/users-repository.service'
import {EventsRepositoryService} from './application/event/events-repository.service'
import {EventsComponent} from './components/events/events.component'
import {EventAdapterService} from './application/event/event-adapter.service'
import {EventWriterService} from './application/event/event-writer.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntranceComponent,
    AuthButtonComponent,
    MainComponent,
    NewEventComponent,
    CalendarComponent,
    EventsComponent,
  ],
  imports     : [
    ConfiguredAngularFireModule,
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DateValueAccessorModule,
    ROUTING,
  ],
  providers   : [
    AuthService,
    UsersRepositoryService,
    EventsRepositoryService,
    EventAdapterService,
    EventWriterService,
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
