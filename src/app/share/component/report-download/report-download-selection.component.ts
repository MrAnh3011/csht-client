import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'report-download-selection',
  templateUrl: './report-download-selection.component.html',
  styleUrls: ['./report-download-selection.component.scss']
})
export class ReportDownloadSelectionComponent implements OnInit {
  @Input() url: string;
  @Input() isAll: boolean;
  @Input() dataChoose: number[];
  @Input() fileName: string;
  @Input() params: {};

  @Output() isDownloading: boolean;

  constructor() { }

  ngOnInit(): void {

    // Set filename + date
    const date = new Date();
    this.fileName = `${this.fileName}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`;
  }
}
