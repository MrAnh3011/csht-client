import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionService } from '../../action/action.services';
import { Action } from '../../../core/models/action.model';
import { AppConfigService } from '../../../core/services/app-config.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoleService } from '../role.service';
import { Constant } from '../../../share/constants/constant.class';
import { EntityDto } from '../../../core/models/entity.class';
import { EntityService } from '../../entity/entity.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  @Input() isVisibleAdd: boolean;
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  @Output() cancelAdd: EventEmitter<any> = new EventEmitter();
  formAdd: FormGroup;
  submitted = false;
  actions: Action[] = [];
  entities: EntityDto[] = [];
  actionResponses: Action[] = [];
  pageSize: any;
  page: any;
  statuses = [{ name: 'Active', value: 1 }, { name: 'Inactive', value: 0 }];

  constructor(private fb: FormBuilder, private configService: AppConfigService,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private actionService: ActionService,
    private entityService: EntityService) {
    this.formAdd = fb.group({
      roleName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      createdDate: new Date(),
      status: [null, [Validators.required]],
      actionId: [null, [Validators.required]],
      entityId: [null, [Validators.required]],
      applicationId: [null]
    });
  }

  ngOnInit(): void {
    this.pageSize = this.configService.getConfig().pageSize;
    this.page = this.configService.getConfig().page;
    this.actionService.getListActiveAction().subscribe(res => {
      this.actions = res;
    });
    this.entityService.getActiveEntity().subscribe(res => {
      this.entities = res;
    });
  }

  handleCancel() {
    this.submitted = false;
    this.isVisibleAdd = false;
    this.cancelAdd.emit(this.isVisibleAdd);
    this.formAdd.reset();
  }

  get f() {
    return this.formAdd.controls;
  }

  handleOk() {
    this.submitted = true;
    if (this.formAdd.valid) {
      this.roleService.addRole(this.formAdd.value).subscribe((res: any) => {
        if (res) {
          this.notificationService.showNotification(Constant.SUCCESS, 'Thêm mới quyền thành công');
          this.submitted = false;
          this.isVisibleAdd = false;
          this.submitAdd.emit(this.isVisibleAdd);
          this.formAdd.reset();
        } else {
          this.notificationService.showNotification(Constant.ERROR, 'Thêm mới quyền thất bại');
        }
      }, (error: any) => {
        this.notificationService.showNotification(Constant.ERROR, 'Thêm mới quyền thất bại');
      });
    }
  }
}
