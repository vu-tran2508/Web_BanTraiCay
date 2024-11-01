import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/product-comments'; 

const api = axios.create({
  baseURL: BASE_URL,
});

const ProductCommentService = {
  getAllProductComments: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching product comments:', error);
      throw error; // Chuyển lỗi để xử lý ở component gọi API
    }
  },

  getProductCommentsByStatus: async (status) => {
    try {
      const response = await api.get(`/by-status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product comments with status ${status}:`, error);
      throw error;
    }
  },

  getProductCommentsByProduct: async (productId) => {
    try {
      const response = await api.get(`/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product comments with productId ${productId}:`, error);
      throw error;
    }
  },

  addProductComment: async (commentRequest) => {
    try {
      const response = await api.post('', commentRequest);
      return response.data;
    } catch (error) {
      console.error(`Error adding product comment:`, error);
      throw error;
    }
  },

  updateProductComment: async (commentDto) => {
    try {
      const response = await api.put(`/${commentDto.commentId}`, commentDto);
      return response.data;
    } catch (error) {
      console.error(`Error updating product comment:`, error);
      throw error;
    }
  },

  deleteProductComment: async (commentId) => {
    try {
      const response = await api.delete(`/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product comment with commentId ${commentId}:`, error);
      throw error;
    }
  },

};

export default ProductCommentService;
