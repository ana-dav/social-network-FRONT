import { UserActionTypes, DataActionTypes } from '../types/actions';
import { UserAction } from '../types/userTypes';
import { UserInitState } from '../types/types';

const initialState: UserInitState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

function userReducer(
  state: UserInitState = initialState,
  action: UserAction,
): UserInitState {
  switch (action.type) {
    case UserActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case UserActionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case UserActionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case UserActionTypes.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case DataActionTypes.LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case DataActionTypes.UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId,
        ),
      };
    default:
      return state;
  }
}

export default userReducer;
