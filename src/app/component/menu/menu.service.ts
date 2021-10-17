import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Observable } from 'rxjs';
import { UrlConstant } from '../../share/constants/url.class';
import { Menu } from '../../core/models/menu.class';
import { Constant } from "../../share/constants/constant.class";

@Injectable()
export class MenuService extends BaseService {
    private readonly CONTROLLER_URL = UrlConstant.CONTROLLER.MENU;

    getMenu(): Observable<Menu[]> {
        return this.get(UrlConstant.LIST_MENU);
    }

    addMenu(menu: Menu): Observable<Menu> {
        return this.post(UrlConstant.LIST_MENU, menu);
    }

    deleteMenu(id: number[]): Observable<number[]> {
        return this.delete(UrlConstant.LIST_MENU, id);
    }

    updateMenu(menu: Menu): Observable<Menu> {
        return this.put(UrlConstant.LIST_MENU, menu);
    }

    getMenuByUser(): Observable<Menu[]> {
        return this.get(UrlConstant.LIST_MENU + '/username');
    }

    getMenuTreeByUser(username: string): Observable<Menu[]> {
        return this.get(UrlConstant.LIST_MENU + '/getMenu?username=' + username);
    }

    getMenusListReport(data: any) {
        return this.post(UrlConstant.LIST_MENU + '/reportMenu', data, {}, 'blob');
    }

    getAll(): Observable<any> {
        var result = this.post(UrlConstant.LIST_MENU + '/filter', { status: Constant.RECORD.STATUS.FILTER_ALL });
        return result;
    }

    getAllMenuTree(): Observable<any> {
        var result = this.post(UrlConstant.LIST_MENU + '/getMenuTree', { status: Constant.RECORD.STATUS.FILTER_ALL });
        return result;
    }
}
