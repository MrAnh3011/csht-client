import {Action} from '@ngrx/store';
import {Menu} from '../../../model/menu.class';
import {Update} from '@ngrx/entity';

export enum MenuActionTypes {
  GetMenu = '[Menu] Get Menu',
  GetMenuSuccess = '[Menu] Get Menu Success',
  GetMenuFail = '[Menu] Get Menu Fail',
  AddMenu = '[Menu] Add Menu',
  AddMenuSuccess = '[Menu] Add Menu Success',
  AddMenuFail = '[Menu] Add Menu Fail',
  DeleteMenu = '[Menu] Delete Menu',
  DeleteMenuSuccess = '[Menu] Delete Menu Success',
  DeleteMenuFail = '[Menu] Delete Menu Fail',
  UpdateMenu = '[Menu] Update Menu',
  UpdateMenuSuccess = '[Menu] Update Menu Success',
  UpdateMenuFail = '[Menu] Update Menu Fail',
  GetMenuByUser = '[Menu] Get Menu By User',
  GetMenuByUserSuccess = '[Menu] Get Menu By User Success',
  GetMenuByUserFail = '[Menu] Get Menu By User Fail'
}
export class GetMenu implements Action {
  public readonly type = MenuActionTypes.GetMenu;
}
export class GetMenuSuccess implements Action {
  public readonly type = MenuActionTypes.GetMenuSuccess;
  constructor(public menu: Menu[]) {}
}
export class GetMenuFail  implements Action {
  public readonly type = MenuActionTypes.GetMenuFail;
  constructor(public error: string) {}
}
// export class DeleteMenu implements Action {
//   public readonly type = MenuActionTypes.DeleteMenu;
//   constructor(public id: number) {}
// }
// export class DeleteMenuSuccess implements Action {
//   public readonly type = MenuActionTypes.DeleteMenuSuccess;
//   constructor(public id: number) {}
// }
// export class DeleteMenuFail implements Action {
//   public readonly type = MenuActionTypes.DeleteMenuFail;
//   constructor(public error: string) {}
// }
export class AddMenu implements Action {
  public readonly type = MenuActionTypes.AddMenu;
  constructor(public  menu: Menu) {}
}
export class AddMenuSuccess implements Action {
  public readonly type = MenuActionTypes.AddMenuSuccess;
  constructor(public menu: Menu) {}
}
export class AddMenuFail implements Action {
  public readonly type = MenuActionTypes.AddMenuFail;
  constructor(public error: string) {}
}
export class UpdateMenu implements Action {
  public readonly type = MenuActionTypes.UpdateMenu;
  constructor(public menu: Menu) {}
}
export class UpdateMenuSuccess implements Action {
  public readonly type = MenuActionTypes.UpdateMenuSuccess;
  constructor(public menu: Update<Menu>) {}
}
export class UpdateMenuFail implements Action {
  public readonly type = MenuActionTypes.UpdateMenuFail;
  constructor(public error: string) {}
}
export class GetMenuByUser implements Action {
  public readonly type = MenuActionTypes.GetMenuByUser;
  constructor(public username: string) {}
}
export class GetMenuByUserSuccess implements Action {
  public readonly type = MenuActionTypes.GetMenuByUserSuccess;
  constructor(public menu: Menu[]) {}
}
export class GetMenuByUserFail implements Action {
  public readonly type = MenuActionTypes.GetMenuByUserFail;
  constructor(public error: string) {}
}
export type MenuActions = UpdateMenuFail | UpdateMenuSuccess | UpdateMenu |
  AddMenuFail | AddMenuSuccess | AddMenu |
  GetMenuFail | GetMenuSuccess | GetMenu | GetMenuByUser | GetMenuByUserSuccess | GetMenuByUserFail;
