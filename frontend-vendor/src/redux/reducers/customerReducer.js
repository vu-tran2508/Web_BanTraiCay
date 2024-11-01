// reducers.js
import {
  FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_FAILURE, FETCH_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_FAILURE, ADD_CUSTOMER_SUCCESS,
  UPDATE_IMAGE_REQUEST, UPDATE_IMAGE_SUCCESS, UPDATE_IMAGE_FAILURE,
  FETCH_CUSTOMER_BY_ID_REQUEST,FETCH_CUSTOMER_BY_ID_SUCCESS,FETCH_CUSTOMER_BY_ID_FAILURE,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_FAILURE, UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESS,
} from "../../constants/actions-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  customers: [],
  customer: null, // hoặc { /* thông tin khách hàng mặc định */ }
  loading: false,
  error: '',
  customerId: null,
};
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH CUSTOMERS
    case FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: ''
      };
    case FETCH_CUSTOMERS_FAILURE:
      toast.error('Lỗi khi tải thông tin khách hàng!', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        loading: false,
        customers: [],
        error: action.payload
      };
    // ADD CATEGORY
    case ADD_CUSTOMER_REQUEST:
    case UPDATE_IMAGE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ADD_CUSTOMER_SUCCESS:
      toast.success('Thêm khách hàng thành công', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
        customerId: action.payload, // Set the customerId
        error: ''
      };
    case UPDATE_IMAGE_SUCCESS:
     
      return {
        ...state,
        loading: false,
        error: ''
      };
    case ADD_CUSTOMER_FAILURE:
      toast.error('Email đã tồn tại hoặc 1 số lỗi khác.', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case UPDATE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      // UPDATE_CUSTOMER
      case UPDATE_CUSTOMER_REQUEST:
        return{
          ... state,
          loading:true,
        }
      case UPDATE_CUSTOMER_SUCCESS:
        toast.success('Cập nhật thông tin thành công', { position: toast.POSITION.TOP_RIGHT });
         return {
          ...state,
          loading: false,
          customers: [...state.customers, action.payload],
          error:'',
         }
      case UPDATE_CUSTOMER_FAILURE:
        toast.error('Cập nhật thông tin thất bại', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading:false,
          customers:[],
          error:action.payload,
        }
        //  DELETE CUSTOMER 
      case DELETE_CUSTOMER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_CUSTOMER_SUCCESS:
        toast.success('Xóa Khách hàng thành công', { position: toast.POSITION.TOP_RIGHT });
        const filteredCustomers = state.customers.filter(
          customer => customer.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          customers: filteredCustomers,
          error: ''
        };
      case DELETE_CUSTOMER_FAILURE:
        toast.error('Xóa khách hàng thất bại !!', { position: toast.POSITION.TOP_RIGHT });
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      // FETCH CUSTOMER_BY_ID
      case FETCH_CUSTOMER_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CUSTOMER_BY_ID_SUCCESS:
        
        // console.log("DATA GET CUSTOMER : ", action.payload);
        return {
          ...state,
          loading: false,
           customer: action.payload, // hoặc là trích xuất thông tin khách hàng cụ thể
          error: '',  // Reset error về rỗng khi thành công
        };
      case FETCH_CUSTOMER_BY_ID_FAILURE:
        console.log("FAILURE CUSTOMER : ", action.payload);
        return {
          ...state,
          loading: false,
          customer: null,  // Reset customers về rỗng khi thất bại
          error: action.payload,
        };

    default:
      return state;
  }
};

export default customerReducer;
