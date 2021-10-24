import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../../core/models/group.class';
import { Role } from '../../../core/models/role.class';
import { Subscription } from 'rxjs';
import { GroupService } from '../group.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Constant } from '../../../share/constants/constant.class';


@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {
  @Input() isVisibleUpdate: boolean;
  @Input() group: Group;
  @Input() roleUpdate: Role[] = [];
  @Output() submitUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelUpdate: EventEmitter<any> = new EventEmitter();

  formUpdate: FormGroup;
  submitted = false;
  roleResponses: Role[] = [];
  roleIds: string[] = [];
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private groupService: GroupService) {
    this.formUpdate = fb.group({
      groupId: null,
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: [null, [Validators.maxLength(100)]],
      status: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formUpdate.get('groupId').setValue(this.group.groupId);
    this.formUpdate.get('name').setValue(this.group.name);
    this.formUpdate.get('description').setValue(this.group.description);
    this.formUpdate.get('status').setValue(this.group.status);
  }

  handleCancel() {
    this.submitted = false;
    this.isVisibleUpdate = false;
    this.cancelUpdate.emit();
    this.formUpdate.reset();
  }

  get f() {
    return this.formUpdate.controls;
  }

  handleOk() {
    this.submitted = true;
    if (this.formUpdate.valid) {
      this.groupService.updateGroup(this.formUpdate.value).subscribe(res => {
        if (res) {
          this.isVisibleUpdate = false;
          this.notificationService.showNotification(Constant.SUCCESS, 'Cập nhật thông tin nhóm thành công');
          this.submitUpdate.emit();
          this.submitted = false;
          this.formUpdate.reset();
        } else {
          this.notificationService.showNotification(Constant.ERROR, 'Cập nhật thông tin nhóm thất bại');
        }
      }, (error: any) => {
        this.notificationService.showNotification(Constant.ERROR, 'Cập nhật thông tin nhóm thất bại');
      });
    }
  }

}
