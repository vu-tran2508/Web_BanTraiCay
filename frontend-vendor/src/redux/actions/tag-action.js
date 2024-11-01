import {
    FETCH_TAG_REQUEST, FETCH_TAG_FAILURE, FETCH_TAG_SUCCESS,
    ADD_TAG_REQUEST, ADD_TAG_FAILURE, ADD_TAG_SUCCESS,
    UPDATE_TAG_REQUEST, UPDATE_TAG_FAILURE, UPDATE_TAG_SUCCESS,
    DELETE_TAG_REQUEST, DELETE_TAG_FAILURE, DELETE_TAG_SUCCESS,
} from "../../constants/actions-types";


import TagService from "../../services/TagsService";

export const fetchTags = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_TAG_REQUEST });
  
      try {
        const response = await TagService.getAll();
        dispatch({
          type: FETCH_TAG_SUCCESS,
          payload: response.data
        });
        console.log("fetchTags action dispatched with payload:", response.data);
      } catch (error) {
        dispatch({
          type: FETCH_TAG_FAILURE,
          payload: error.message
        });
      }
    };
  };
  

export const addTag = (tagDto) => {
    return async (dispatch) => {
      dispatch({ type: ADD_TAG_REQUEST });
  
      try {
        const response = await TagService.add(tagDto);
        dispatch({
          type: ADD_TAG_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: ADD_TAG_FAILURE,
          payload: error.message
        });
      }
    };
  };
  export const updateTag = (tagDto) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_TAG_REQUEST });
  
      try {
        const response = await TagService.update(tagDto);
        dispatch({
          type: UPDATE_TAG_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: UPDATE_TAG_FAILURE,
          payload: error.message
        });
      }
    };
  };
  export const deleteTag = (id) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_TAG_REQUEST });
  
      try {
        const response = await TagService.remove(id);
        dispatch({
          type: DELETE_TAG_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: DELETE_TAG_FAILURE,
          payload: error.message
        });
      }
    };
  };
  