import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ShowMyListComponent } from '../show-my-list/show-my-list.component';
import { EditMyListComponent } from '../edit-my-list/edit-my-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,ShowMyListComponent,EditMyListComponent]
})
export class HomePageModule {}
