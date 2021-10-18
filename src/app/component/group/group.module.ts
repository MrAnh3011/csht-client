import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './add-group/add-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';



@NgModule({
  declarations: [
    AddGroupComponent,
    UpdateGroupComponent,
    ViewGroupComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupModule { }
