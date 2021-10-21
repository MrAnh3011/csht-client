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
import { DynamicModule } from './component/dynamic-component/dynamic.module';
import { StoreModule } from '@ngrx/store';
import { UserService } from './component/user/user.service';
import { MenuService } from './component/menu/menu.service';
import { AuthService } from './component/auth/auth.service';
import { AuthGuard } from './share/guards/auth.guard';
import { ActionService } from './component/action/action.services';
import { RoleService } from './component/role/role.service';
import { GroupService } from './component/group/group.service';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ShareModule,
    FormsModule,
    HttpClientModule,
    DynamicModule,
    StoreModule.forRoot({}),
  ],
  providers: [
    AppConfigService, 
    UserService, 
    MenuService, 
    AuthService, 
    ActionService,
    RoleService,
    GroupService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
