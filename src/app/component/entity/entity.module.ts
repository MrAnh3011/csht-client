import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEntityComponent } from './view-entity/view-entity.component';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { EntityService } from './entity.service';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    ViewEntityComponent,
    AddEntityComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  providers: [EntityService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule { }
