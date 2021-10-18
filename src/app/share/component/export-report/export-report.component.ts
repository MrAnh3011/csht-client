import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FileDownloadService } from '../../../core/services/file-download.service';
import { Constant } from '../../constants/constant.class';

@Component({
  selector: 'app-export-report',
  template: `<a (click)="downloadFile()"><i mat-icon type="icon"></i> {{ this.title }}</a> `,
})
export class ExportReportComponent implements OnInit {
  @Output() downloadEvent: EventEmitter<any> = new EventEmitter<boolean>();
  @Input() method: string;
  @Input() url: string;
  @Input() data: any = null;
  @Input() format: string;
  @Input() fileName: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() params: any = null;

  type: string;

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
    console.log(this.method, this.params);
    const reportData = Object.assign({}, this.data, {format: this.format});
    this.params = Object.assign({}, this.params, {format: this.format});
    this.downloadEvent.emit(true);

    if (this.method === 'GET') {
      this.fileDownloadService.downloadGet(this.url, null, this.params!).subscribe(

        // Successful
        res => {
          const reportFile = new Blob([res], { type: this.type });
          saveAs(reportFile, `${this.fileName}.${this.format}`);
          this.downloadEvent.emit(false);
        },

        // Error
        res => {
          console.log(res);
        }

      );
    } else if (this.method === 'POST') {
      this.fileDownloadService.download(this.url, reportData).subscribe(

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

  }

}
