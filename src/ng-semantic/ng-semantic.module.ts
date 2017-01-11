import {NgModule} from '@angular/core'

import {ButtonComponent} from './components/button.component'
import {GridComponent} from './components/grid.component'
import {ColumnComponent} from './components/column.component'
import {ContainerComponent} from './components/container.component'

@NgModule({
  declarations: [
    ButtonComponent,
    GridComponent,
    ColumnComponent,
    ContainerComponent,
  ],
  exports: [
    ButtonComponent,
    GridComponent,
    ColumnComponent,
    ContainerComponent,
  ]
})
export class NgSemanticModule { }
