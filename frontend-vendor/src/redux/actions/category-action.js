import {
    FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORY_REQUEST, ADD_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_FAILURE, UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_SUCCESS,
} from "../../constants/actions-types";
import CategoryService from "../../services/CategoryService";

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORIES_REQUEST });

        try {
            const response = await CategoryService.getAll();
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_CATEGORIES_FAILURE,
                payload: error.message
            });
        }
    };
};

export const addCategory = (categoryDto) => {
    return async (dispatch) => {
      dispatch({ type: ADD_CATEGORY_REQUEST });
  
      try {
        const response = await CategoryService.add(categoryDto);
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: ADD_CATEGORY_FAILURE,
          payload: error.message
        });
      }
    };
  };
  export const updateCategory = (categoryDto) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
  
      try {
        const response = await CategoryService.update(categoryDto);
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: UPDATE_CATEGORY_FAILURE,
          payload: error.message
        });
      }
    };
  };
  export const deleteCategory = (id) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_CATEGORY_REQUEST });
  
      try {
        const response = await CategoryService.remove(id);
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: DELETE_CATEGORY_FAILURE,
          payload: error.message
        });
      }
    };
  };
  