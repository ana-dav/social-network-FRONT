import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

import { AppActions } from './types/dataTypes';

const initialState = {};
const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;

export type AppState = ReturnType<typeof reducers>;
