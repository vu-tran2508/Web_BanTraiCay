// reducers.js

import {
    UPDATE_CART_DATA,
    UPDATE_ADDRESS_DATA,
    UPDATE_PAYMENT_DATA,
    UPDATE_ADDRESS,
  } from "../constants/actions-types"; 


const initialState = {
    addresstData:{},
    cartData: {},
    informationData: {},
    paymentData: {},
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CART_DATA:
        return { ...state, cartData: action.payload };
      case UPDATE_ADDRESS_DATA:
        return { ...state, informationData: action.payload };
      case UPDATE_PAYMENT_DATA:
        return { ...state, paymentData: action.payload };
      case UPDATE_ADDRESS:
        return { ...state, addresstData: action.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  