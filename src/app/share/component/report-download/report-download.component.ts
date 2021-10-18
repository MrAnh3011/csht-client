import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FileDownloadService } from '../../../core/services/file-download.service';
import { saveAs } from 'file-saver';
import { Constant } from '../../constants/constant.class';

export interface ReportData {
  format: string;
  isAll: boolean;
  dataChoose?: number[];
}

@Component({
  selector: 'report-download',
  template: `
  <a (click)="downloadFile()"><mat-icon>download</mat-icon> {{ this.title }}</a> `,
  styleUrls: ['./report-download.component.scss']
})
export class ReportDownloadComponent implements OnInit, OnDestroy {
  @Input() url: string;
  @Input() format: string;
  @Input() isAll: boolean;
  @Input() dataChoose: number[];
  @Input() fileName: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() params: {};

  @Output() downloadEvent = new EventEmitter<boolean>();

  type: string;
  @Input() reportData: ReportData;

  constructor(private fileDownloadService: FileDownloadService) {
  }

  ngOnInit(): void {

    // set MIME type
    switch (this.format) {
      case Constant.EXCEL_TYPE_1:
        this.type = Constant.EXCEL_MIME_1;
        break;
      case Constant.EXCEL_TYPE_2:
        this.type = Constant.EXCEL_MIME_2;
        break;
      case Constant.PDF_TYPE:
        this.type = Constant.PDF_MIME;
        break;
      default:
        this.type = '';
        break;
    }
  }

  downloadFile() {

    this.reportData = {
      format: this.format,
      isAll: this.isAll,
      dataChoose: this.dataChoose,

    };

    this.downloadEvent.emit(false);

    this.fileDownloadService.download(this.url, this.reportData, this.params).subscribe(

      // Successful
      res => {
        const reportFile = new Blob([res], { type: this.type });
        saveAs(reportFile, `${this.fileName}.${this.format}`);
        this.downloadEvent.emit(true);
      },

      // Error
      res => {
        console.log(res);
      }

    );
  }

  ngOnDestroy(): void {

  }
}
