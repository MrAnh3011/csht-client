import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { AppConfigService } from './core/services/app-config.service';
import { ShareModule } from './share/share.module';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
