import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Steps, Descriptions, Tag } from 'antd';
import { filterOrdersByCustomer } from '../../services/InvoiceService';
import { formatPrice } from '../../redux/actions/cart-action';
import { AiFillEdit } from 'react-icons/ai';
import OrderActionButtons from './OrderActionButtons';
import { cancelOrder } from '../../services/InvoiceService';
import { confirmOrder } from '../../services/InvoiceService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Step } = Steps;

const InvoiceTable = () => {
  const [customerId, setCustomerId] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);


  // đơn hàng chỉ tiết
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Lấy customerId từ localStorage khi component được render
    const storedUserData = localStorage.getItem("customer");
    const parsedUserData = JSON.parse(storedUserData);
    if (parsedUserData) {
      setCustomerId(parsedUserData.customerId);
    }
  }, []);

  // Sử dụng useEffect để gọi API khi component được tạo
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy danh sách đơn hàng dựa trên customerId
        const response = await filterOrdersByCustomer(customerId);
        setDataSource(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Gọi hàm fetchData
  }, [customerId, drawerVisible]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      defaultSortOrder: 'descend', // Sắp xếp giảm dần theo orderId
      sorter: (a, b) => a.orderId - b.orderId, // Sắp xếp theo orderId
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span>{formatPrice(amount)}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer.fullname,
    },
    {
      title: 'Payment Method',
      dataIndex: 'payMent',
      key: 'paymentMethod',
      render: (payMent) => (
        <span style={{ color: 'red', textAlign: 'center' }}>
          <Tag color="blue">  {payMent.paymentMethod}   </Tag>
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'WAITING':
            color = 'orange';
            break;
          case 'CONFIRMED':
            color = 'blue';
            break;
          case 'SHIPPED':
            color = 'green';
            break;
          case 'COMPLETED':
            color = 'cyan';
            break;
          case 'CANCELLED':
            color = 'red';
            break;
          default:
            color = 'default';
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleViewDetails(record)} style={{ color: 'black', border: '1px solid black', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AiFillEdit />
          </Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    // Mở Drawer và lưu thông tin đơn hàng cần sửa
    setDrawerVisible(true);
    setSelectedOrder(record);
  };

  const handleDrawerClose = () => {
    // Đóng Drawer
    setDrawerVisible(false);
    setSelectedOrder(null);
  };

  const getOrderStep = (status) => {
    switch (status) {
      case 'WAITING':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'SHIPPED':
        return 2;
      case 'COMPLETED':
        return 3;
      default:
        return 0;
    }
  };

  const handleCancelOrder = async (orderId, cancelReason) => {
    // Kiểm tra xem orderId có tồn tại không
    if (orderId) {
       try {
        await cancelOrder(orderId, cancelReason);
        toast.success('Hủy Đơn hàng thành công !', { position: toast.POSITION.TOP_RIGHT });
       } catch (error) {
        console.error('Error deleting order:', error);
      toast.error('Lỗi khi Hủy đơn hàng !', { position: toast.POSITION.TOP_RIGHT });
        
       }
    } else {
        console.error('Order ID not available.');
    }
};

const handleconfirmOrder = async () => {
  const orderId = selectedOrder ? selectedOrder.orderId : null;
  if (orderId) {
     try {
      await confirmOrder(orderId);
      toast.success('Xác nhận đơn hàng thành công !', { position: toast.POSITION.TOP_RIGHT });
      handleDrawerClose();
    } catch (error) {
      console.error('Error confirming order:', error);
      toast.error('Lỗi khi xác nhận đơn hàng !', { position: toast.POSITION.TOP_RIGHT });
      
     }
  } else {
      console.error('Order ID not available.');
  }
};



  const handleContactSeller = (contactSellerText) => {
    // Thực hiện logic khi liên hệ người bán ở các trạng thái khác
    console.log('Contact Seller Logic with content:', contactSellerText);
  };

  const handleReturnOrder = () => {
    // Thực hiện logic khi trả hàng ở trạng thái COMPLETED
    console.log('Return Order Logic');
  };

  const handleReorder = () => {
    // Thực hiện logic khi mua lại ở trạng thái COMPLETED
    console.log('Reorder Logic');
  };


  return (
    <div>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} loading={loading} />
      {/* Drawer để hiển thị chi tiết đơn hàng */}
      <Drawer
        title="THÔNG TIN ĐƠN HÀNG CHI TIẾT"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={700}
      >
        {/* Hiển thị thông tin chi tiết đơn hàng trong Drawer */}
        {selectedOrder && (
          <div>
            <Steps current={getOrderStep(selectedOrder.status)} size="small" style={{ marginBottom: 16, fontSize: 12 }}>
              <Step title="Chờ xác nhận" description="Đơn hàng đang chờ xác nhận" />
              <Step title="Đã xác nhận" description="Đơn hàng đã được xác nhận" />
              <Step title="Đã vận chuyển" description="Đơn hàng đã được chuyển đi" />
              <Step title="Đã giao hàng" description="Đơn hàng đã được giao" />
            </Steps>
            <div className="order-detail">
              <h2>CHI TIẾT ĐƠN HÀNG:</h2>
              <Table
                dataSource={selectedOrder.orderDetails}
                columns={[
                  {
                    title: 'Hình ảnh',
                    dataIndex: 'product',
                    key: 'product',
                    render: (product) => (
                      <img
                        src={`http://localhost:8080/api/home/image/${product.image}`}
                        alt="Product"
                        style={{ height: 50, width: 60 }}
                      />
                    ),
                  },
                  {
                    title: 'Sản phẩm',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Số lượng',
                    dataIndex: 'quantity',
                    key: 'quantity',
                  },
                  {
                    title: 'Giá tiền',
                    dataIndex: 'unitPrice',
                    key: 'unitPrice',
                    render: (unitPrice) => formatPrice(unitPrice),
                  },
                ]}
                pagination={false}
              />

              {/* Tổng cộng và các thông tin khác */}

              <Descriptions title="Thông tin đơn hàng" column={1}>
                <Descriptions.Item label="Tổng phụ">
                  {formatPrice(selectedOrder.amount)}
                </Descriptions.Item>
                <Descriptions.Item label="Giảm giá" style={{ color: 'red' }}>
                  {formatPrice(selectedOrder.voucher ? selectedOrder.voucher.amount : 0)}
                </Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">
                  <Tag color="blue">{selectedOrder.payMent.paymentMethod}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Tất cả">
                  {formatPrice(selectedOrder.amount)}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú">
                  {selectedOrder.note}
                </Descriptions.Item>
              </Descriptions>

            </div>

            <div>
              {/* Hiển thị button tùy thuộc vào trạng thái */}
              <OrderActionButtons
                status={selectedOrder.status}
                onCancel={(reason) => handleCancelOrder(selectedOrder.orderId, reason)}
                onContactSeller={(content) =>handleContactSeller(content)}
                onconfirmOrder={handleconfirmOrder}
                onReturn={handleReturnOrder}
                onReorder={handleReorder}

                
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default InvoiceTable;
