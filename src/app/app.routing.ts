import {Routes, RouterModule} from '@angular/router'

import {EntranceComponent} from './components/entrance/entrance.component'

const appRoutes: Routes = [
  {
    path     : '',
    component: EntranceComponent
  },
  {
    path     : '**',
    component: EntranceComponent
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
