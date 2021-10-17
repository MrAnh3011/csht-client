import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromRoot from '../../models/app-state';
import * as roleAction from './role.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Role } from '../../models/role.class';
interface RoleState extends EntityState<Role> {
  selectedRoleId: number | null;
  loading: boolean;
  error: string;
  total: number;
}
export interface AppState extends fromRoot.AppState {
  roles: RoleState;
}
export function sortById(a: Role, b: Role): number {
  return (b.roleId > a.roleId) ? 1 : -1;
}
export const roleAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  // sortComparer: sortById,
});
export const defaultRole: RoleState = {
  ids: [],
  entities: {},
  selectedRoleId: null,
  loading: false,
  error: '',
  total: 0
};
export const initialState = roleAdapter.getInitialState(defaultRole);
export function roleReducer(
  state = initialState,
  action: roleAction.RoleActions
): RoleState {
  switch (action.type) {
    case roleAction.RoleAction.GetRoleSuccess: {
      return roleAdapter.setAll(action.role, {
        ...state,
        loading: false,
        loaded: true,
        total: action.total
      });
    }
    case roleAction.RoleAction.GetRoleFail: {
      return {
        ...state,
        entities: {},
        loading: false,
        error: action.type
      };
    }
    case roleAction.RoleAction.EditRoleSuccess: {
      return roleAdapter.updateOne(action.payload, state);
    }
    case roleAction.RoleAction.EditRoleFail: {
      return {
        ...state,
        error: action.err
      };
    }
    case roleAction.RoleAction.AddRoleSuccess: {
      return roleAdapter.addOne(action.payload, state);
    }
    case roleAction.RoleAction.AddRoleFail: {
      return {
        ...state,
        error: action.err
      };
    }
    case roleAction.RoleAction.DeleteRoleSuccess: {
      return roleAdapter.removeMany(action.payload, state);
    }
    case roleAction.RoleAction.DeleteRoleFail: {
      return {
        ...state,
        error: action.err
      };
    }
    default: {
      return state;
    }
  }
}
const getRoleFeatureState = createFeatureSelector<RoleState>(
  'roles'
);
export const getRole = createSelector(
  getRoleFeatureState,
  roleAdapter.getSelectors().selectAll
);

export const getRoleLoading = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.loading
);

export const getError = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.error
);

export const getTotal = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.total
);
