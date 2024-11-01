import axiosAdmin from './axiosAdmin';

const OrderService = {
  getAll() {
    const url = '/orders';
    return axiosAdmin.get(url);
  },
  getbyStatus() {
    const url = '/orders/status';
    return axiosAdmin.get(url);
  },

  getOrderDetails: async (orderId) => {
    try {
      const response = await axiosAdmin.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error; // Ném lỗi để component có thể xử lý khi cần
    }
  },
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const response = await axiosAdmin.post(`/orders/update-status/${orderId}?newStatus=${newStatus}`);
      console.log("DỮ LIỆU TRẢ VỀ ", response.data);
      return response.data; // hoặc có thể trả về thông tin khác từ response
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  cancelOrder: async (orderId, reason) => {
    console.log("THONG TIN ",orderId,reason);
    try {
      const response = await axiosAdmin.put(`/orders/cancel/${orderId}?reason=${reason}`);
      console.log("DỮ LIỆU TRẢ VỀ Hủy ", response.data);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error; // Ném lỗi để component có thể xử lý khi cần
    }
  },



  add(data) {
    const url = '/orders';
    return axiosAdmin.post(url, data);
  },




  update(data) {
    const url = `/orders/${data.Id}`;
    return axiosAdmin.put(url, data);
  },

  remove(id) {
    const url = `/orders/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default OrderService;
