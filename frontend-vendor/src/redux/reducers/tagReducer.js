// reducers.js
import {
    FETCH_TAG_REQUEST, FETCH_TAG_FAILURE, FETCH_TAG_SUCCESS,
    ADD_TAG_REQUEST, ADD_TAG_FAILURE, ADD_TAG_SUCCESS,
    UPDATE_TAG_REQUEST, UPDATE_TAG_FAILURE, UPDATE_TAG_SUCCESS,
    DELETE_TAG_REQUEST, DELETE_TAG_FAILURE, DELETE_TAG_SUCCESS,
} from "../../constants/actions-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  const initialState = {
    tags:[],
    loading: false,
    error: ''
  };
  
  const tagReducer = (state = initialState, action) => {
    switch (action.type) {
      // FETCH TAG
      case FETCH_TAG_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_TAG_SUCCESS:
        return {
          ...state,
          loading: false,
          tags: action.payload,
          error: '',
        };
        
        
      case FETCH_TAG_FAILURE:
        toast.error('Lỗi khi tải Tag!',{ position: toast.POSITION.TOP_RIGHT }); 
        return {
          ...state,
          loading: false,
          tags: [],
          error: action.payload
        };
  
      // ADD TAG
      case ADD_TAG_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ADD_TAG_SUCCESS:
        toast.success('Xóa Tag thành công', { 
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500 // Thời gian tự động ẩn toast, ở đây là 2000 milliseconds (2 giây)
      });
    
        return {
          ...state,
          loading: false,
          tags: [...state.tags, action.payload],
          error: ''
        };
      case ADD_TAG_FAILURE:
        toast.error('Đã xảy ra lỗi khi thêm Tag.', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      // UPDATE TAG
      case UPDATE_TAG_REQUEST:
        return {
          ...state,
          loading: true
        };
      case UPDATE_TAG_SUCCESS:
        const updatedTag = action.payload;
      const updatedTags = state.tags.map(tag =>
        tag.tag_id === updatedTag.tag_id ? updatedTag : tag);
        return {
          ...state,
          loading: false,
          tags: updatedTags,
          error: ''
        };
      case UPDATE_TAG_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      // DELETE TAG
      case DELETE_TAG_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_TAG_SUCCESS:
        toast.success('Xóa Tag thành công', { position: toast.POSITION.TOP_RIGHT });
        const filteredTags = state.tags.filter(
          tag => tag.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          tags: filteredTags,
          error: ''
        };
      case DELETE_TAG_FAILURE:
        toast.error('Xóa Tag thất bại !!', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default tagReducer;
  