import React, { useEffect, useState } from 'react';
import { Table ,Select, Popconfirm, Button } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import config from '../../config';
import OrderService from '../../services/OrderService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TableListOrder = () => {
  const [pageSize, setPageSize] = useState(5);
  const [orders, setOrders] = useState([]); // State to store orders
  const { Option } = Select;
  useEffect(() => {
    // Fetch data when the component mounts
    OrderService.getAll()
      .then(response => {
        // Update the state with the fetched orders
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        toast.error('Lỗi khi tải thông tin Sản phẩm !', { position: toast.POSITION.TOP_RIGHT });
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts


  const handleRemove = orderId => {
    OrderService.remove(orderId)
      .then(response => {
        // Assuming the server responds with the updated list of orders
        setOrders(response.data);
        // You can dispatch a Redux action here if needed
      })
      .catch(error => {
        console.error('Error removing order:', error);
      });
  };
  const handleStatusChange = (orderId, newStatus) => {
    OrderService.confirm(orderId, newStatus)
    .then(response => {
      // Update the state with the fetched orders
      setOrders(response.data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
      toast.error('Lỗi khi Xác nhân đơn hàng !', { position: toast.POSITION.TOP_RIGHT });
    });
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };


  const columns = [
    {
      title: 'MÃ HÓA ĐƠN',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'TÊN KHÁCH HÀNG',
      dataIndex: ['customer', 'fullname'], // Use an array for nested keys
      key: 'customer.fullname',
    },
    {
      title: 'TỔNG TIỀN',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'NGÀY ĐẶT HÀNG',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'TỔNG GIÁM GIÁ',
      dataIndex: ['voucher', 'discountAmount'], // Use an array for nested keys
      key: 'voucher.discountAmount',
    },
    {
      title: 'TRANG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          value={text}  // Sử dụng 'value' thay vì 'defaultValue'
          style={{ width: 150 }}
          onChange={newStatus => handleStatusChange(record.customerId, newStatus)}
        >
          <Option value={1}>CHỜ XÁC NHẬN</Option>
          <Option value={2}>ĐÃ XÁC NHẬN</Option>
          <Option value={3}>HOÀN THÀNH</Option>
        </Select>
      ),
    },
    {
      title: 'HÀNH ĐỘNG',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className="flex items-center">
          <Link to={`${config.routes.EditCustomer.replace(':orderId', record.orderId)}`}>
            <button className="borderBTN inline-flex h-7 w-7 items-center">
              <MdEdit />
            </button>
          </Link>
          <a href="#" style={{ paddingLeft: '10px' }}>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleRemove(record.orderId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" className="borderBTN inline-flex h-7 w-7 items-center" icon={<AiFillDelete />} />
          </Popconfirm>
          </a>
          <a href="#" style={{ paddingLeft: '10px' }}>
            <button className="borderBTN inline-flex h-7 w-7 items-center">
              <GrView />
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
    <div>
      <Table columns={columns} dataSource={orders} rowKey="orderId" pagination={paginationOptions} />

    </div>
  );
};


export default TableListOrder;
