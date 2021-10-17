import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { I18nModule } from './i18n.module';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { DateFormatPipe } from './pipe/format-date.pipe';
import { SelectLanguageComponent } from './component/select-language/select-language.component';
import { ReportDownloadComponent } from './component/report-download/report-download.component';
import { ReportDownloadSelectionComponent } from './component/report-download/report-download-selection.component';
import { IsNumberDirective } from './directive/is-number.directive';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import { CurrencyFormatVNPipe } from './pipe/currency-format-vi.pipe';
import { MaskDateDirective } from './directive/mask-date.directive';
import { TruncatePipe } from './pipe/truncate.pipe';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';
import { DownloadFileDirective } from './directive/download-file.directive';
import { ParseCurrencyViDirective } from './directive/parse-currency-vi.directive';
import { ParseCurrencyDirective } from './directive/parse-currency.directive';
import { MaskTwoDecimalsDirective } from './directive/mask-two-decimals.directive';
import { NumbericDirective } from './directive/numberic.directive';
import { FilterColumnTableComponent } from './component/filter-column/filter-column.component';
import { LoadingCustomComponent } from './component/loading-custom/loading-custom.component';
import { ExportButtonComponent } from './component/export-report/export-button/export-button.component';
import { UploadInputComponent } from './component/upload-input/upload-input.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { NgxDateTimePickerComponent } from './component/ngx-date-time-picker/ngx-date-time-picker.component';
import { ExportReportComponent } from './component/export-report/export-report.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NotificationService } from '../core/services/notification.service';

@NgModule({
  declarations: [
    DateFormatPipe,
    SelectLanguageComponent,
    ReportDownloadComponent,
    ReportDownloadSelectionComponent,
    IsNumberDirective,
    CurrencyFormatPipe,
    CurrencyFormatVNPipe,
    MaskDateDirective,
    DownloadFileDirective,
    TruncatePipe,
    SanitizeHtmlPipe,
    ParseCurrencyViDirective,
    ParseCurrencyDirective,
    MaskTwoDecimalsDirective,
    NumbericDirective,
    FilterColumnTableComponent,
    LoadingCustomComponent,
    ExportReportComponent,
    ExportButtonComponent,
    UploadInputComponent,
    UploadImageComponent,
    NgxDateTimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    DragDropModule,
    I18nModule,
    NgxScrollTopModule,
    CKEditorModule,
    EditorModule,
    BsDatepickerModule,
    TimepickerModule
  ],
  exports: [
    CommonModule,
    DateFormatPipe,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    I18nModule,
    SelectLanguageComponent,
    ScrollingModule,
    DragDropModule,
    CKEditorModule,
    EditorModule,
    MaterialModule,
    I18nModule,
    NgxScrollTopModule,
    ReportDownloadComponent,
    ReportDownloadSelectionComponent,
    IsNumberDirective,
    CurrencyFormatPipe,
    CurrencyFormatVNPipe,
    MaskDateDirective,
    TruncatePipe,
    SanitizeHtmlPipe,
    DownloadFileDirective,
    ParseCurrencyViDirective,
    ParseCurrencyDirective,
    MaskTwoDecimalsDirective,
    NumbericDirective,
    FilterColumnTableComponent,
    LoadingCustomComponent,
    ExportButtonComponent,
    UploadInputComponent,
    UploadImageComponent,
    NgxDateTimePickerComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    NotificationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }
