import axios from 'axios';

import axiosUser from "./axiosUser";

export const fetchCityData = () => {
  return axios.get('https://provinces.open-api.vn/api/?depth=3')
    .then(response => {
      return response;
      
    })
    .catch(error => {
      console.error('Error fetching city data:', error);
    });
};

export const addAddress = async (customerId, addressData) => {
  try {
    console.log("IDI :  ",customerId);
    const response = await axiosUser.post('/profile/address', addressData, {
      params: {
        customerId: customerId,
      },
    });
    if (response.status === 201) {
      return response.data; // Trả về dữ liệu từ server nếu cần
    } else {
      throw new Error('Error adding address');
    }
  } catch (error) {
    throw error.response?.data || 'Unexpected error'; // Ném lỗi nếu có lỗi
  }
};

export const getAddressCustomer = async (customerId) => {
  try {
    const response = await axiosUser.get(`/profile/address/${customerId}`);

    if (response.status === 200) {
      return response.data || []; // Trả về danh sách địa chỉ hoặc mảng rỗng nếu không có địa chỉ
    } else {
      throw new Error('Error fetching addresses');
    }
  } catch (error) {
    throw error.response?.data || 'Unexpected error'; // Ném lỗi nếu có lỗi
  }
};
