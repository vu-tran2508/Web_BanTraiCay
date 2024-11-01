import {
    FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_DETAIL_FAILURE, FETCH_PRODUCT_DETAIL_SUCCESS, FETCH_PRODUCT_DETAIL_REQUEST
} from "../constants/actions-types";

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


export const fetchProductDetail = async (productId) => {
  try {
    const response = await ProductService.get(productId);

    if (response === null) {
      throw new Error('Failed to fetch product details');
    }
    const productDetail = response.data;
    return productDetail;
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    throw error;
  }
};
