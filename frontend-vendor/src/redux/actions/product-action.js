import {
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS,
    ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAILURE, ADD_PRODUCT_SUCCESS,
    UPDATE_IMAGE_PRODUCT_REQUEST,UPDATE_IMAGE_PRODUCT_SUCCESS,UPDATE_IMAGE_PRODUCT_FAILURE,
    FETCH_PRODUCT_BY_ID_REQUEST,FETCH_PRODUCT_BY_ID_SUCCESS,FETCH_PRODUCT_BY_ID_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS,
} from "../../constants/actions-types";

import ProductService from "../../services/ProductService";

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        try {
            const response = await ProductService.getAll();
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_PRODUCTS_FAILURE,
                payload: error.message
            });
        }
    };
};

export const fetchByProduct =(productId)=>{
       return async(dispatch)=>{
        dispatch({type: FETCH_PRODUCT_BY_ID_REQUEST});
        try {
          const response = await ProductService.get(productId);
          dispatch({
            type:FETCH_PRODUCT_BY_ID_SUCCESS,
            payload:response.data

          });
        } catch (error) {
          dispatch({
            type:FETCH_PRODUCT_BY_ID_FAILURE,
            payload: error.message
          });

          
        }
       }
}
export const addProduct = (data) => {
    return async (dispatch) => {
      dispatch({ type: ADD_PRODUCT_REQUEST });
      try {
        const response = await ProductService.add(data);
        console.log("PRODUCT: ",response.data);
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch({
          type: ADD_PRODUCT_FAILURE,
          payload: error.message,
        });
      }
    };
};
  
  export const updateProduct =(data) =>{
    return async(dispatch) =>{
      dispatch ({ type:UPDATE_PRODUCT_REQUEST});

      try {
        const response = await ProductService.update(data);
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: response.data
        })
        return response.data;
      } catch (error) {
        dispatch({
          type:UPDATE_PRODUCT_FAILURE,
          payload:error.message,
        });
        
      }
        
    }
  }
  export const deleteProduct = (id) =>{
    return async(dispatch) => {
      dispatch({type:DELETE_PRODUCT_REQUEST});
       try {
        const response = await ProductService.remove(id);
        console.log("DELETE",response)
        dispatch({
          type:DELETE_PRODUCT_SUCCESS,
          payload:response.data
        })
       } catch (error) {
         dispatch({
          type:DELETE_PRODUCT_FAILURE,
          payload:error.message
         })
        
       }
    }

  }


  export const addImageProduct = (productId, images) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_IMAGE_PRODUCT_REQUEST });

        try {
            // Kiểm tra xem có hình ảnh nào được chọn không
            console.log('Product ID:', productId);
            console.log('Images:', images);

            // Kiểm tra xem có hình ảnh nào được chọn không
            if (images && images.length > 0) {
                const response = await ProductService.addImage(productId, images);
                dispatch({
                    type: UPDATE_IMAGE_PRODUCT_SUCCESS,
                    payload: response.data,
                });
            } else {
                // Không có hình ảnh được chọn,
                console.log('Không có hình ảnh được chọn');
            }
        } catch (error) {
          console.error('PRODUCT IMG ', error.message);
            dispatch({
                type: UPDATE_IMAGE_PRODUCT_FAILURE,
                payload: error.message,
            });
        }
    };
};

  
