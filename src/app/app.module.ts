import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppConfigService } from './core/services/app-config.service';
import { ShareModule } from './share/share.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import vi from '@angular/common/locales/vi';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthModule } from './component/auth/auth.module';
import { PageDefaultModule } from './share/component/page-default/page-default.module';
import { EntityModule } from './component/entity/entity.module';
import { GroupModule } from './component/group/group.module';
import { MenuModule } from './component/menu/menu.module';
import { RoleModule } from './component/role/role.module';
import { UserModule } from './component/user/user.module';
import { DynamicModule } from './component/dynamic-component/dynamic.module';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ShareModule,
    LayoutModule,
    EntityModule,
    GroupModule,
    MenuModule,
    RoleModule,
    UserModule,
    AuthModule,
    FormsModule,
    PageDefaultModule,
    HttpClientModule,
    PageDefaultModule,
    DynamicModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
