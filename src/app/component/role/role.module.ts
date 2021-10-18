import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from './add-role/add-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { ShareModule } from 'src/app/share/share.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddRoleComponent,
    ViewRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleModule { }
