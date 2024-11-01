
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,INCREASE_QUANTITY,DECREASE_QUANTITY
} from "../constants/actions-types";

  export const addToCart = (product) => {
    return (dispatch, getState) => {
      const existingItem = getState().cart.items.find(item => item.productId === product.productId);
      if (existingItem) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        dispatch(updateCartItemQuantity(product.productId, existingItem.quantity + 1));
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
        dispatch({
          type: ADD_TO_CART,
          payload: {
            productId: product.productId,
            name: product.name,
            quantity: 1,
            salePrice: product.salePrice,
            discount: product.discount,
            image: product.image,
            discountType: product.discountType,
            unit: product.unit,
            supplierName: product.supplier.nation,
            categoryName: product.category.name,
          },
        });
      }
  
      // Lưu trạng thái giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(getState().cart));
    };
  };
  
  export const removeFromCart = (productId) => {
    return (dispatch, getState) => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });
  
      const updatedCart = getState().cart.items;
  
      // Kiểm tra nếu giỏ hàng trống rỗng, xóa giỏ hàng khỏi localStorage
      if (updatedCart.length === 0) {
        localStorage.removeItem('cart');
      } else {
        // Nếu giỏ hàng không rỗng, cập nhật localStorage với giỏ hàng mới
        localStorage.setItem('cart', JSON.stringify({ items: updatedCart }));
      }
    };
  };
  
  
 // Trong cartActions.js
 export const increaseQuantity = (productId) => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.items.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + 1;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    dispatch({
      type: INCREASE_QUANTITY,
      payload: {
        productId: productId,
        items: cartItems,
      },
    });

    // Lưu trạng thái giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(getState().cart));
  };
};

export const decreaseQuantity = (productId) => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.items.map(item => {
      if (item.productId === productId) {
        const newQuantity = (item.quantity - 1);

        if (newQuantity < 1) {
          // Nếu số lượng mới là 1, xóa sản phẩm khỏi giỏ hàng
          dispatch(removeFromCart(productId));
          return null; // Loại bỏ sản phẩm khỏi danh sách
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    }).filter(Boolean); // Lọc bỏ các item có giá trị null (đã xóa khỏi giỏ hàng)

    dispatch({
      type: DECREASE_QUANTITY,
      payload: {
        productId: productId,
        items: cartItems,
      },
    });

    // Lưu trạng thái giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(getState().cart));
  };
};

  
  
  
  export const updateCartItemQuantity = (productId, quantity) => {
    return (dispatch, getState) => {
      dispatch({
        type: UPDATE_CART_ITEM_QUANTITY,
        payload: {
          productId,
          quantity,
        },
      });
      localStorage.setItem('cart', JSON.stringify(getState().cart));
    };
  };
  
  export const clearCart = () => {
    return (dispatch) => {
      dispatch({
        type: CLEAR_CART,
        
      });
      localStorage.removeItem('cart');
    };
  };

  // Add the isInCart function
export const isInCart = (cartItems, productId) => {
  return cartItems.some(item => item.productId === productId);
};

export const formatPrice = (salePrice) => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(salePrice);

  return formattedPrice;
};