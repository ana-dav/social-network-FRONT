import { UserActionTypes, DataActionTypes } from './actions';
import { user, like } from './types';
import { UiAction } from './uiTypes';

interface SetAuthenticatedUserAction {
  type: UserActionTypes.SET_AUTHENTICATED;
}

interface SetUnauthenticatedUserAction {
  type: UserActionTypes.SET_UNAUTHENTICATED;
}

interface SetUserAction {
  type: UserActionTypes.SET_USER;
  payload: user;
}

interface SetLoadingUserAction {
  type: UserActionTypes.LOADING_USER;
}

interface LikePostDataAction {
  type: DataActionTypes.LIKE_POST;
  payload: like;
}

interface UnlikePostDataAction {
  type: DataActionTypes.UNLIKE_POST;
  payload: like;
}

export type UserAction =
  | SetAuthenticatedUserAction
  | SetUnauthenticatedUserAction
  | SetUserAction
  | SetLoadingUserAction
  | LikePostDataAction
  | UnlikePostDataAction;

export type UiUserAction = UiAction | UserAction;
