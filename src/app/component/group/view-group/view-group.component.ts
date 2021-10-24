import { AppConfigService } from '../../../core/services/app-config.service';
import { Component, OnInit } from '@angular/core';
import { Group, Pagination } from '../../../core/models/group.class';
import { ActionsSubject, Store } from '@ngrx/store';
import { Constant } from '../../../share/constants/constant.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { GroupService } from '../group.service';
import { Subscription } from 'rxjs';
import { Role } from '../../../core/models/role.class';
import { LoaderService } from '../../../core/services/loader.service';
import { UrlConstant } from '../../../share/constants/url.class'
import { TableSelectionAbstract } from '../../../share/component/table/table-selection.abstract';
import { ActionService } from '../../action/action.services';
import { RoleService } from '../../role/role.service';
import { MenuRoles } from '../../../core/models/menuRoles.class';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent extends TableSelectionAbstract implements OnInit {
  public readonly DOWNLOAD_REPORT_URL = UrlConstant.LIST_GROUP + UrlConstant.REPORT_GROUP;
  public readonly REPORT_NAME = Constant.REPORT_NAME;

  groups: Group[] = [];
  searchGroups: Group[] = [];
  isVisibleAdd: boolean;
  isVisibleUpdate: boolean;
  group: Group;
  data: any;
  sub: Subscription;
  roles: Role[] = [];
  loading: boolean;
  checkDelete = true;
  checkAdd = true;
  checkUpdate = true;
  checkSetAuthen = true;
  checkExport = true;
  pageSize: any;
  page: any;
  defaultPage: any;
  searchText: string = "";
  listPermission: any;
  pagination: Pagination = new Pagination();
  total: number;
  nodes: MenuRoles[] = [];

  // Phân quyền
  isVisibleRole = false;
  defaultSelectedKeys: any[] = [];
  defaultCheckedKeys: any[] = [];
  // End Phân quyền

  constructor(
    // private store: Store<fromGroup.AppState>,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private groupService: GroupService,
    private actionsSubject$: ActionsSubject,
    public loaderService: LoaderService,
    private configService: AppConfigService,
    private actionServices: ActionService,
    private roleService: RoleService) {
    super('groupId');
  }

  ngOnInit(): void {
    this.getListPermission();
    this.pageSize = this.configService.getConfig().pageSize;
    this.page = this.configService.getConfig().page;
    this.defaultPage = this.configService.getConfig().defaultPage;
    this.page = 1;
    this.pageSize = 10;
    this.getListGroup();
    this.getListRole();
    this.roleService.getRolesGroupByEntity().subscribe((res: any) => {
      if (res != null && res != undefined) {
        this.nodes = res
      }
    });
  }

  async getListPermission() {
    let arrayPermission: any;
    await this.actionServices.getActionByScreen(Constant.SCREEN.GROUP).then((value: any) => {
      arrayPermission = value;
      this.listPermission = new Set(arrayPermission);
    });
    this.checkAdd = this.listPermission.has(Constant.ACTION2.ADD);
    this.checkDelete = this.listPermission.has(Constant.ACTION2.DELETE);
    this.checkUpdate = this.listPermission.has(Constant.ACTION2.EDIT);
    this.checkExport = this.listPermission.has(Constant.ACTION2.EXPORT);
  }

  getListRole() {
    this.roleService.getRoles().subscribe((res: any) => {
      if (res !== null) {
        this.roles = res;
      }
    });
  }

  getListGroup(reset: boolean = false) {
    this.loading = true;
    this.pagination.page = this.page;
    if (reset) {
      this.page = 1;
    }
    this.groupService.getGroup(this.searchText.trim().toLowerCase()).subscribe((res: any) => {
      if (res !== null) {
        this.searchGroups = res.groupDtoList;
        this.total = res.totalRow;
        this.loading = false;
      }
    });
  }

  showModalAdd() {
    this.isVisibleAdd = true;
  }

  showModalUpdate(data: any) {
    this.isVisibleUpdate = true;
    this.group = data;
  }

  showModalAuthen(data: any): void {
    // this.isVisibleAuthen = true;
    console.log(data);
    this.group = data;
    this.isVisibleRole = true;
  }

  closeModalAuthen(value: any) {
    var success = value;
    if (success) {
      location.reload();
    }
    this.isVisibleRole = false;
  }


  get() {
    this.translate.use(this.translate.defaultLang).subscribe(data => {
      this.data = data;
    });
  }

  showConfirm(): void {
    this.get();
    this.modalService.confirm({
      nzTitle: this.data.title_confirm_delete,
      nzContent: this.data.content_confirm_delete,
      nzOkText: this.data.ok,
      nzCancelText: this.data.cancel,
      nzOnOk: () => this.deleteGroup()
    });
  }

  deleteGroup() {
    //this.store.dispatch(new groupAction.DeleteGroup(this.getCheckedIdList()));
  }

  updateGroup() {
    this.closeModalUpdate();
    this.getListGroup();
  }

  closeModalUpdate() {
    this.isVisibleUpdate = false;
  }

  addGroup() {
    this.closeModalAdd();
    this.getListGroup();
  }

  closeModalAdd() {
    this.isVisibleAdd = false;
  }

  searchData() {
    let filter = this.searchText.trim().toLowerCase();
    this.searchGroups = this.groups.filter(item => (item.name.toLowerCase()).includes(filter));
  }

  getRowIndex = (index: any, pageIndex: any, pageSize: any) => index + 1 + pageSize * (pageIndex - 1);
}
