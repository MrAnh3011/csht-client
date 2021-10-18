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

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    PageDefaultModule,
    ShareModule,
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
