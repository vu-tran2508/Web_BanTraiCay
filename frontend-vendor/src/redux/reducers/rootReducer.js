
import { combineReducers } from 'redux';


import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';
import customerReducer from './customerReducer';
import supplierReducer from './supplierReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    category: categoryReducer,
    tags: tagReducer,
    customers:customerReducer,
    supplier:supplierReducer,
    products:productReducer,
    user:authReducer,

});

export default rootReducer;