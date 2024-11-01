import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const createOrder = async (invoiceRequest, cartItems) => {
  try {
    console.log('Making API request invoiceRequest...', invoiceRequest);
    console.log('Making API request cartItems...', cartItems);

  const response = await axios.post(
  `${BASE_URL}/order/cart/createInvoice`,
  { 
    invoiceRequest: invoiceRequest,
    cartItemsRequest: cartItems,
  },
  { headers: { 'Content-Type': 'application/json' } }
);

    console.log('API response:', response);
    return response;
  } catch (error) {
    console.error('API error:', error);
    throw error.response?.data || 'Unexpected error';
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/getOrder/${orderId}`);
    console.log('API response:', response);
    return response; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('API error:', error);
    throw error.response?.data || 'Unexpected error';
  }
};

export const filterOrdersByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/filterByCustomer/${customerId}`);
    console.log('API response:', response);
    return response; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('API error:', error);
    throw error.response?.data || 'Unexpected error';
  }
};

export const cancelOrder= async (orderId, reason) => {
  console.log("THONG TIN ",orderId,reason);
  try {
    const response = await axios.put(`http://localhost:8080/api/admin/orders/cancel/${orderId}?reason=${reason}`);
    console.log("DỮ LIỆU TRẢ VỀ Hủy ", response);
    return response;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error; // Ném lỗi để component có thể xử lý khi cần
  }
};
export const confirmOrder= async (orderId) => {
  console.log("THONG TIN ",orderId);
  try {
    const response = await axios.get(`${BASE_URL}/order/complete/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error confirmOrder order:', error);
    throw error; // Ném lỗi để component có thể xử lý khi cần
  }
};



