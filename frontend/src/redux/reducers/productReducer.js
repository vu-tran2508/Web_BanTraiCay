import {
    FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_DETAIL_FAILURE, FETCH_PRODUCT_DETAIL_SUCCESS, FETCH_PRODUCT_DETAIL_REQUEST
} from "../constants/actions-types";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  Listproduct: [],
  getProduct: null, 
  loading: false,
  error: '',
  productId: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH PRODUCTS
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      console.log("LIST SẢN PHẨM ",action.payload)
      return {
        ...state,
        loading: false,
        Listproduct: action.payload,
        error: ''
      };
    case FETCH_PRODUCTS_FAILURE:
      toast.error('Lỗi khi tải thông tin Sản phẩm !', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        loading: false,
        Listproduct: [],
        error: action.payload
      };
      // FETCH PRODUCT_BY_ID
      case FETCH_PRODUCT_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PRODUCT_DETAIL_SUCCESS:
        
        // console.log("DATA GET PRODUCT : ", action.payload);
        return {
          ...state,
          loading: false,
           getProduct: action.payload, // hoặc là trích xuất thông tin Sản phẩm  cụ thể
          error: '',  // Reset error về rỗng khi thành công
        };
      case FETCH_PRODUCT_DETAIL_FAILURE:
        console.log("FAILURE PRODUCT : ", action.payload);
        return {
          ...state,
          loading: false,
          getProduct: null,  // Reset Listproduct về rỗng khi thất bại
          error: action.payload,
        };

    default:
      return state;
  }
};

export default productReducer;
