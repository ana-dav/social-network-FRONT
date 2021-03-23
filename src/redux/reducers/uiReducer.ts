import { UIActionTypes } from '../types/actions';
import { UiAction } from '../types/uiTypes';
import { UiInitState } from '../types/types';

const initialState: UiInitState = {
  loading: false,
  errors: null,
};

function uiReducer(
  state: UiInitState = initialState,
  action: UiAction,
): UiInitState {
  switch (action.type) {
    case UIActionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case UIActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case UIActionTypes.LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case UIActionTypes.STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default uiReducer;
