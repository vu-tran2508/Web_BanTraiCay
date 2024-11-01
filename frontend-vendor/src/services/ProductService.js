import axiosAdmin from './axiosAdmin';

const ProductService = {
  getAll() {
    const url = '/products';
    return axiosAdmin.get(url);
  },
  

  get(id) {
    const url = `/products/${id}`;
    return axiosAdmin.get(url);
  },

  add(data) {
    const url = '/products';
    return axiosAdmin.post(url, data);
  },

  addImage(id, imageFile) {
    console.log("RES Image", imageFile);
    const formData = new FormData();
    formData.append('productId', id);
    for (let i = 0; i < imageFile.length; i++) {
        formData.append('imageFile', imageFile[i]);
    }

    const url = '/products/upload-image';
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    console.log("formData---------",formData);
    return axiosAdmin.post(url, formData, { headers });
},


  update(data) {
    const url = `/products/update/${data.productId}`;
    return axiosAdmin.put(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default ProductService;
