import {
    FETCH_SUPPLIERS_REQUEST, FETCH_SUPPLIERS_FAILURE, FETCH_SUPPLIERS_SUCCESS,
} from "../../constants/actions-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    getAll: [],
    loading: false,
    error: ''
};
const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        // FETCH TAG
        case FETCH_SUPPLIERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_SUPPLIERS_SUCCESS:
            // console.log("GET SUP :",action.payload);
            return {
                ...state,
                loading: false,
                getAll: action.payload,
                error: '',
            };
        case FETCH_SUPPLIERS_FAILURE:
            toast.error('Lỗi khi tải Nhà cung cấp !', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                loading: false,
                getAll: [],
                error: action.payload
            };
        default:
            return state;
    }
};
export default supplierReducer;