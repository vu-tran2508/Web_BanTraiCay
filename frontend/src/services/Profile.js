import axiosUser from "./axiosUser";
import { toast } from 'react-toastify';

export const updateProfile = async (customerId, customerRequest) => {
    try {
      console.log("ID : ", customerId);
      const response = await axiosUser.put(`/profile/customer/${customerId}`, customerRequest);
        return response.data; // Return data from the server if needed
     
    } catch (error) {
      throw error.response?.data || 'Unexpected error'; // Throw an error if there's an issue
    }
  };
    export const addImageCustomer = async (customerId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('customerId', customerId);
      formData.append('imageFile', imageFile);     
      console.log("ẢNH--",imageFile) 

      const response = await axiosUser.post('/profile/upload-image', formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });
      return response.data;

    } catch (error) {
      console.error('Lỗi khi Luu ảnh:', error);
      throw error;

    }

  }
  export const changePassword = async (email, newPassword, currentPassword) => {
    try {
      const response = await axiosUser.put(`/ChangePassword/${email}`, null, {
        params: {
          newPassword: newPassword,
          currentPassword: currentPassword,
        },
      });
  
      if (response.status === 200) {
     
        console.log('Success:', response.data);
        toast.success('Đổi mất khẩu thành công !!:',{ position: toast.POSITION.TOP_RIGHT });
        return response.data;
      } else if (response.status === 403) {

        throw new Error('Current password is incorrect');
        toast.error('Mật khẩu hiện tại không đúng !!',{ position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error('Mật khẩu hiện tại không đúng !!:',{ position: toast.POSITION.TOP_RIGHT });
        throw new Error('Lỗi đổi mật khẩu');
      }
    } catch (error) {
      // Show error notification
      console.error('Error:', error.message);
      throw error;
    }
  };
  
  
  