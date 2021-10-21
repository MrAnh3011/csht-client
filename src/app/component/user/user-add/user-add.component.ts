
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../share/custom-validator/noWhitespace.class';
import { Role } from '../../../core/models/role.class';
import { Group } from '../../../core/models/group.class';
import { MenuRoles } from '../../../core/models/menuRoles.class';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @Input() isVisibleAdd: boolean;
  @Input() rolesAdd: Role[] = [];
  @Input() groupsAdd: Group[] = [];
  @Output() dataAdd: EventEmitter<any> = new EventEmitter();
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  formAdd: FormGroup;
  submitted = false;
  isVisibleRole = false;
  titleModelRole: string;
  groupByApplication: Group[] = [];
  @Input() nodes: MenuRoles[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.formAdd = this.formBuilder.group({
      email: [[null], [Validators.required, CustomValidator.cannotContainSpace,
      Validators.minLength(6), Validators.email, Validators.maxLength(100)]],
      phone: [[null], [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      name: [[null], [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      groupIds: [null],
      roleIds: [null],
      status: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      userName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      requireOtp: [2],
      applicationId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.formAdd.patchValue({
      status: '0',
      loginType: 0
    });
  }

  get f() { return this.formAdd.controls; }
  handleOk(): void {
    this.submitted = true;
    if (this.formAdd.valid) {
      this.isVisibleAdd = false;
      this.dataAdd.emit(this.formAdd.value);
      this.submitted = false;
      this.formAdd.reset();
    }
  }
  handleCancel(): void {
    this.submitAdd.emit(false);
    this.submitted = false;
    this.formAdd.reset();
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cancel(value: any) {
    this.isVisibleRole = value;
  }
  getApplicationId() {
    this.groupByApplication = [];
    const applicationId = this.formAdd.get('applicationId').value;
    this.groupByApplication = this.groupsAdd.filter(item => item.applicationId === applicationId);
    this.formAdd.get('groupIds').setValue([]);
  }
}
