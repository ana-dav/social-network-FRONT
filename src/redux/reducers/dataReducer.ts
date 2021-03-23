import { DataActionTypes, UIActionTypes } from '../types/actions';
import { DataAction } from '../types/dataTypes';
import { DataInitState } from '../types/types';

const initialState: DataInitState = {
  posts: [],
  post: {},
  loading: false,
};

function dataReducer(state = initialState, action: DataAction): DataInitState {
  let index;
  switch (action.type) {
    case UIActionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case DataActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case DataActionTypes.SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DataActionTypes.LIKE_POST:
    case DataActionTypes.UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.screamId === action.payload.screamId,
      );
      state.posts[index] = action.payload;
      if (state.post.screamId === action.payload.screamId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DataActionTypes.DELETE_POST:
      index = state.posts.findIndex((post) => post.screamId === action.payload);
      state.posts.splice(index, 1);
      return { ...state };
    case DataActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DataActionTypes.SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };

    default:
      return state;
  }
}

export default dataReducer;
