// cartActions.js
import axios from 'axios';
import {
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
} from "../constants/actions-types";

import { toast } from 'react-toastify';

export const createInvoiceRequest = () => ({
  type: CREATE_INVOICE_REQUEST,
});

export const createInvoiceSuccess = (data) => ({
  type: CREATE_INVOICE_SUCCESS,
  payload: data,
});

export const createInvoiceFailure = (error) => ({
  type: CREATE_INVOICE_FAILURE,
  payload: error,
});

export const createInvoice = (invoiceRequest, cartItemsRequest) => {
  return async (dispatch) => {
    dispatch(createInvoiceRequest());

    try {
      const response = await axios.post('http://localhost:8080/api/cart/createInvoice', {
        invoiceRequest,
        cartItemsRequest,
      });

      dispatch(createInvoiceSuccess(response.data));
    } catch (error) {
        toast.error(`Lỗi: ${error.message}`, { position: toast.POSITION.TOP_RIGHT });
        dispatch(createInvoiceFailure(error.message));
    }
  };
};
