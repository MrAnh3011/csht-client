import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Constant } from '../../constants/constant.class';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConfigService } from "../../../core/services/app-config.service";
import { ImgUploadService } from "../../../core/services/img-upload.servive";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, AfterContentChecked {
  @Input() actionLink = '';
  @Input() imgTypes: string[] = Constant.DEFAULT_IMG_TYPE;
  @Input() maxWidth: number = Constant.DEFAULT_MAX_IMG_WIDTH;
  @Input() maxHeight: number = Constant.DEFAULT_MAX_IMG_HEIGHT;
  @Input() minWidth: number = Constant.DEFAULT_MIN_IMG_WIDTH;
  @Input() minHeight: number = Constant.DEFAULT_MIN_IMG_HEIGHT;
  @Input() maxSize: number = Constant.DEFAULT_IMG_MAX_SIZE;
  @Input() minSize: number = Constant.DEFAULT_IMG_MIN_SIZE;

  loading = false;
  imageUrl: string;
  fileAttr = 'Choose File';
  dataimage: any;

  form: FormGroup;
  baseUrl: any;
  constructor(
    private fb: FormBuilder,
    private msg: MatSnackBar,
    private configService: AppConfigService,
    private imgUploadService: ImgUploadService) {
    this.form = this.fb.group({
      imageUrl: [null]
    });
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
  }

  ngAfterContentChecked(): void {
    this.imageUrl = this.form.controls.imageUrl.value;
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((fileItem: any) => {
        const isImgType = this.imgTypes.some(type => fileItem.type === `image/${type}`);

        if (!isImgType) {
          this.msg.open('You can only upload' + this.imgTypes.toString().toUpperCase() + 'file!');
          return;
        }
        const imgSize = fileItem.size / 1024;
        const isImgSize = imgSize < this.maxSize && imgSize > this.minSize;
        if (!isImgSize) {
          this.msg.open(`Image must smaller than ${this.maxSize / 1024}MB! and bigger than ${this.minSize / 1024} MB`);
          return;
        }
        const img = new Image();
        img.src = window.URL.createObjectURL(fileItem);
        this.dataimage = img.src;
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          if (width >= this.minWidth && width <= this.maxWidth &&
            height >= this.minHeight && height <= this.maxHeight
          ) {
            this.msg.open(`Image only ${this.minWidth} x ${this.minHeight} above and ${this.maxWidth} x ${this.maxHeight} less`);
          }
          window.URL.revokeObjectURL(img.src!);
        }

        const formData = new FormData();
        formData.append('file', fileItem.file as any);
        this.imgUploadService.imgUpload(this.actionLink, formData).subscribe(res => {
          this.loading = false;

          this.imageUrl = this.baseUrl + '/core' + res.fileDownloadUri;
          this.form.patchValue({
            imageUrl: this.imageUrl
          });
        }, error => {
          this.msg.open(error.message.toString(), '', {
            duration: 5000
          });
        });

        this.fileAttr += fileItem.name + ' - ';
      });
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
