import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { ViewMenuComponent } from './view-menu/view-menu.component';
import { IconSelectComponent } from './icon-select/icon-select.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { MenuService } from './menu.service';



@NgModule({
  declarations: [
    AddMenuComponent,
    UpdateMenuComponent,
    ViewMenuComponent,
    IconSelectComponent
  ],
  imports: [
    MenuRoutingModule,
    ShareModule,
    CommonModule
  ],
  providers: [MenuService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
