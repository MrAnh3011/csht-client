import { MenuRoles } from '../../../core/models/menuRoles.class';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.class';
import { DatePipe } from '@angular/common';
import { Constant } from '../../../share/constants/constant.class';
import { Group } from '../../../core/models/group.class';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean;
  @Input() user: User;
  @Input() groups: Group[] = [];
  @Output() data: EventEmitter<any> = new EventEmitter();
  @Output() submitUpdate: EventEmitter<any> = new EventEmitter();
  onChangeAction = false;
  requireOtp: number;
  formUpdate: FormGroup;
  submitted = false;
  createdDate: string;
  groupIds: string[] = [];
  roleIds: string[] = [];
  value: string[] = [];
  isVisibleRole = false;
  passwordVisible = false;
  @Input() nodes: MenuRoles[] = [];
  groupByApplication: Group[] = [];
  applicationId: number;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe, private userService: UserService,
    private notificationService: NotificationService) {
    this.formUpdate = this.formBuilder.group({
      email: [[null], [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      phone: [[null], [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      name: [[null], [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      groupIds: [null, [Validators.required]],
      applicationId: [null, Validators.required],
      status: [null, Validators.required],
      userName: [null],
      userId: [null],
      password: [null],
      createdDate: [null],
      modifiedDate: [null],
      searchRoles: [null],
      requireOtp: [null]
    });
    this.formUpdate.get('applicationId').valueChanges.subscribe(data => {
      this.formUpdate.get('applicationId').clearValidators();
    });
  }

  ngOnInit(): void {
    this.requireOtp = 0;
  }

  ngOnChanges(): void {
    this.onChangeAction = true;
    this.groupIds = [];
    if (this.user != null) {
      this.applicationId = this.user.applicationId;
      this.groupByApplication = this.groups.filter(item => item.applicationId === this.applicationId);
      if (this.user.groups && this.user.groups !== null) {
        this.user.groups.forEach(group => {
          this.groupIds.push(group.groupId);
        });
      }
      this.pathValue();
      this.requireOtp = this.user.requireOtp;
      this.formUpdate.get('applicationId').setValue(this.applicationId);
      this.formUpdate.get('groupIds').setValue(this.groupIds);
    }
  }

  cancel(value: any) {
    this.isVisibleRole = value;
  }

  pathValue() {
    this.formUpdate.patchValue({
      userId: this.user.userId,
      email: this.user.email,
      name: this.user.name,
      userName: this.user.userName,
      phone: this.user.phoneNumber,
      status: this.user.status + '',
      createdDate: this.user.createdDate,
      modifiedDate: this.user.modifiedDate,
      requireOtp: this.user.requireOtp,
      password: this.user.password
    });
  }

  get f() {
    return this.formUpdate.controls;
  }

  handleOk(): void {
    this.submitted = true;
    if (this.formUpdate.valid) {
      this.isVisible = false;
      this.data.emit(this.formUpdate.value);
    }
  }

  handleCancel(): void {
    this.submitUpdate.emit(false);
    this.submitted = false;
    this.formUpdate.reset();
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  handleGetOtp() {
    // waiting for handling
  }

  handleGetTotp() {
    this.userService.sendTotpCode(this.user.userName).subscribe(res => {
      if (res.errorCode === '00') {
        this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_SUCCESS_SENT_TOTP_CODE);
      } else {
        this.notificationService.showNotification(Constant.ERROR, res.errorDescription);
      }
    }, error => {
      this.notificationService.showNotification(Constant.ERROR, Constant.MESSAGE_SERVER_ERROR);
    });
  }

  getApplicationId() {
    this.groupByApplication = [];
    this.formUpdate.get('applicationId').setValue([]);
    this.formUpdate.get('applicationId').setValue(this.applicationId);
    this.groupByApplication = this.groups.filter(item => item.applicationId === this.applicationId);
    this.groupIds = [];
  }

  getGroup() {
    this.formUpdate.get('groupIds').setValue(this.groupIds);
  }
}
