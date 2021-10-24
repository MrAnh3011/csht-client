import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../../core/models/action.model';
import { ActionService } from '../action.services';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {
  @Input() isVisibleAdd: boolean;
  @Input() data: any;

  formAdd: FormGroup;
  submitted: boolean;
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  @Output() dataAdd: EventEmitter<any> = new EventEmitter();

  actions: Action[] = [];

  constructor(private fb: FormBuilder,
    private notificationService: NotificationService,
    private actionService: ActionService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data != undefined) {
      this.formAdd = this.fb.group({
        actionId: [this.data.actionId],
        name: [this.data.name, Validators.required],
        nameAscii: [this.data.nameAscii, Validators.required],
        status: [this.data.status]
      });
    } else {
      this.formAdd = this.fb.group({
        actionId: [null],
        name: [null, Validators.required],
        nameAscii: [null, Validators.required],
        status: [null],
      });
    }
  }


  handleOk() {
    this.submitted = true;
    this.isVisibleAdd = true;
    const data = {
      actionId: this.formAdd.get('actionId').value,
      name: this.formAdd.get('name').value,
      nameAscii: this.formAdd.get('nameAscii').value,
      status: this.formAdd.get('status').value
    };
    if (this.formAdd.valid) {
      // Them moi
      if (data.status == 0 || data.status == undefined) {
        this.actionService.addActions(data).subscribe(res => {
          this.actions = res;
          this.isVisibleAdd = false;
          this.submitAdd.emit(this.isVisibleAdd);
          this.submitted = false;
          this.formAdd.reset();
          this.notificationService.showMessage('success', 'Thêm mới thành công');
        }, error => {
          this.notificationService.showMessage('error', error.error.errorDescription);
        });
      }
      // Cap nhat
      else {
        this.actionService.updateActions(data).subscribe(res => {
          this.actions = res;
          this.isVisibleAdd = false;
          this.submitAdd.emit(this.isVisibleAdd);
          this.submitted = false;
          this.formAdd.reset();
          this.notificationService.showMessage('success', 'Cập nhật thông tin thành công');
        }, error => {
          this.notificationService.showMessage('error', error.error.errorDescription);
        });
      }
    }
  }

  handleCancel(): void {
    this.submitted = false;
    this.isVisibleAdd = false;
    this.submitAdd.emit(this.isVisibleAdd);
    this.formAdd.reset();
  }

  get f() {
    return this.formAdd.controls;
  }
}
