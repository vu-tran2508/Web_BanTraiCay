import axiosAdmin from './axiosAdmin';

const BillService = {
  getAll() {
    const url = '/bill';
    return axiosAdmin.get(url);
  },

  get(id) {
    const url = `/bill/${id}`;
    return axiosAdmin.get(url);
  },

  add(data) {
    const url = '/bill';
    return axiosAdmin.post(url, data);
  },

  update(data) {
    const url = `/bill/${data.Id}`;
    return axiosAdmin.put(url, data);
  },

  remove(id) {
    const url = `/bill/${id}`;
    return axiosAdmin.delete(url);
  },
};

export default BillService;
