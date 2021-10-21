import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Constant } from '../share/constants/constant.class';
import * as fromAuth from '../core/store/auth/auth.reducer';
import * as actionAuth from '../core/store/auth/auth.action';
import { ActionsSubject, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MenuService } from './menu/menu.service';
import { Menu } from '../core//models/menu.class';
import { AuthService } from './auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuLoginModel } from "../core/models/auth.model";


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  public config: PerfectScrollbarConfigInterface = {};

  static readonly ROUTE_DATA_PAGENAME = 'pagename';

  isCollapsed = false;
  username: string;
  name: string;
  avatarUrl: string;
  sub: Subscription;
  menus: MenuLoginModel[] = [];
  openMenuMap: { [id: string]: boolean } = {};
  selectedMenu: Menu;
  pageName: string;
  status: string;
  isMobile = false;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  mobileWidth = 768;
  lgWidth = 1366;
  currentUrl: string;
  slideWidth = 200;
  email: string;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<fromAuth.AppState>,
    private actionsSubject$: ActionsSubject,
    private menuService: MenuService,
    private authService: AuthService,
    private translate: TranslateService,
    private userService: UserService,
  ) {
    this.getCurrentUrl(this.route);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
    if (this.width >= this.lgWidth) {
      this.slideWidth = 265;
    } else {
      this.slideWidth = 210;
    }
  }

  ngOnInit(): void {
    console.log('done to here');
    const userInfo = JSON.parse(localStorage.getItem(Constant.CACHE_KEY.USER_INFO) || '');
    this.username = userInfo.userName;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.avatarUrl = userInfo.imageUrl != null ? userInfo.imageUrl : 'assets/image/avtDF.png';
    this.status = userInfo.status;
    this.sub = this.actionsSubject$.pipe(filter((action: any) => action.type === actionAuth.AuthActionTypes.Logout)).subscribe((action: any) => {
    });
    this.menus = JSON.parse(localStorage.getItem(Constant.CACHE_KEY.MENU) || '');
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getPageInfo())).subscribe((pageName: string) => {
        this.pageName = this.translate.instant(pageName);
      });
    this.pageName = this.translate.instant(this.getPageInfo());
    this.pageName = this.translate.instant(this.getPageInfo());
    this.isMobile = this.width < this.mobileWidth;
    if (this.width >= this.lgWidth) {
      this.slideWidth = 255;
    }
  }

  getMenuTreeByUser() {
    this.setOpenMenuMap(this.menus);
  }

  private getPageInfo() {
    let child = this.activeRoute.firstChild;
    if (child !== null) {
      while (child.firstChild) {
        child = child.firstChild;
      }
      if (child.snapshot.data[MainLayoutComponent.ROUTE_DATA_PAGENAME]) {
        return child.snapshot.data[MainLayoutComponent.ROUTE_DATA_PAGENAME];
      }
    }
    return '';
  }

  setOpenMenuMap(menus: MenuLoginModel[]) {
    return menus.some(menu => {
      this.openMenuMap[menu.menuId] = false;
      if (menu.menuChildren && menu.menuChildren.length > 0) {
        this.openMenuMap[menu.menuId] = this.setOpenMenuMap(menu.menuChildren);
      }
      if (menu.url === this.currentUrl) {
        this.openMenuMap[menu.menuId] = true;
        return true;
      }
    });
  }

  openHandler(value: number): void {
    for (const key in this.openMenuMap) {
      if (key !== value.toString()) {
        this.openMenuMap[key] = false;
      }
    }
    this.setParentMenuOpen(value, this.menus);
  }

  setParentMenuOpen(value: number, menus: MenuLoginModel[]) {
    return menus.some(menu => {
      this.openMenuMap[menu.menuId] = false;
      if (menu.menuChildren && menu.menuChildren.length > 0) {
        this.openMenuMap[menu.menuId] = this.setParentMenuOpen(value, menu.menuChildren);
      }
      if (menu.menuId === value) {
        this.openMenuMap[menu.menuId] = true;
        return true;
      }
    });
  }

  getCurrentUrl(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
      }
    });
  }

  logout() {
    // this.store.dispatch(new actionAuth.Logout());
    this.sub = this.authService.logout().subscribe((res: any) => {
      if (res) {
        localStorage.clear();
        this.route.navigate(['/login']);
      }
    }, (error: any) => {
      Cookie.delete(Constant.CACHE_KEY.TOKEN);
      localStorage.removeItem(Constant.CACHE_KEY.USER_INFO);
      localStorage.removeItem(Constant.CACHE_KEY.TOKEN);
      this.route.navigate(['/login']);
    });
  }
}
