import {Routes, RouterModule} from '@angular/router'

import {EntranceComponent} from './components/entrance/entrance.component'
import {MainComponent} from './components/main/main.component'

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
    path     : '**',
    component: EntranceComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
