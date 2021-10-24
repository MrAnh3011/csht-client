import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../core/models/role.class';
import { Group } from '../../../core/models/group.class';
import { Constant } from '../../../share/constants/constant.class';
import { NotificationService } from '../../../core/services/notification.service';
import { GroupService } from '../group.service';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  @Input() isVisibleAdd: boolean;
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  @Output() data: EventEmitter<any> = new EventEmitter();
  @Input() roleAdd: Role[] = [];
  roleResponses: Role[] = [];
  formAdd: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private notificationService: NotificationService,
    private groupService: GroupService) {
    this.formAdd = fb.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      createdDate: new Date(),
      description: [null, [Validators.maxLength(100)]],
      status: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  handleCancel() {
    this.submitted = false;
    this.isVisibleAdd = false;
    this.submitAdd.emit(this.isVisibleAdd);
    this.formAdd.reset();
  }

  get f() {
    return this.formAdd.controls;
  }

  handleOk() {
    this.submitted = true;
    if (this.formAdd.valid) {

      this.groupService.addGroup(this.formAdd.value).subscribe((res: any) => {
        if (res) {
          this.notificationService.showNotification(Constant.SUCCESS, 'Thêm mới thông tin nhóm thành công');
          this.data.emit();
          this.submitted = false;
          this.formAdd.reset();
        } else {
          this.notificationService.showNotification(Constant.ERROR, 'Thêm mới thông tin nhóm thất bại');
        }
      }, (error: any) => {
        this.notificationService.showNotification(Constant.ERROR, 'Thêm mới thông tin nhóm thất bại');
      });
    }
  }
}
