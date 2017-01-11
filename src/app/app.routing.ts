import {Routes, RouterModule} from '@angular/router'

import {EntranceComponent} from './components/entrance/entrance.component'
import {HeaderComponent} from './components/header/header.component'

const appRoutes: Routes = [
  {
    path     : '',
    component: EntranceComponent
  },
  {
    path     : 'main',
    component: HeaderComponent
  },
  {
    path     : '**',
    component: EntranceComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
