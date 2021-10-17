import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
})
export class ExportButtonComponent implements OnInit {
  @Input() method: string;
  @Input() url: string;
  @Input() data = null;
  @Input() fileName: string;
  @Input() params = null;

  isDownloading: boolean;

  constructor() { }

  ngOnInit(): void {
    // Set filename + date
    const date = new Date();
    this.fileName = `${this.fileName}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`;
  }

}
