
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);
@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild([]),
    LayoutRoutingModule
  ],
  //providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }]
})
export class LayoutModule {

}
