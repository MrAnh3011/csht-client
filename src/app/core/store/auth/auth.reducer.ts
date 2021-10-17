import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthModel } from '../../models/auth.model';
import * as fromRoot from '../../models/app-state';
import * as actionAuth from './auth.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Constant } from "../../../share/constants/constant.class";

interface AuthState extends EntityState<AuthModel> {
  selectId: number | null;
  ids:[];
  entities: {};
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
}
export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}
export const authAdapter: EntityAdapter<AuthModel> = createEntityAdapter<AuthModel>();
export const defaultAuth: AuthState = {
  selectId: null,
  ids: [],
  entities: {},
  loading: false,
  error: '',
  isAuthenticated: false,
};
export const initialState = authAdapter.getInitialState(defaultAuth);
export function authReducer(state = initialState, action: actionAuth.AuthActions): AuthState {
  switch (action.type) {
    case actionAuth.AuthActionTypes.LoginSuccess: {
      return authAdapter.addOne(action.payload, {
        ...state,
        isAuthenticated: true,
        loaded: true
      });
    }
    case actionAuth.AuthActionTypes.LoginFail: {
      return {
        ...state,
        entities: {},
        isAuthenticated: false,
        error: Constant.LOGIN_FAIL
      };
    }
    default: {
      return state;
    }
  }
}
export const getAuthFeatureState = createFeatureSelector<AuthState>('auth');
export const getAuth = createSelector(
  getAuthFeatureState,
  authAdapter.getSelectors().selectAll
);

export const getLoginError = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.error
);


