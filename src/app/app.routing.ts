import {Routes, RouterModule} from '@angular/router'

import {EntranceComponent} from './components/entrance/entrance.component'
import {MainComponent} from './components/main/main.component'
import {EventsComponent} from './components/events/events.component'

const appRoutes: Routes = [
  {
    path     : '',
    component: EntranceComponent
  },
  {
    path     : 'main',
    component: MainComponent
  },
  {
    path     : 'events/:id',
    component: EventsComponent
  },
  {
    path     : '**',
    component: EntranceComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
