import { UIActionTypes } from './actions';

interface SetErrorsAction {
  type: UIActionTypes.SET_ERRORS;
  payload: null;
}

interface ClearErrorsAction {
  type: UIActionTypes.CLEAR_ERRORS;
}

interface LoadingUIAction {
  type: UIActionTypes.LOADING_UI;
}

interface StopLoadingUIAction {
  type: UIActionTypes.STOP_LOADING_UI;
}

export type UiAction =
  | SetErrorsAction
  | ClearErrorsAction
  | LoadingUIAction
  | StopLoadingUIAction;
