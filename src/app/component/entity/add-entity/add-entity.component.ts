import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Action} from '../../../model/action.model';
import {NotificationService} from '../../../service/notification.service';
import {EntityService} from "../../../service/entity.service";
import {EntityAddModel} from "../../../model/entity.class";

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent implements OnInit {

  @Input() isVisibleAdd: boolean;
  @Input() data: EntityAddModel;

  formAdd: FormGroup;
  submitted: boolean;
  @Output() submitAdd: EventEmitter<any> = new EventEmitter();
  @Output() dataAdd: EventEmitter<any> = new EventEmitter();
  loading: boolean;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private entityService: EntityService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data != undefined) {
      this.formAdd = this.fb.group({
        name: [this.data.name, Validators.required]
      });
    }
  }

  handleOk() {
    this.submitted = true;
    this.isVisibleAdd = true;
    if (this.formAdd.valid) {
      this.loading = true;
      this.data.name = this.formAdd.get('name').value.toUpperCase();
      this.entityService.add(this.data).subscribe(res => {
        this.loading = false;
        this.notificationService.showMessage('info', "Thêm mới đối tượng thành công, tên đối tượng: " + res.name);
        this.isVisibleAdd = false;
        this.submitAdd.emit(this.isVisibleAdd);
        this.submitted = false;
        this.formAdd.reset();
      }, (error: any) => {
        this.loading = false;
        this.notificationService.showMessage('error', error.error.message);
      })
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
