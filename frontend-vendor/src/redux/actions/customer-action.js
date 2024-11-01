import {
    FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_FAILURE, FETCH_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_FAILURE, ADD_CUSTOMER_SUCCESS,
    UPDATE_IMAGE_REQUEST,UPDATE_IMAGE_SUCCESS,UPDATE_IMAGE_FAILURE  ,
    FETCH_CUSTOMER_BY_ID_REQUEST,FETCH_CUSTOMER_BY_ID_SUCCESS,FETCH_CUSTOMER_BY_ID_FAILURE,
    UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_FAILURE, UPDATE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESS,
} from "../../constants/actions-types";
import CustomerService from "../../services/CustomerService";
import axios from 'axios';

export const fetchCustomers = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMERS_REQUEST });

        try {
            const response = await CustomerService.getAll();
            console.log("response",response.data);
            dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_CUSTOMERS_FAILURE,
                payload: error.message
            });
        }
    };
};

export const fetchByCustomer =(custmerId)=>{
       return async(dispatch)=>{
        dispatch({type: FETCH_CUSTOMER_BY_ID_REQUEST});

        try {
          const response = await CustomerService.get(custmerId);
          // console.log('DATA ACTION CUSTOMER : ',response.data)
          dispatch({
            type:FETCH_CUSTOMER_BY_ID_SUCCESS,
            payload:response.data

          });
        } catch (error) {
          dispatch({
            type:FETCH_CUSTOMER_BY_ID_FAILURE,
            payload: error.message
          });

          
        }
       }
}
export const addCustomer = (data) => {
    return async (dispatch) => {
      dispatch({ type: ADD_CUSTOMER_REQUEST });
      try {
        const response = await CustomerService.add(data);
        dispatch({
          type: ADD_CUSTOMER_SUCCESS,
          payload: response.data,
        });
        return response.data;
    // Return the customer ID to be used for image upload
      } catch (error) {
        dispatch({
          type: ADD_CUSTOMER_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
  export const updateCustomer =(data) =>{
    return async(dispatch) =>{
      dispatch ({ type:UPDATE_CUSTOMER_REQUEST});

      try {
        const response = await CustomerService.update(data);
        dispatch({
          type: UPDATE_CUSTOMER_SUCCESS,
          payload: response.data
        })
      } catch (error) {
        dispatch({
          type:UPDATE_CUSTOMER_FAILURE,
          payload:error.message,
        });
        
      }
        
    }
  }
  export const deleteCustomer = (id) =>{
    return async(dispatch) => {
      dispatch({type:DELETE_CUSTOMER_REQUEST});
       try {
        const response = await CustomerService.remove(id);
        console.log("DELETE",response)
        dispatch({
          type:DELETE_CUSTOMER_SUCCESS,
          payload:response.data
        })
       } catch (error) {
         dispatch({
          type:DELETE_CUSTOMER_FAILURE,
          payload:error.message
         })
        
       }
    }

  }


  export const addImageCustomer = (customerId, imageFile) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_IMAGE_REQUEST });
  
      try {
        const formData = new FormData();
        formData.append('customerId', customerId);
        formData.append('imageFile', imageFile);
  
        const response = await axios.post('http://localhost:8080/api/admin/customers/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        dispatch({
          type: UPDATE_IMAGE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_IMAGE_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
