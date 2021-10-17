import {Injectable} from '@angular/core';
import {MenuService} from '../../../service/menu.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as menuAction from '../../menu/redux/menu.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import { Menu } from '../../../model/menu.class';
@Injectable()
export class MenuEffects {
  constructor(private menuService: MenuService , private actions$: Actions) {
  }
  @Effect()
  loadMenu$: Observable<Action> = this.actions$.pipe(
    ofType<menuAction.GetMenu>(
      menuAction.MenuActionTypes.GetMenu
    ),
    mergeMap((action: menuAction.GetMenu) =>
      this.menuService.getMenu().pipe(
        map(
          (data: Menu[]) =>
            new menuAction.GetMenuSuccess(data)
        ),
        catchError(err => of(new menuAction.GetMenuFail(err)))
      )
    )
  );
  // @Effect()
  // deleteMenu$: Observable<Action> = this.actions$.pipe(
  //   ofType<menuAction.DeleteMenu>(
  //     menuAction.MenuActionTypes.DeleteMenu
  //   ),
  //   map((action: menuAction.DeleteMenu) => action.id),
  //   mergeMap((id: number) =>
  //     this.menuService.deleteMenu(id).pipe(
  //       map(() => new menuAction.DeleteMenuSuccess(id))
  //       ,
  //       catchError(err => of(new menuAction.DeleteMenuFail(err)))
  //     ),
  //   )
  // );
  @Effect()
  addMenu$: Observable<Action> = this.actions$.pipe(
    ofType<menuAction.AddMenu>( menuAction.MenuActionTypes.AddMenu),
    map((action: menuAction.AddMenu) => action.menu),
    mergeMap((menu: Menu) =>
      this.menuService.addMenu(menu).pipe(map((menuNew: Menu) => new menuAction.AddMenuSuccess(menuNew)),
        catchError(err => of(new menuAction.AddMenuFail(err)))
      ),
    )
  );
  @Effect()
  editMenu$: Observable<Action> = this.actions$.pipe(
    ofType<menuAction.UpdateMenu>(menuAction.MenuActionTypes.UpdateMenu),
    map((action: menuAction.UpdateMenu) => action.menu),
    mergeMap((menu: Menu) =>
      this.menuService.updateMenu(menu).pipe(map(() =>
          new menuAction.UpdateMenuSuccess({id : menu.menuId, changes: menu})),
        catchError(err => of(new menuAction.UpdateMenuFail(err)))
      ),
    )
  );
  @Effect()
  loadMenuByUser$: Observable<Action> = this.actions$.pipe(
    ofType<menuAction.GetMenuByUser>(
      menuAction.MenuActionTypes.GetMenuByUser
    ),
    mergeMap((action: menuAction.GetMenuByUser) =>
      this.menuService.getMenuByUser().pipe(
        map(
          (data: Menu[]) =>
            new menuAction.GetMenuByUserSuccess(data)
        ),
        catchError(err => of(new menuAction.GetMenuByUserFail(err)))
      )
    )
  );
}
