import axiosUser from "./axiosUser";

const ProductService = {
    getAll() {
      const url = '/home';
      return axiosUser.get(url);
    },
  
    get(id) {
      const url = `/home/${id}`;
      return axiosUser.get(url);
    },
    finby: (name) => {
      const url = `/home/searchByName?name=${name}`;
      return axiosUser.get(url);
    },
    async filterProducts(params) {
      try {
        const response = await axiosUser.get('/home/products/filter', { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
  };
  
  export default ProductService;
  