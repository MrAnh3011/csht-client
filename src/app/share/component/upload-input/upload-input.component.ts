import { Component, Input, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent implements OnInit {
  @Input() title: any;
  @Input() type = "image/png,image/jpeg,image/gif,image/bmp"

  @Input() imgStyle = {
    'max-width.px': 600,
    'height': 'auto'
  };

  fileAttr = 'Choose File';

  public fileList: File[] = [];
  public fileUrl: string = null;
  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  beforeUpload = (file: File): boolean => {
    this.fileList = [file];
    this.getBase64(file, (img) => {
      this.fileUrl = img;
    })
    return false;
  };

  remove = (file: File): boolean => {
    console.log("remove");
    this.fileList = [];
    this.fileUrl = null;
    return false;

  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

}
