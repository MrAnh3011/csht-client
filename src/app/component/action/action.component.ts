import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TableSelectionAbstract } from '../../share/component/table/table-selection.abstract';

import { NotificationService } from '../../core/services/notification.service';
import { RoleService } from '../role/role.service';
import { LoaderService } from '../../core/services/loader.service';
import { AppConfigService } from '../../core/services/app-config.service';
import { Action, ActionFilter } from '../../core/models/action.model';
import { ActionService } from '../action/action.services';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent extends TableSelectionAbstract implements OnInit {
  actions: Action[] = [];
  allActions: Action[] = [];
  data: any;
  formSearch: FormGroup;
  loading: boolean;
  page: any;
  defaultPage: any;
  listPermission: any;
  searchText: any;
  pageSize: any;
  @Input() isView = false;
  nzCanceText: string;
  nzOkText: string;
  action: Action = null;
  submitted: boolean;
  isVisibleAdd = false;
  isVisibleUpdate = false;
  total: number;
  actionFilter = new ActionFilter();

  getListAction(reset: boolean = false) {
    this.loading = true;
    if (reset) {
      this.page = 1;
    }
    this.actionService.getAction(this.pageSize, this.page - 1).subscribe(res => {
      if (res !== null) {
        this.data = res;
        this.loading = false;
        this.total = res.length;
        super.setListOfAllData(this.actions);
      }
    });
  }

  constructor(
    public translate: TranslateService,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private actionsSubject$: ActionsSubject,
    public loaderService: LoaderService,
    private configService: AppConfigService,
    private fb: FormBuilder,
    private actionService: ActionService,
  ) {
    super('id');
    this.formSearch = this.fb.group({
      name: null,
    });
  }

  ngOnInit(): void {
    this.pageSize = this.configService.getConfig().pageSize;
    this.page = this.configService.getConfig().page;
    this.defaultPage = this.configService.getConfig().defaultPage;
    this.page = 1;
    this.pageSize = 10;
    this.initData();
    // this.getListAction();

    this.get();
  }
  initData(): void {
    this.actionFilter.name = '';
    this.actionFilter.status = 0;
    this.actionFilter.pageSize = 10;
    this.actionFilter.page = 1;

    // this.actionService.getListAction2(this.actionFilter).subscribe(data => {
    //   if (data && data.errorCode === '200') {
    //   } else {
    //     this.notificationService.showNotification(Constant.ERROR, data.errorDescription);
    //   }
    // }, error => {
    //   this.loading = false;
    // });
  }


  get() {
    this.translate.use(this.translate.currentLang).subscribe(data => {
      this.data = data;
    });
  }

  getRowIndex(index: number, pageIndex: number, pageSize: number) {
    return index + 1 + pageSize * (pageIndex - 1);
  }

  searchActions() {
    this.loading = true;
    if (this.searchText) {
      this.actionService.searchAction(this.searchText).subscribe(res => {
        if (res !== null) {
          this.data = res.data;
          this.total = this.data.length;
          this.page = 1;
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        this.notificationService.showMessage('error', error.error.errorDescription);
      });
    } else {
      this.getListAction();
    }
  }

  deleteContract(data: any) {
    if (data != undefined && data.actionId != undefined) {
      data.status = -1;
      this.actionService.deleteAction(data).subscribe((res: any) => {
        this.getListAction();
        this.notificationService.showMessage('success', 'Xóa Action thành công');
      }, (error: any) => {
        this.notificationService.showMessage('error', error.error.errorDescription);
      });
    }
  }

  showModalUpdate(data: any) {
    this.action = data;
    this.isVisibleAdd = true;
  }

  showModalAdd() {
    this.action = undefined;
    this.isVisibleAdd = true;
  }

  updateActions(value: any) {
    this.isVisibleAdd = true;
    this.submitted = true;
    this.actions = [
      ...this.allActions,
      value
    ];
  }

  closeModelAdd(value: any) {
    this.isVisibleAdd = value;
  }

}
