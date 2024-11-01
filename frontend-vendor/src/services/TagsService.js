import axiosAdmin from './axiosAdmin';

const TagService = {
  getAll() {
    const url = '/tags';
    return axiosAdmin.get(url);
  },

  get(id) {
    const url = `/tags/${id}`;
    return axiosAdmin.get(url);
  },

  add(data) {
    const url = '/tags';
    const headers = {
      'Content-Type': 'application/json',
    };
    return axiosAdmin.post(url, data, { headers });
  },

  update(data) {
    console.log("TAG_ID",data.tag.tag_id);
    const url = `/tags/${data.tag.tag_id}`;
    const headers = {
        'Content-Type': 'application/json',
      };
    return axiosAdmin.put(url, data.tag,{ headers });
  },

  remove(id) {
    const url = `/tags/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default TagService;
