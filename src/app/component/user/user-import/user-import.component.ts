import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload'
import { AppConfigService } from '../../../core/services/app-config.service';
import { ImgUploadService } from '../../../core/services/img-upload.servive';
import { UserService } from '../user.service';
import { getTypeExport } from '../../../share/utils/import-utils.class';
import * as XLSX from 'xlsx';

interface FileDownload {
  url: string;
  fileName: string;
}

@Component({
  selector: 'app-user-import',
  templateUrl: './user-import.component.html',
  styleUrls: ['./user-import.component.scss']
})
export class UserImportComponent implements OnInit, OnChanges {
  @Input() isVisibleImport: boolean;
  @Output() modalState: EventEmitter<any> = new EventEmitter();
  current = 0;
  checkFileUpload = false;
  importSuccess = false;
  isSuccess = false;
  radioValue = '';
  formImportUser: FormGroup;
  dataImportResult: any;
  userImportResult: any;
  pageSize: any;
  defaultPage: any;
  loading: boolean;
  total: number;
  userImportTemplate: FileDownload;
  totalImportNumber = 0;
  successImportNumber = 0;
  errorImportNumber = 0;
  sheets: any[] = [];
  actionLink = '/core/uploadFile';
  checkOptionsOne: any;
  allChecked: boolean;
  indeterminate: boolean;
  importDataSuccess: any[];
  submitted = false;
  controls: any;
  file: File;
  formData: any;
  roles: any;

  constructor(
    private configService: AppConfigService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private imgUploadService: ImgUploadService,
    private userService: UserService,
  ) {

    this.formImportUser = this.fb.group({
      importType: [null, Validators.required],
      sheet: [null, Validators.required],
      fileName: [null, [Validators.required]],
      roles: [null, [Validators.required]]
    });

    this.controls = {
      importType: this.formImportUser.get('importType'),
      sheet: this.formImportUser.get('sheet'),
      fileName: this.formImportUser.get('fileName'),
      roles: this.formImportUser.get('roles')
    };
  }

  ngOnInit(): void {
    this.pageSize = this.configService.getConfig().pageSize;
    this.defaultPage = this.configService.getConfig().defaultPage;
  }

  ngOnChanges(): void {
    this.patchValue();
  }


  patchValue() {
    this.userImportTemplate = {
      url: '/core/downloadFile/Template.xlsx',
      fileName: 'Template.xlsx'

    };
    this.formImportUser.patchValue({
      importType: 0,
      sheet: null
    });
  }

  handleClose() {
    this.submitted = false;
    this.modalState.emit(!this.isVisibleImport);
    this.current = 0;
    this.formImportUser.reset();
    this.sheets = [];
  }

  validateImport() {
    this.submitted = true;
    this.formImportUser.markAllAsTouched();
    if (this.formImportUser.valid) {
      this.loading = true;
      this.searchData(this.formData, this.formImportUser.get('sheet').value, this.formImportUser.get('roles').value, this.formImportUser.get('importType').value);
      this.allChecked = true;
      this.indeterminate = false;
      this.current += 1;
      if (this.formImportUser.get('fileName').hasError('required')) {
      }
    }
  }

  pre() {
    this.current = 0;
  }

  importFileExcel() {
    this.importUserPerform(this.formImportUser.get('importType').value);
  }

  reImport() {
    this.submitted = false;
    this.current = 0;
    this.formImportUser.reset();
  }

  importUserPerform(type: any) {
    this.loading = true;
    if (this.dataImportResult != null) {
      this.userService.importExcelUser(this.dataImportResult, type).subscribe(res => {
        this.importDataSuccess = res.data;
        this.current += 1;
        this.totalImportNumber = res.numberRow;
        this.successImportNumber = res.numberSuccess;
        this.errorImportNumber = res.numberError;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.msg.error('Dữ liệu không hợp lệ !', {
        nzDuration: 5000
      });
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const excelTypes = ['xls', 'xlsx'];
      const isImgType = excelTypes.some(type => file.name.split('.').pop() === `${type}`);
      this.submitted = false;
      if (!isImgType) {
        this.msg.error('Tệp dữ liệu không tuân theo quy tắc của tệp mẫu ' + excelTypes.toString().toUpperCase()
          + ' Bạn vui lòng tải tệp mẫu và nhập liệu theo đúng cấu trúc được hướng dẫn!');
        observer.complete();
        return;
      }
      observer.next(isImgType);
      observer.complete();
    });
  };
  handleUpload = (item: NzUploadXHRArgs) => {
    this.loading = true;
    this.checkFileUpload = true;
    this.formData = new FormData();
    this.formData.append('file', item.file as any);
    this.handleUploadItem(item, this.formImportUser.get('importType').value);
  };

  handleUploadItem(item: NzUploadXHRArgs, type: any) {
    this.imgUploadService.imgUpload(this.actionLink, this.formData).subscribe(res => {
      this.submitted = false;
      this.checkFileUpload = false;
      this.formImportUser.patchValue({
        fileName: res.fileName
      });
      this.getSheetExcel(this.formData);
    }, error => {
      this.loading = false;
      this.msg.error(error.message.toString(), {
        nzDuration: 5000
      });
    });
  }

  onExport() {
    this.userService.exportFileValidateImport(this.formImportUser.get('sheet').value, this.formData, this.formImportUser.get('importType').value).subscribe(res => {
      if (res) {
        this.userImportResult = new Blob([res], { type: getTypeExport('xlsx') });
        saveAs(this.userImportResult, this.formImportUser.get('fileName').value.toString());
      }
    });
  }

  setFormValue(event: any) {

  }

  getSheetExcel(formData: any) {
    this.userService.readSheetsExel(formData).subscribe(res => {
      this.loading = false;
      this.sheets = res;
      if (this.sheets != null && this.sheets.length > 0) {
        this.formImportUser.get('sheet').setValue(0);
      } else {
        this.msg.error('Tệp dữ liệu không hợp lệ', {
          nzDuration: 5000
        });
      }
    }, error => {
      this.loading = false;
      this.msg.error('Tệp dữ liệu không hợp lệ', {
        nzDuration: 5000
      });
    });
  }

  getRolesPartner() {
    if (this.isVisibleImport) {
      this.userService.getRolesPartner().subscribe(res => {
        this.roles = res;
      });
    }
  }

  getRolesBss() {
    if (this.isVisibleImport) {
      this.userService.getRolesBss().subscribe(res => {
        this.roles = res;
      });
    }
  }

  searchData(formData: any, index: any, roles: any, type: any): void {
    this.userService.setValidateImport(index, formData, roles, type).subscribe(res => {
      if (res.valid) {
        this.dataImportResult = res.data;
        this.total = this.dataImportResult.length;
        this.totalImportNumber = this.dataImportResult.length;
        this.successImportNumber = 0;
        this.errorImportNumber = 0;
        if (this.dataImportResult.length > 0) {
          this.dataImportResult.filter((item: any) => {
            if (item.success === true) {
              this.successImportNumber++;
            } else {
              this.errorImportNumber++;
            }
          });
          if (this.successImportNumber > 0) {
            this.importSuccess = true;
            this.isSuccess = true;
          } else {
            this.importSuccess = false;
            this.isSuccess = false;
          }
        } else {
          this.dataImportResult = [];
          this.totalImportNumber = 0;
          this.successImportNumber = 0;
          this.errorImportNumber = 0;
          this.importSuccess = true;
          this.isSuccess = true;
        }
        this.loading = false;
      } else {
        this.loading = false;
        this.submitted = false;
        this.formImportUser.get('fileName').setValue(null);
        this.formImportUser.get('sheet').setValue(null);
        this.msg.error(res.message.toString(), {
          nzDuration: 5000
        });
      }
    });
  }

  exportResult() {
    const element = document.getElementById('table-export');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User_Erp');
    XLSX.writeFile(wb, 'User_Results' + '.xlsx');
  }

  getRoles() {
    if (!this.submitted) {
      this.roles = null;
      this.formImportUser.get('roles').setValue(null);
      if (this.formImportUser.get('importType').value === 0) {
        this.getRolesBss();
      } else {
        this.getRolesPartner();
      }
    }
  }
}

