import {
    LOGOUT, FETCH_REGISTER,
    FETCH_REGISTER_FAILURE,
    FETCH_REGISTER_SUCCESS,
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_ROLE_FAILURE
} from "../constants/actions-types";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    customer: null,
    isLoggedIn: false,
    loading: false,
    error: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REGISTER:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_REGISTER_SUCCESS:
            toast.success('Đăng ký thành công!', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: ''
            };
        case FETCH_REGISTER_FAILURE:
            toast.error('Đăng ký thất bại. Vui lòng thử lại!', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: action.payload
            };
        case FETCH_LOGIN:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_LOGIN_SUCCESS:
            toast.success('Đăng nhập thành công!', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                customer: action.payload,
                isLoggedIn: true,
                loading: false,
                error: ''
            };
        case FETCH_LOGIN_ROLE_FAILURE:
            toast.error('Bạn không có quyền truy cập. Vui lòng đăng nhập với tài khoản có quyền hợp lệ.!', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                customer: null,
                isLoggedIn: false,
                loading: false,
                error: ""
            };
        case FETCH_LOGIN_FAILURE:
            toast.error('Đăng nhập thất bại. Vui lòng thử lại!', { position: toast.POSITION.TOP_RIGHT });
            return {
                ...state,
                customer: null,
                isLoggedIn: false,
                loading: false,
                error: action.payload
            };


        case LOGOUT:
            toast.success('Đã đăng xuất!', { position: toast.POSITION.TOP_RIGHT });
            return {

                ...state,
                customer: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
};

export default authReducer;