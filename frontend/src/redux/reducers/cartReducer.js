
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY
} from "../constants/actions-types";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const storedCart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  items: storedCart ? storedCart.items : [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
        toast.success('Thêm sản phẩm vào giỏ thành công ', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_CART_ITEM_QUANTITY:
        toast.success('Cấp nhất Số Lương thành công ', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      case INCREASE_QUANTITY:
        return {
            ...state,
            items: action.payload.items,
        };
  
      case DECREASE_QUANTITY:
        return {
            ...state,
            items: action.payload.items,
        };
      case REMOVE_FROM_CART: 
        toast.success('Xóa sản phẩm thành công ', { position: toast.POSITION.TOP_RIGHT });
        const updatedItems = state.items.filter(item => item.productId !== action.payload);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        return {
          ...state,
          items: updatedItems,
        };
        
    case CLEAR_CART:
        toast.success('Xóa tất cả sản phẩm trong giỏ thành công ', { position: toast.POSITION.TOP_RIGHT });
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;