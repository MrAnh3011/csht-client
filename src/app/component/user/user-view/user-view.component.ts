import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../core/models/user.class';
import { SearchUser, SearchUserParam } from '../../../core/models/searchUser.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '../../../core/services/notification.service';
import { Constant } from '../../../share/constants/constant.class';
import { LoaderService } from '../../../core/services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Role } from '../../../core/models/role.class';
import { Group } from '../../../core/models/group.class';
import * as fromGroup from '../../../core/store/group/group.reducer';
import { AppConfigService } from '../../../core/services/app-config.service';
import { MenuService } from '../../menu/menu.service';
import { Menu } from '../../../core/models/menu.class';
import { MenuRoles } from '../../../core/models/menuRoles.class';
import { UrlConstant } from '../../../share/constants/url.class';
import { TableSelectionAbstract } from 'src/app/shared/component/table/table-selection.abstract';
import { ActionService } from '../../action/action.services';
import { RoleService } from '../../role/role.service';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserViewComponent extends TableSelectionAbstract implements OnInit, OnDestroy {
  public readonly DOWNLOAD_REPORT_URL = UrlConstant.DETAIL_USER + UrlConstant.REPORT_USER;
  public readonly REPORT_NAME = Constant.REPORT_NAME;

  users: User[] = [];
  loading = false;
  total: number;
  search: SearchUser = new SearchUser();
  formSearch: FormGroup;
  searchParam: SearchUserParam;

  isVisible = false;
  isVisibleAdd = false;
  isVisibleAuthen = false;
  data: any;
  sub: Subscription;
  user: User;
  roles: Role[] = [];
  groups: Group[] = [];
  checkDelete = true;
  checkAdd = true;
  checkUpdate = true;
  checkAuthen = true;
  checkExport = true;
  a = new Set();
  pageSize: any;
  page: any;
  defaultPage: any;
  listPermission: any;
  menus: Menu[] = [];
  nodes: MenuRoles[] = [];
  checkImport = false;
  isVisibleImport = false;

  // Phân quyền
  isVisibleRole = false;
  defaultSelectedKeys = [];
  defaultCheckedKeys = [];
  // End Phân quyền

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    public loaderService: LoaderService,
    public translate: TranslateService,
    public store: Store<fromGroup.AppState>,
    private configService: AppConfigService,
    private menuService: MenuService,
    private actionServices: ActionService,
    private roleService: RoleService,
    private groupService: GroupService
  ) {
    super('userId');
    this.formSearch = this.fb.group({
      name: null,
      email: null,
      mobile: null,
      groupId: null,
      status: null,
      username: null,
    });
  }

  ngOnInit(): void {
    this.getListPermission();
    this.pageSize = this.configService.getConfig().pageSize;
    this.page = this.configService.getConfig().page;
    this.defaultPage = this.configService.getConfig().defaultPage;
    this.search.page = this.page;
    this.search.pageSize = this.defaultPage;
    this.search.sortType = true;
    this.search.status = Constant.RECORD.STATUS.FILTER_ALL;
    this.searchData();
    this.getListRole();
    this.getListGroup();
    this.getMenuWithRoles();
    this.roleService.getRolesGroupByEntity().subscribe((res: any) => {
      if (res != null && res != undefined) {
        this.nodes = res
      }
    });
  }

  async getListPermission() {
    let arrayPermission: any;
    /* await this.actionServices.getActionByScreen(Constant.SCREEN.USER).then(value => {
      arrayPermission = value;
      this.listPermission = new Set(arrayPermission);
    });
    this.checkAdd = this.listPermission.has(Constant.ACTION2.ADD);
    this.checkDelete = this.listPermission.has(Constant.ACTION2.DELETE);
    this.checkUpdate = this.listPermission.has(Constant.ACTION2.EDIT);
    this.checkExport = this.listPermission.has(Constant.ACTION2.EXPORT);
    this.checkImport = this.listPermission.has(Constant.ACTION2.IMPORT); */

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get() {
    this.translate.use(this.translate.defaultLang).subscribe(data => {
      this.data = data;
    });
  }

  getListRole() {
    this.roleService.getRoles().subscribe((res: any) => {
      this.roles = res;
    });
  }

  getListGroup() {
    this.groupService.getGroups({ status: Constant.RECORD.STATUS.FILTER_ALL }).subscribe((res: any) => {
      this.groups = res.groupDtoList;
    });
  }

  searchData(reset: boolean = false): void {
    // this.loading = true;
    if (reset) {
      this.search.page = 1;
    }

    this.userService.getUser(this.search).subscribe((res) => {
      this.users = res.userDtoList;
      if (this.users != null) {
        super.setListOfAllData(this.users);
      } else {
        super.setListOfAllData([]);
      }
      this.total = res.totalRow;
      this.loading = false;
    });
  }

  getMenuWithRoles() {
    this.menuService.getMenu().subscribe((res: any) => {
      this.menus = res;
    });
  }

  onSubmit() {
    this.search.email = this.formSearch.get('email')!.value;
    this.search.name = this.formSearch.get('name')!.value;
    this.search.phone = this.formSearch.get('mobile')!.value;
    this.search.groupId = this.formSearch.get('groupId')!.value;
    this.search.status = this.formSearch.get('status')!.value;
    this.search.userName = this.formSearch.get('username')!.value;

    this.searchParam = new SearchUserParam();
    this.searchParam.setUserNameParam(this.search.name);
    this.searchParam.setEmailParam(this.search.email);
    this.searchParam.setPhoneParam(this.search.phone);
    this.searchParam.setGroupParam(this.search.groupId);
    this.searchParam.setStatusParam(this.search.status);

    this.searchData(true);
  }

  showConfirm(): void {
    this.get();
    this.modalService.confirm({
      nzTitle: this.data.title_confirm_delete,
      nzContent: this.data.content_confirm_delete,
      nzOkText: this.data.ok,
      nzCancelText: this.data.cancel,
      nzOnOk: () => this.deleteUser()
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.getCheckedIdList()).subscribe(res => {
      this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_DELETE_SUCCESS);
      this.searchData(true);
    });
  }

  getStatusUser(status: number) {
    if (status === 0) {
      return Constant.IN_ACTIVE;
    } else if (status === 1) {
      return Constant.ACTIVE;
    } else if (status === 2) {
      return Constant.LOCK;
    }
    return Constant.DELETE_STATUS;
  }

  showModal(data: any): void {
    this.isVisible = true;
    this.user = data;
  }

  showModalAuthen(data: any): void {
    // this.isVisibleAuthen = true;
    console.log(data);
    this.user = data;
    this.isVisibleRole = true;
  }

  closeModalUpdate(value: any) {
    this.isVisible = value;
  }

  closeModalAuthen(value: any) {
    // this.isVisibleAuthen = value;
    this.isVisibleRole = value;
  }

  updateUser(value: any) {
    this.isVisible = false;
    this.sub = this.userService.updateUser(value).subscribe((data) => {
      if (data != null) {
        this.notificationService.showNotification(
          Constant.SUCCESS,
          Constant.MESSAGE_UPDATE_SUCCESS
        );
        this.searchData(true);
      }
    });
  }

  authenUser(value: any) {
    this.isVisibleAuthen = false;
  }

  showModalAdd() {
    this.isVisibleAdd = true;
  }

  addUser(value: any) {
    this.isVisibleAdd = false;
    this.sub = this.userService.addUser(value).subscribe((data) => {
      if (data != null) {
        this.notificationService.showNotification(
          Constant.SUCCESS,
          Constant.MESSAGE_ADD_SUCCESS
        );
        this.searchData(true);
      }
    });
  }

  closeModalAdd(value: any) {
    this.isVisibleAdd = value;
  }

  getRowIndex = (index: any, pageIndex: any, pageSize: any) => index + 1 + pageSize * (pageIndex - 1);

  showModalImport() {
    this.isVisibleImport = true;
  }

  toggleModalImport(isVisible: boolean) {
    this.isVisibleImport = isVisible;
    this.searchData(true);
  }
}
