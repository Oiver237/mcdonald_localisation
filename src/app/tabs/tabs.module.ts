import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';
// http
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule
  ],
  providers: [Tab1Page],
  declarations: [TabsPage]
})
export class TabsPageModule {}
