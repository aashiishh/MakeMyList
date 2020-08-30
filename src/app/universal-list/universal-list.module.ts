import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniversalListPageRoutingModule } from './universal-list-routing.module';

import { UniversalListPage } from './universal-list.page';
import { AddUniversalListItemComponent } from '../add-universal-list-item/add-universal-list-item.component';
import { SaveListComponent } from '../save-list/save-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversalListPageRoutingModule
  ],
  declarations: [UniversalListPage, AddUniversalListItemComponent,SaveListComponent]
})
export class UniversalListPageModule {}
