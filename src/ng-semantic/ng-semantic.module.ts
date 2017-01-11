import {NgModule} from '@angular/core';
import {ButtonComponent} from './components/button.component'
import {GridComponent} from "./components/grid.component";
import {ColumnComponent} from "./components/column.component";

@NgModule({
  declarations: [
    ButtonComponent,
    GridComponent,
    ColumnComponent,
  ],
  exports: [
    ButtonComponent,
    GridComponent,
    ColumnComponent,
  ]
})
export class NgSemanticModule { }
