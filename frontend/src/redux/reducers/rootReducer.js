
import { combineReducers } from 'redux';


import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';



const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
    customer:authReducer,
    order:orderReducer,
});

export default rootReducer;