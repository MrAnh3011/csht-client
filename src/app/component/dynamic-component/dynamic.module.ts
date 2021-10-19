import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';
import { DynamicShowComponent } from './dynamic-show/dynamic-show.component';
import { DynamicAddComponent } from './dynamic-add/dynamic-add.component';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFieldDirective } from 'src/app/share/directive/dynamic-field.directive';

@NgModule({
  declarations: [
    DynamicComponent,
    DynamicShowComponent,
    DynamicAddComponent,
    DynamicFieldDirective
  ],
  imports: [
    DynamicRoutingModule,
    CommonModule,
    ShareModule,
    HttpClientModule, 
    BrowserAnimationsModule
  ]
})
export class DynamicModule { }
