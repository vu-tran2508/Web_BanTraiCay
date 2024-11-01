// reducers.js
import {
    FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORY_REQUEST, ADD_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_FAILURE, UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_SUCCESS,
} from "../../constants/actions-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
  const initialState = {
    categories: [],
    loading: false,
    error: ''
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      // FETCH CATEGORIES
      case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload,
          error: ''
        };
      case FETCH_CATEGORIES_FAILURE:
        toast.error('Lỗi khi tải danh mục!',{ position: toast.POSITION.TOP_RIGHT }); 
        return {
          ...state,
          loading: false,
          categories: [],
          error: action.payload
        };
  
      // ADD CATEGORY
      case ADD_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ADD_CATEGORY_SUCCESS:
        toast.success('Thêm Category thành công', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          categories: [...state.categories, action.payload],
          error: ''
        };
      case ADD_CATEGORY_FAILURE:
        toast.error('Đã xảy ra lỗi khi thêm danh mục.', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      // UPDATE CATEGORY
      case UPDATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true
        };
      case UPDATE_CATEGORY_SUCCESS:
        const updatedCategories = state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        );
        return {
          ...state,
          loading: false,
          categories: updatedCategories,
          error: ''
        };
      case UPDATE_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      // DELETE CATEGORY
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_CATEGORY_SUCCESS:
        const filteredCategories = state.categories.filter(
          category => category.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          categories: filteredCategories,
          error: ''
        };
      case DELETE_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  