import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../core/models/menu.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../../../share/constants/constant.class';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu.service';
import { AppConfigService } from '../../../core/services/app-config.service';
import { Role } from '../../../core/models/role.class';
import { UrlConstant } from '../../../share/constants/url.class';
import { ActionService } from '../../action/action.services';
import { RoleService } from "../../role/role.service";
import { AuthGuard } from "../../../share/guards/auth.guard";
import {TableTreeFilterAbstract} from '../../../share/component/table/table-tree-filter.abstract';


@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss']
})
export class ViewMenuComponent extends TableTreeFilterAbstract implements OnInit {

  public readonly DOWNLOAD_REPORT_URL = UrlConstant.LIST_MENU + UrlConstant.REPORT_MENU;
  public readonly REPORT_NAME = Constant.REPORT_NAME;

  // mapOfExpandedData: { [key: string]: Menu[] } = {};
  menus: Menu[] = [];
  searchedMenus: Menu[] = [];
  searchText: string;

  isVisibleUpdate: boolean;
  selectedMenu: Menu;

  isVisibleAdd: boolean;

  checkDelete = true;
  checkAdd = true;
  checkUpdate = true;
  checkExport = true;

  data: any;
  sub: Subscription;
  pageSize: any;
  page: any;
  defaultPage: any;

  roles: Role[] = [];
  menuParent: Menu[] = [];
  constructor(
    // private store: Store<fromMenu.AppState>,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    public translate: TranslateService,
    // private actionsSubject$: ActionsSubject,
    private menuService: MenuService,
    private configService: AppConfigService,
    private actionServices: ActionService,
    private roleService: RoleService,
    private authGuard: AuthGuard
  ) {
    super('menuId', 'menuChildren');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pageSize = this.configService.getConfig().pageSize;
    this.page = this.configService.getConfig().page;
    this.defaultPage = this.configService.getConfig().defaultPage;
    // this.store.dispatch(new actionMenu.GetMenu());
    // this.store.pipe(select(fromMenu.getMenu)).subscribe((res) => {
    //   this.menus = res;
    //   this.searchedMenus = this.copyArray(this.menus);
    //   this.menus.forEach(item => {
    //     this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item, false);
    //   });
    //   this.setListOfAllData(this.menus);
    // });
    this.menuService.getAllMenuTree().subscribe(res => {
      this.menus = res.menuDtoList;
      this.searchedMenus = this.copyArray(this.menus);
      this.menus.forEach(item => {
        this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item, false);
      });
      this.setListOfAllData(this.menus);
    });

    this.menuService.getAll().subscribe(res => {
      this.menuParent = res.menuDtoList;
    });
    // this.menus.forEach(item => {
    //   this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item, false);
    // });
    // const pagination = {
    //   page: 1,
    //   pageSize: 10
    // };
    // this.store.dispatch(new actionRole.GetRoleLoad(pagination));
    // this.store.pipe(select(fromRole.getRole)).subscribe(res => {
    //   this.roles = res;
    // });
    this.roleService.getActiveRoles().subscribe((res) => {
      this.roles = res;
    });

  }

  sortById(a: Role, b: Role): number {
    return (b.roleId > a.roleId) ? 1 : -1;
  }


  showModalAdd() {
    this.isVisibleAdd = true;
  }

  // Show A Update Menu of Modal
  showModalUpdate(data: any) {
    this.isVisibleUpdate = true;
    this.selectedMenu = data;
    // console.log(this.selectedMenu);
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
      nzOnOk: () => this.deleteMenu()
    });
  }

  deleteMenu() {
    this.sub = this.menuService.deleteMenu(this.getCheckedIdList()).subscribe(res => {
      if (res) {
        this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_DELETE_SUCCESS);
        // this.store.dispatch(new actionMenu.GetMenu());
        this.mapOfExpandId = {};
        this.mapOfCheckedId = {};
        location.reload();
      }
    });
  }

  updateMenu(value: any) {
    this.isVisibleUpdate = false;
    this.sub = this.menuService.updateMenu(value).subscribe(data => {
      if (data != null) {
        this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_UPDATE_SUCCESS);
        // this.store.dispatch(new actionMenu.GetMenu());
        this.isVisibleUpdate = false;
        location.reload();
      }
    });
  }

  closeModalAdd(value: boolean) {
    this.isVisibleAdd = value;
  }

  closeModalUpdate(value: boolean) {
    this.isVisibleUpdate = value;
  }

  addMenu(value: any) {
    this.sub = this.menuService.addMenu(value).subscribe(res => {
      if (res) {
        this.notificationService.showNotification(Constant.SUCCESS, Constant.MESSAGE_ADD_SUCCESS);
        this.isVisibleAdd = false;

        location.reload();
      }
    });
  }

  searchData() {
    const filter = this.searchText.trim().toLowerCase();
    this.searchedMenus = this.copyArray(this.listOfAllData);

    this.menus.forEach(item => {
      this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item, false);
    });

    if (this.searchText.trim().length > 0) {
      this.searchedMenus = this.searchedMenus.filter(i => this.searchNode(i, filter));
      this.searchedMenus.forEach((i) => {
        this.mapOfExpandedData[i.menuId] = this.convertTreeToList(i);
      });
    } else {
      this.searchedMenus.forEach((i) => {
        this.mapOfExpandedData[i.menuId] = this.convertTreeToList(i, false);
      });
    }
  }
}
