import axiosAdmin from "./axiosAdmin";
import { toast } from 'react-toastify';

const SupplierService = {

  // Lấy danh sách tất cả bài đăng
  getAllSuppliers: async () => {

    try {
      const response = await axiosAdmin.get(`/suppliers`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài đăng:', error);
      throw error; // Re-throw lỗi để cho component gọi API xử lý
    }
  },

  // Lấy chi tiết một bài đăng theo ID
  getSupplierById: async (id) => {
    try {
      const response = await axiosAdmin.get(`/suppliers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy bài đăng có ID ${id}:`, error);
      throw error;
    }
  },

  // Tạo một bài đăng mới
  createSupplier: async (postData) => {
    try {
      const response = await axiosAdmin.post(`/suppliers/create-supplier`, postData);
      toast.success('Thêm thành công', { position: toast.POSITION.TOP_RIGHT });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo bài đăng mới:', error);
      throw error;
    }
  },


  addImageCustomer: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('imageFile', imageFile.originFileObj);      

      const response = await axiosAdmin.post('/suppliers/upload-image', formData, {
        
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
  updateSupplier: async (id, postData) => {
    try {
      const response = await axiosAdmin.put(`/suppliers/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật bài đăng có ID ${id}:`, error);
      throw error;
    }
  },

  // Xóa một bài đăng theo ID
  deleteSupplier: async (id) => {
    try {
      const response = await axiosAdmin.delete(`/suppliers/${id}`);
      toast.success('Đã xoá thành công', { position: toast.POSITION.TOP_RIGHT });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa bài đăng có ID ${id}:`, error);
      throw error;
    }
  },






};

export default SupplierService;
