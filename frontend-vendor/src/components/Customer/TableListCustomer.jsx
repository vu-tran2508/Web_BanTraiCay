import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select, Modal, Spin } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import config from '../../config';
import { fetchCustomers, deleteCustomer } from '../../redux/actions/customer-action';

const TableListCustomer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customers);
  const [pageSize, setPageSize] = useState(5);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const showDeleteModal = (customerId) => {
    setCustomerToDelete(customerId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (customerToDelete !== null) {
      await dispatch(deleteCustomer(customerToDelete));
      dispatch(fetchCustomers());
      setDeleteModalVisible(false);
    } else {
      console.log('KHÔNG TÌM THẤY ID');
    }
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'HÌNH ẢNH',
      dataIndex: 'image',
      render: (text, record) => (
        <img
          src={`http://localhost:8080/api/admin/customers/${text}`}
          alt={record.fullname}
          title={record.fullname}
          loading="lazy"
          width={48}
          height={48}
          className="rizzui-avatar-img inline-flex items-center justify-center flex-shrink-0 object-cover rounded-lg"
          style={{ width: 48, height: 48, backgroundColor: 'rgb(255, 71, 148)' }}
        />
      ),
    },
    {
      title: 'TÊN KHÁCH HÀNG',
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
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
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
      render: (text) => {
        switch (text) {
          case 0:
            return <span style={{ color: 'green' }}>ACTIVE</span>;
          case 1:
            return <span style={{ color: 'red' }}>INACTIVE</span>;
          case 2:
            return <span style={{ color: 'gray' }}>DECEASED</span>;
          default:
            return text; // Return the numeric value if not matched
        }
      },
    },
    {
      title: 'HÀNH ĐỘNG',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className="flex items-center">
          <Link to={`${config.routes.EditCustomer.replace(':customerId', record.customerId)}`}>
            <button className="borderBTN inline-flex h-7 w-7 items-center">
            <GrView />
            </button>
          </Link>
          {/* <a href="#" style={{ paddingLeft: '10px' }}>
            <button
              className="borderBTN inline-flex h-7 w-7 items-center"
              onClick={() => showDeleteModal(record.customerId)}
            >
              <AiFillDelete />
            </button>
          </a> */}
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
        <Table columns={columns} dataSource={customers} rowKey="customerId" pagination={paginationOptions} />

        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận Xóa"
          visible={deleteModalVisible}
          onOk={handleDelete}
          onCancel={hideDeleteModal}
        >
          {customerToDelete && (
            <p>Bạn có chắc chắn muốn xóa khách hàng : <strong style={{color:'red'}}>{customers.find(cust => cust.customerId === customerToDelete)?.fullname}</strong> này?</p>
          )}
        </Modal>
      </div>
    </Spin>
  );
};

export default TableListCustomer;
