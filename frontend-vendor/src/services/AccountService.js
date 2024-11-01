import axiosAdmin from './axiosAdmin';



const AccountService = {
    addAccount: async (accountDTO) => {
        
    const URL = '/accounts/add';
      try {
        console.log('tài khoản thành:', accountDTO.values);
        const response = await axiosAdmin.post(URL, accountDTO.values, { headers: { 'Content-Type': 'application/json' } });
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
  
    deleteAccount: async (accountId) => {
        const URL = `/accounts/delete/${accountId}`;
      try {
        const response = await axiosAdmin.delete(URL);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
  
    getAccountList: async () => {
        const URL = '/accounts/list';
      try {
        const response = await axiosAdmin.get(URL);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
  };
  
  export default AccountService;