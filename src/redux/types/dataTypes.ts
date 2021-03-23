import { IPost } from './types';
import { DataActionTypes, UIActionTypes } from './actions';
import { UiAction } from './uiTypes';
import { UserAction } from './userTypes';

interface LoadingDataAction {
  type: UIActionTypes.LOADING_DATA;
}

interface SetPostsAction {
  type: DataActionTypes.SET_POSTS;
  payload: IPost[] | [];
}

interface SetPostAction {
  type: DataActionTypes.SET_POST;
  payload: IPost;
}

interface LikePostAction {
  type: DataActionTypes.LIKE_POST;
  payload: IPost;
}

interface UnlikePostAction {
  type: DataActionTypes.UNLIKE_POST;
  payload: IPost;
}

interface DeletePostAction {
  type: DataActionTypes.DELETE_POST;
  payload: string;
}

interface AddPostAction {
  type: DataActionTypes.ADD_POST;
  payload: IPost;
}

interface SubmitCommentAction {
  type: DataActionTypes.SUBMIT_COMMENT;
  payload: IPost;
}

export type DataAction =
  | LoadingDataAction
  | SetPostsAction
  | SetPostAction
  | LikePostAction
  | UnlikePostAction
  | DeletePostAction
  | AddPostAction
  | SubmitCommentAction;

export type UiDataAction = DataAction | UiAction;

export type AppActions = DataAction | UiAction | UserAction;
