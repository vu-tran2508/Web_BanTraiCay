import axiosUser from "./axiosUser";

const CategoryService = {
    getAll() {
      const url = '/home/categories';
      return axiosUser.get(url);
    },
  
    get(id) {
      const url = `/home/categories/${id}`;
      return axiosUser.get(url);
    },
  
  };
  
  export default CategoryService;
  