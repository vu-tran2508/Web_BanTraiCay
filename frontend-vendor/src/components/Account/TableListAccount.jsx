import React, { useEffect, useState } from 'react';
import { Table, Modal, Spin } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

import AccountService from '../../services/AccountService';

const TableListCustomer = ({ onAccountsUpdate }) => {
  const [accounts, setAccount] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {

    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await AccountService.getAccountList();
      setAccount(data);
      
    } catch (error) {
      console.error('Error fetching account list:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const showDeleteModal = (accountId) => {
    setCustomerToDelete(accountId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      if (customerToDelete !== null) {
        await AccountService.deleteAccount(customerToDelete);
        toast.success('Đã xoá thành công', { position: toast.POSITION.TOP_RIGHT });
        fetchAccounts();
      } else {
        console.log('KHÔNG TÌM THẤY ID');
      }
    } catch (error) {
      toast.error('Lỗi xóa tài khoản:', { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'TÊN NHÂN VIÊN',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'SDT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'GIỚI TÍNH',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'NGÀY SINH',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'TRANG THÁI',
      dataIndex: 'status',
      key: 'status',
     
    },
    {
      title: 'HÀNH ĐỘNG',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className="flex items-center">
          {/* ... your existing buttons */}
          <a href="#" style={{ paddingLeft: '10px' }}>
            <button
              className="borderBTN inline-flex h-7 w-7 items-center"
              onClick={() => showDeleteModal(record.accountId)}
            >
              <AiFillDelete />
            </button>
          </a>
        </div>
      ),
    },
  ];

  const paginationOptions = {
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15'],
    onShowSizeChange: (_, newSize) => setPageSize(newSize),
  };

  return (
    <Spin spinning={loading} size="large" tip="Loading...">
      <div>
        <Table columns={columns} dataSource={accounts} rowKey="accountId" pagination={paginationOptions} />

        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận Xóa"
          visible={deleteModalVisible}
          onOk={handleDelete}
          onCancel={hideDeleteModal}
        >
          {customerToDelete && (
            <p>Bạn có chắc chắn muốn xóa khách hàng : <strong style={{color:'red'}}>{accounts.find(cust => cust.accountId === customerToDelete)?.fullname}</strong> này?</p>
          )}
        </Modal>
      </div>
    </Spin>
  );
};

export default TableListCustomer;
