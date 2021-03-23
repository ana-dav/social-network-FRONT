import { Dispatch } from 'redux';
import axios from 'axios';
import api from '../../constants';
import { DataActionTypes, UIActionTypes } from '../types/actions';
import { DataAction, UiDataAction } from '../types/dataTypes';
import { UiAction } from '../types/uiTypes';

export const getPosts = () => (dispatch: Dispatch<DataAction>) => {
  dispatch({ type: UIActionTypes.LOADING_DATA });
  axios
    .get(`${api}/screams`)
    .then((res) => {
      dispatch({
        type: DataActionTypes.SET_POSTS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: DataActionTypes.SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = (postId: string) => (
  dispatch: Dispatch<UiDataAction>,
) => {
  dispatch({ type: UIActionTypes.LOADING_UI });
  axios
    .get(`${api}/scream/${postId}`)
    .then((res) => {
      dispatch({
        type: DataActionTypes.SET_POST,
        payload: res.data,
      });
      dispatch({ type: UIActionTypes.STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const likePost = (postId: string) => (
  dispatch: Dispatch<DataAction>,
) => {
  axios
    .get(`${api}/scream/${postId}/like`)
    .then((res) => {
      dispatch({
        type: DataActionTypes.LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unlikePost = (postId: string) => (
  dispatch: Dispatch<DataAction>,
) => {
  axios
    .get(`${api}/scream/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: DataActionTypes.UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch: Dispatch<UiAction>) => {
  dispatch({ type: UIActionTypes.CLEAR_ERRORS });
};

export const submitComment = (postId: string, commentData: string) => (
  dispatch: Dispatch<UiDataAction>,
) => {
  axios
    .post(`${api}/scream/${postId}/comment`, { body: commentData })
    .then((res) => {
      dispatch({
        type: DataActionTypes.SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch<any>(clearErrors());
    })
    .catch((err) => dispatch({
      type: UIActionTypes.SET_ERRORS,
      payload: err.response.data,
    }));
};

export const deletePost = (postId: string) => (
  dispatch: Dispatch<DataAction>,
) => {
  axios
    .delete(`${api}/scream/${postId}`)
    .then(() => {
      dispatch({ type: DataActionTypes.DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const addPost = (newPost: string) => (
  dispatch: Dispatch<UiDataAction>,
) => {
  dispatch({ type: UIActionTypes.LOADING_UI });
  axios
    .post(`${api}/scream`, { body: newPost })
    .then((res) => {
      dispatch({
        type: DataActionTypes.ADD_POST,
        payload: res.data,
      });
      dispatch<any>(clearErrors());
    })
    .catch((err) => dispatch({
      type: UIActionTypes.SET_ERRORS,
      payload: err.response.data,
    }));
};

export const getUserData = (userHandle: string) => (
  dispatch: Dispatch<DataAction>,
) => {
  dispatch({ type: UIActionTypes.LOADING_DATA });
  axios
    .get(`${api}/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: DataActionTypes.SET_POSTS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: DataActionTypes.SET_POSTS,
        payload: [],
      });
    });
};
