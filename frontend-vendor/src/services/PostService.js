import axiosAdmin from "./axiosAdmin";

const PostService = {

  // Lấy danh sách tất cả bài đăng
  getAllPosts: async () => {

    try {
      const response = await axiosAdmin.get(`/posts`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài đăng:', error);
      throw error; // Re-throw lỗi để cho component gọi API xử lý
    }
  },

  // Lấy chi tiết một bài đăng theo ID
  getPostById: async (postId) => {
    try {
      const response = await axiosAdmin.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy bài đăng có ID ${postId}:`, error);
      throw error;
    }
  },

  // Tạo một bài đăng mới
  createPost: async (postData) => {
    try {
      const response = await axiosAdmin.post(`/posts`, postData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo bài đăng mới:', error);
      throw error;
    }
  },
  addImageCustomer: async (postId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('postId', postId);
      formData.append('imageFile', imageFile);

      const response = await axiosAdmin.post('/posts/upload-image', formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });
      return response.data;

    } catch (error) {
      console.error('Lỗi khi Luu ảnh:', error);
      throw error;

    }

  },

  // Cập nhật một bài đăng theo ID
  updatePost: async (postId, postData) => {
    try {
      const response = await axiosAdmin.put(`/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật bài đăng có ID ${postId}:`, error);
      throw error;
    }
  },

  // Xóa một bài đăng theo ID
  deletePost: async (postId) => {
    try {
      const response = await axiosAdmin.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa bài đăng có ID ${postId}:`, error);
      throw error;
    }
  },






};

export default PostService;
