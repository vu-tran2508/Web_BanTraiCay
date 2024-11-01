import React, { useEffect, useState } from 'react';
import { Table, Select, Modal, Input } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import config from '../../config';
import OrderService from '../../services/OrderService';
import OrderDetailsModal from '../Modal/OrderDetailsModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableConfirmation = () => {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [isModalViewOrder, setIsModalViewOrder] = useState(false);
    const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalViewOrder(true);
    };

    const handleCancelModal = () => {
        setIsModalViewOrder(false);
    };
    const showConfirmDeleteModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsConfirmDeleteVisible(true);
    };

    const handleCancelDeleteModal = () => {
        setIsConfirmDeleteVisible(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.getbyStatus();
                setOrders(response.data);
                console.log("date", response.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    const handleConfirmDelete = async () => {
        // Perform the actual delete action here
        if (!deleteReason) {
            toast.error('Vui lòng nhập lý do hủy đơn hàng.', { position: toast.POSITION.TOP_RIGHT });
            return;
        }
        try {
            // Send the delete request with the order ID and deleteReason
            await OrderService.cancelOrder(selectedOrderId, deleteReason);

            // Optionally, fetch the updated orders after deletion
            const response = await OrderService.getAll();
            setOrders(response.data);
            toast.success('Hủy Đơn hàng thành công !', { position: toast.POSITION.TOP_RIGHT });

        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Lỗi khi Hủy đơn hàng !', { position: toast.POSITION.TOP_RIGHT });

        } finally {
            // Close the confirmation modal
            setIsConfirmDeleteVisible(false);
        }
    };

    const handleUpdateOrder = async () => {
        try {
          const response = await OrderService.getAll();
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

    const columns = [
        {
            title: 'MÃ HÓA ĐƠN',
            dataIndex: 'orderId',
            key: 'orderId',
        },

        {
            title: 'KHÁCH HÀNG',
            dataIndex: 'customer',
            key: 'customer.fullname',
            render: (customer) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`http://localhost:8080/api/admin/customers/${customer.image}`}
                        alt={customer.fullname}
                        title={customer.fullname}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="rizzui-avatar-img inline-flex items-center justify-center flex-shrink-0 object-cover rounded-lg"
                        style={{ width: 48, height: 48, backgroundColor: 'rgb(255, 71, 148)' }}
                    />
                    <span style={{ marginLeft: '8px' }}>{customer.fullname}</span>
                </div>
            ),
        },

        {
            title: 'NGÀY ĐẶT HÀNG',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'TỔNG TIỀN',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => (
                <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
                </span>
            ),
        },

        {
            title: 'PHƯƠNG THỨC TT',
            dataIndex: 'payMent',
            key: 'paymentMethod',
            render: (payment) => (
                <div style={{ padding: '2px', backgroundColor: '#DAA520', borderRadius: '5%', textAlign: 'center' }}>
                    {payment ? `${payment.paymentStatus} - ${payment.paymentMethod}` : 'N/A'}
                </div>
            ),
        },

        {
            title: 'TRANG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div style={{
                    padding: '2px',
                    borderRadius: '5%',
                    textAlign: 'center',
                    backgroundColor: status === 'CANCELLED' ? '#ff5656' : '#5656ff', // Màu đỏ cho trạng thái CANCELLED, ngược lại là màu xanh
                    color: '#ffffff',
                }}>
                    {status}
                </div>
            ),
        },

        {
            title: 'HÀNH ĐỘNG',
            dataIndex: 'actions',
            render: (_, record) => (
                <div className="flex items-center">
                  
                    <a href="#" style={{ paddingLeft: '10px' }}>
                        <button
                            className="borderBTN inline-flex h-7 w-7 items-center"
                            onClick={() => handleViewDetails(record.orderId)}

                        >
                            <MdEdit />
                        </button>
                    </a>
                    <a href="#" style={{ paddingLeft: '10px' }}>
                        {record.status !== 'CANCELLED' && (  // Kiểm tra nếu trạng thái không phải là "CANCELLED"
                            <button
                                className="borderBTN inline-flex h-7 w-7 items-center"
                                onClick={() => showConfirmDeleteModal(record.orderId)}
                            >
                                <AiFillDelete />
                            </button>
                        )}
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

    if (orders == null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table columns={columns} dataSource={orders} rowKey="orderId" pagination={paginationOptions} />
            <OrderDetailsModal
                orderId={selectedOrderId}
                visible={isModalViewOrder}
                onCancel={handleCancelModal}
                onUpdateOrder={handleUpdateOrder} // Pass the callback to the child component

            />
            <Modal
                title="Xác nhận Xóa"
                visible={isConfirmDeleteVisible}
                onCancel={handleCancelDeleteModal}
                onOk={handleConfirmDelete}
            >
                <p>Lý do muốn xóa đơn hàng này?</p>
                <Input
                    placeholder="Nhập lý do xóa"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                />
            </Modal>
        </div>
    );
};


export default TableConfirmation;
