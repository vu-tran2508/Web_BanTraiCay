import axiosAdmin from './axiosAdmin';

const CustomerService = {
  getAll() {
    const url = '/customers/list';
    return axiosAdmin.get(url);
  },

  get(customerId) {
    const url = `/customers/edit/${customerId}`;
    return axiosAdmin.get(url);
  },

  add(data) {
    const url = 'customers/save-customer';
    const headers = {
      'Content-Type': 'application/json',
    };
    return axiosAdmin.post(url, data, { headers });
  },

  update(data) {
    console.log("customerId",data.customerId);
    const url = `/customers/${data.customerId}`;
    const headers = {
        'Content-Type': 'application/json',
      };
    return axiosAdmin.put(url, data,{ headers });
  },

  remove(customerId) {
    const url = `/customers/${customerId}`;
    return axiosAdmin.delete(url);
  },
};

export default CustomerService;
