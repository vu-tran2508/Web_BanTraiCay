
import {
    UPDATE_CART_DATA,
    UPDATE_ADDRESS_DATA,
    UPDATE_PAYMENT_DATA,
    UPDATE_ADDRESS,
  } from "../constants/actions-types";

export const updateCartData = (cartData) => ({
    type: UPDATE_CART_DATA,
    payload: cartData,
  });
  
  export const updateInformationData = (informationData) => ({
    type: UPDATE_ADDRESS_DATA,
    payload: informationData,
  });
  
  export const updatePaymentData = (paymentData) => ({
    type: UPDATE_PAYMENT_DATA,
    payload: paymentData,
  });
  export const updateAddressData = (addresstData) => ({
    type: UPDATE_ADDRESS,
    payload: addresstData,
  });