import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './add-group/add-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { GroupRoutingModule } from './group-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { GroupService } from './group.service';



@NgModule({
  declarations: [
    AddGroupComponent,
    UpdateGroupComponent,
    ViewGroupComponent
  ],
  imports: [
    GroupRoutingModule,
    ShareModule,
    CommonModule
  ],
  providers: [GroupService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupModule { }
