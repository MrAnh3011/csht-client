import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as fromRole from '../../role/redux/role.reducer';
// import {Store} from '@ngrx/store';
import { Role } from '../../../core/models/role.class';
import { Menu } from '../../../core/models/menu.class';
import { IconSelectComponent } from '../icon-select/icon-select.component';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, AfterViewInit {
  @Input() isVisibleAdd: boolean;
  formAdd: FormGroup;
  submitted: boolean;
  @Input() roles: Role[] = [];
  @Input() menuParent: Menu[] = [];
  @ViewChild(IconSelectComponent) iconSelectComponent: IconSelectComponent;
  @Output() dataAdd: EventEmitter<any> = new EventEmitter();
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  roleByApplicationId: Role[] = [];

  constructor(private fb: FormBuilder) {
    this.formAdd = fb.group({
      name: [null, [Validators.required]],
      description: [null],
      orderPriority: [null, [Validators.required]],
      parentId: [null],
      roleId: [null, [Validators.required]],
      url: [null, [Validators.required]],
      applicationId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.roleByApplicationId = this.roles;
  }

  ngAfterViewInit() {
    this.formAdd.addControl('icon', this.iconSelectComponent.form.controls.icon);
    this.iconSelectComponent.form.setParent(this.formAdd);
  }

  get f() {
    return this.formAdd.controls;
  }

  handleCancel() {
    this.submitted = false;
    this.isVisibleAdd = false;
    this.submitAdd.emit(this.isVisibleAdd);
    this.formAdd.reset();
  }

  handleOk() {
    this.submitted = true;
    if (this.formAdd.valid) {
      this.dataAdd.emit(this.formAdd.value);
      this.submitted = false;
      this.isVisibleAdd = false;
      this.submitAdd.emit(this.isVisibleAdd);
      this.formAdd.reset();
    }
  }

  getApplicationId() {
    this.roleByApplicationId = [];
    const applicationId = this.formAdd.get('applicationId').value;
    this.roleByApplicationId = this.roles;
    this.formAdd.get('roleId').setValue('');
  }
}
