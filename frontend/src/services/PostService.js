import axiosAdmin from './axiosAdmin';

const PostService = {
  getAll() {
    const url = '/posts';
    return axiosAdmin.get(url);
  },

  get(id) {
    const url = `/posts/${id}`;
    return axiosAdmin.get(url);
  },

};

export default PostService;
