import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversalListPage } from './universal-list.page';

const routes: Routes = [
  {
    path: '',
    component: UniversalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversalListPageRoutingModule {}
