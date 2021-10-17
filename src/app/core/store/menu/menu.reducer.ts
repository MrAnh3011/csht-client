import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Menu } from '../../models/menu.class';
import * as fromRoot from '../../models/app-state';
import * as menuAction from './menu.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface MenuState extends EntityState<Menu> {
  selectedMenuId: number | null;
  loading: boolean;
  error: string;
}
export interface AppState extends fromRoot.AppState {
  menus: MenuState;
}
export function sortByPriority(a: Menu, b: Menu): number {
  return (b.orderPriority > a.orderPriority) ? 1 : -1;
}
export const menuAdapter: EntityAdapter<Menu> = createEntityAdapter<Menu>({
  sortComparer: sortByPriority
});
export const defaultMenu: MenuState = {
  ids: [],
  entities: {},
  selectedMenuId: null,
  loading: false,
  error: ''
};
export const initialState = menuAdapter.getInitialState(defaultMenu);
export function menuReducer(
  state = initialState,
  action: menuAction.MenuActions
): MenuState {
  switch (action.type) {
    case menuAction.MenuActionTypes.GetMenuSuccess: {
      return menuAdapter.setAll(action.menu, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case menuAction.MenuActionTypes.GetMenuFail: {
      return {
        ...state,
        entities: {},
        loading: false,
        error: action.type
      };
    }
    case menuAction.MenuActionTypes.GetMenuByUserSuccess: {
      return menuAdapter.setAll(action.menu, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case menuAction.MenuActionTypes.GetMenuByUserFail: {
      return {
        ...state,
        entities: {},
        loading: false,
        error: action.type
      };
    }
    case menuAction.MenuActionTypes.UpdateMenuSuccess: {
      return menuAdapter.updateOne(action.menu, state);
    }
    case menuAction.MenuActionTypes.UpdateMenuFail: {
      return {
        ...state,
        error: action.error
      };
    }
    case menuAction.MenuActionTypes.AddMenuSuccess: {
      return menuAdapter.addOne(action.menu, state);
    }
    case menuAction.MenuActionTypes.AddMenuFail: {
      return {
        ...state,
        error: action.error
      };
    }
    // case menuAction.MenuActionTypes.DeleteMenuSuccess: {
    //   return menuAdapter.removeOne(action.id, state);
    // }
    // case  menuAction.MenuActionTypes.DeleteMenuFail: {
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    // }
    default: {
      return state;
    }
  }
}
const getMenuFeatureState = createFeatureSelector<MenuState>(
  'menus'
);
export const getMenu = createSelector(
  getMenuFeatureState,
  menuAdapter.getSelectors().selectAll
);

export const getGroupsLoading = createSelector(
  getMenuFeatureState,
  (state: MenuState) => state.loading
);

export const getError = createSelector(
  getMenuFeatureState,
  (state: MenuState) => state.error
);
