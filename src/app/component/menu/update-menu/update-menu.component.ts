import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../../core/models/menu.class';
import { Role } from '../../../core/models/role.class';
import { IconSelectComponent } from '../icon-select/icon-select.component';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  @Input() isVisibleUpdate: boolean;
  @Input() menu: Menu;
  @Input() roles: Role[];
  @Input() menuParent: Menu[];
  @Output() submitUpdate: EventEmitter<any> = new EventEmitter();
  @Output() data: EventEmitter<any> = new EventEmitter();
  @ViewChild(IconSelectComponent) iconSelectComponent: IconSelectComponent;
  formUpdate: FormGroup;
  submitted: boolean;
  roleIds: string[] = [];
  applicationId: number;

  constructor(private formBuilder: FormBuilder) {
    this.formUpdate = this.formBuilder.group({
      menuId: [null],
      name: [[null], [Validators.required, Validators.maxLength(100)]],
      description: [[null], [Validators.maxLength(100)]],
      url: [[null], [Validators.required, Validators.maxLength(100)]],
      orderPriority: [[null], [Validators.required]],
      parentId: [[null]],
      roleId: [null, [Validators.required]],
      createdDate: [null],
      applicationId: [null, [Validators.required]],
    });
    this.formUpdate.get('applicationId').valueChanges.subscribe(data => {
      this.formUpdate.get('applicationId').clearValidators();
    });
  }

  ngAfterViewInit(): void {
    this.formUpdate.addControl('icon', this.iconSelectComponent.form.controls.icon);
    this.iconSelectComponent.form.setParent(this.formUpdate);
  }

  ngOnInit(): void {
    this.formUpdate.get('parentId').setValue(this.menu.parentId);
    this.formUpdate.get('roleId').setValue(this.menu.roleId);
  }

  ngOnChanges(): void {
    if (this.menu != null) {
      this.applicationId = this.menu.applicationId;
      console.log(this.roleIds);
      this.pathValue();
      this.formUpdate.get('applicationId').setValue(this.applicationId);
      // this.formUpdate.get('roleId').setValue(this.roleIds);
    }
  }

  get f() {
    return this.formUpdate.controls;
  }

  pathValue() {
    this.formUpdate.patchValue({
      menuId: this.menu.menuId,
      name: this.menu.name,
      description: this.menu.description,
      url: this.menu.url,
      orderPriority: this.menu.orderPriority,
      parentId: this.menu.parentId,
      roleId: this.menu.roleId,
      createdDate: this.menu.createdDate,
      icon: this.menu.icon
    });
  }

  handleCancel(): void {
    this.submitUpdate.emit(false);
    this.submitted = false;
    this.formUpdate.reset();
  }

  handleOk(): void {
    this.submitted = true;

    if (this.formUpdate.valid) {
      this.isVisibleUpdate = false;
      this.data.emit(this.formUpdate.value);
      this.formUpdate.reset();
    }
  }

  getApplicationId() {
    this.formUpdate.get('applicationId').setValue([]);
    this.formUpdate.get('applicationId').setValue(this.applicationId);
    if (this.menu != null && this.menu.applicationId == this.applicationId && this.menu.roleDto != null) {
      this.formUpdate.get('roleId').setValue(this.roleIds);
    } else {
      this.roleIds = [];
      this.formUpdate.get('roleId').setValue(this.roleIds);
    }
  }

  getRole() {
    this.formUpdate.get('roleIds').setValue(this.roleIds);
  }
}
