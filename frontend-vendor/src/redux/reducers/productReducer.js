
import {
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS,
    ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAILURE, ADD_PRODUCT_SUCCESS,
    UPDATE_IMAGE_PRODUCT_REQUEST,UPDATE_IMAGE_PRODUCT_SUCCESS,UPDATE_IMAGE_PRODUCT_FAILURE,
    FETCH_PRODUCT_BY_ID_REQUEST,FETCH_PRODUCT_BY_ID_SUCCESS,FETCH_PRODUCT_BY_ID_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS,
} from "../../constants/actions-types";

  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  
  const initialState = {
    products: [],
    product: null, 
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
          products: action.payload,
          error: ''
        };
      case FETCH_PRODUCTS_FAILURE:
        toast.error('Lỗi khi tải thông tin Sản phẩm !', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          products: [],
          error: action.payload
        };
      // ADD CATEGORY
      case ADD_PRODUCT_REQUEST:
      case UPDATE_IMAGE_PRODUCT_REQUEST:
        return {
          ...state,
          error: null,
        };
        case ADD_PRODUCT_SUCCESS:
          toast.success('Thêm Sản phẩm thành công', { position: toast.POSITION.TOP_RIGHT });
          return {
              ...state,
              loading: false,
              products: [...state.products, action.payload],
              productId: action.payload, // Set the productId
              error: ''
          };
          case UPDATE_IMAGE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: ''
            };
      case ADD_PRODUCT_FAILURE:
        toast.error('Đã xảy ra lỗi khi Lưu SP', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case UPDATE_IMAGE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        // UPDATE_PRODUCT
        case UPDATE_PRODUCT_REQUEST:
          return{
            ... state,
            loading:true,
          }
        case UPDATE_PRODUCT_SUCCESS:
          toast.success('Cập nhật thông tin thành công', { position: toast.POSITION.TOP_RIGHT });
           return {
            ...state,
            loading: false,
            products: [...state.products, action.payload],
            error:'',
           }
        case UPDATE_PRODUCT_FAILURE:
          toast.error('Cập nhật thông tin thất bại', { position: toast.POSITION.TOP_RIGHT });
          return {
            ...state,
            loading:false,
            products:[],
            error:action.payload,
          }
          //  DELETE PRODUCT 
        case DELETE_PRODUCT_REQUEST:
          return {
            ...state,
            loading: true
          };
        case DELETE_PRODUCT_SUCCESS:
          toast.success('Xóa Sản phẩm  thành công', { position: toast.POSITION.TOP_RIGHT });
          const filteredCustomers = state.products.filter(
            product => product.id !== action.payload
          );
          return {
            ...state,
            loading: false,
            products: filteredCustomers,
            error: ''
          };
        case DELETE_PRODUCT_FAILURE:
          console.log("XÓA LỖI ",action.payload)
          toast.error('Xóa Sản phẩm  thất bại !!', { position: toast.POSITION.TOP_RIGHT });
          return {
            ...state,
            loading: false,
            error: action.payload
          };
        // FETCH PRODUCT_BY_ID
        case FETCH_PRODUCT_BY_ID_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case FETCH_PRODUCT_BY_ID_SUCCESS:
          return {
            ...state,
             loading: false,
             product: action.payload, // hoặc là trích xuất thông tin Sản phẩm  cụ thể
            error: '',  // Reset error về rỗng khi thành công
          };
        case FETCH_PRODUCT_BY_ID_FAILURE:
          console.log("FAILURE PRODUCT : ", action.payload);
          return {
            ...state,
            loading: false,
            product: null,  // Reset products về rỗng khi thất bại
            error: action.payload,
          };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  