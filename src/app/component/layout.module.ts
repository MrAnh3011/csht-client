import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { ActionComponent } from './action/action.component';
import { EntityModule } from './entity/entity.module';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    ActionComponent,
    WelcomeComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild([]),
    LayoutRoutingModule,
    EntityModule
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {
}
