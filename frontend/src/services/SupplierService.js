import axiosUser from "./axiosUser";

const SupplierService = {
    getAll() {
      const url = '/home/suppliers';
      return axiosUser.get(url);
    },
  
    get(id) {
      const url = `/home/suppliers/${id}`;
      return axiosUser.get(url);
    },  
  };
  
  export default SupplierService;
  