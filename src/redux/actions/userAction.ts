import { Dispatch } from 'redux';
import axios from 'axios';
import api from '../../constants';
import { UserActionTypes, UIActionTypes } from '../types/actions';
import { UserAction, UiUserAction } from '../types/userTypes';
import { NewUser } from '../types/types';

const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common.Authorization = FBIdToken;
};

export const getUserData = () => (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.LOADING_USER });
  axios
    .get(`${api}/user`)
    .then((res) => {
      dispatch({
        type: UserActionTypes.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const loginUser = (
  userData: { email: string; password: string },
  history: any,
) => (dispatch: Dispatch<UiUserAction>) => {
  dispatch({ type: UIActionTypes.LOADING_UI });
  axios
    .post(`${api}/login`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch<any>(getUserData());
      dispatch({ type: UIActionTypes.CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: UIActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch: Dispatch<UserAction>) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common.Authorization;
  dispatch({ type: UserActionTypes.SET_UNAUTHENTICATED });
};

export const signupUser = (newUserData: NewUser, history: any) => (
  dispatch: Dispatch<UiUserAction>,
) => {
  dispatch({ type: UIActionTypes.LOADING_UI });
  axios
    .post(`${api}/signup`, newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch<any>(getUserData());
      dispatch({ type: UIActionTypes.CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: UIActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const uploadImage = (formData: any) => (
  dispatch: Dispatch<UserAction>,
) => {
  dispatch({ type: UserActionTypes.LOADING_USER });
  axios
    .post(`${api}/user/image`, formData)
    .then(() => {
      dispatch<any>(getUserData());
    })
    .catch((err) => console.error(err));
};

export const editUserDetails = (userDetails: any) => (
  dispatch: Dispatch<UserAction>,
) => {
  dispatch({ type: UserActionTypes.LOADING_USER });
  axios
    .post(`${api}/user`, userDetails)
    .then(() => {
      dispatch<any>(getUserData());
    })
    .catch((err) => console.error(err));
};
