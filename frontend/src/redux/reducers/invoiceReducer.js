// cartActions.js
import axios from 'axios';
import {
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
} from "../constants/actions-types";
const initialState = {
    creatingInvoice: false,
    invoiceData: null,
    error: null,
  };
  
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_INVOICE_REQUEST:
        return {
          ...state,
          creatingInvoice: true,
          invoiceData: null,
          error: null,
        };
      case CREATE_INVOICE_SUCCESS:
        return {
          ...state,
          creatingInvoice: false,
          invoiceData: action.payload,
          error: null,
        };
      case CREATE_INVOICE_FAILURE:
        return {
          ...state,
          creatingInvoice: false,
          invoiceData: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;