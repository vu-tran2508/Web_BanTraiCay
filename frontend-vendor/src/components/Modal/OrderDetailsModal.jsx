// OrderDetailsModal.js
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import OrderService from '../../services/OrderService';
import { FaCheckCircle, FaShippingFast, FaUserCircle, FaCcApplePay, FaTshirt, FaCartArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './orderDetail.css'
import { formatPrice } from '../../constants/formatPrice';

const OrderDetailsModal = ({ orderId, visible, onCancel ,onUpdateOrder }) => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await OrderService.getOrderDetails(orderId);
      setOrderDetails(response);
    } catch (error) {
      // toast.error('Lỗi khi Xác nhân đơn hàng !', { position: toast.POSITION.TOP_RIGHT });
      console.error('Error fetching order details:', error);
    }
  };
  useEffect(() => {

    if (visible && orderId) {
      fetchOrderDetails();
    }
  }, [visible, orderId]);


  const handleUpdateStatus = async (newStatus) => {
    setLoading(true);
    try {
      await OrderService.updateOrderStatus(orderDetails.orderId, newStatus);
      // onCancel();
      fetchOrderDetails();
      onUpdateOrder();
      toast.success('Cập nhật đơn đơn hàng thành công !', { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Lỗi khi Xác nhân đơn hàng !', { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Order Details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1100}  // Thiết lập chiều rộng ở đây
      style={{ marginRight: '50px' }}
    >

      {orderDetails && (
        <div className="invoice-wrapper">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <address className="info-grid">
                  <div className="info-content">
                    <h5 className="title_infos">
                      {" "}

                      <span className="mdi mdi-account-circle" >   <FaUserCircle /></span>
                      TT khách hàng

                    </h5>
                    <ul>
                      <li>
                        Họ và tên: <span> {orderDetails.customer.fullname}</span>
                      </li>
                      <li>
                        Email: <span>{orderDetails.customer.email}</span>{" "}
                      </li>
                      <li>
                        Phone: <span>{orderDetails.customer.phone}</span>
                      </li>
                    </ul>

                  </div>
                </address>
              </div>
              <div className="col-xl-3 col-lg-6">
                <address className="info-grid">
                  <div className="info-content">
                    <h5 className="title_infos">
                      {" "}
                      <span className="mdi mdi-ship-wheel" > <FaShippingFast /> </span> TT vận chuyển
                    </h5>
                    <ul>
                      <li>
                        Tên ĐC: <span> {orderDetails.address.name}</span>
                      </li>
                      <li>
                        Địa chỉ:{" "}
                        <span>{orderDetails.address.streetNumber || 'N/A'} , {orderDetails.address.ward || 'N/A'} , {orderDetails.address.district || 'N/A'},{orderDetails.address.city || 'N/A'}</span>{" "}
                      </li>
                      <li>
                        Phone: <span>{orderDetails.customer.phone}</span>
                      </li>
                    </ul>
                  </div>
                </address>
              </div>
              <div className="col-xl-3 col-lg-6">
                <address className="info-grid">
                  <div className="info-content">
                    <h5 className="title_infos">
                      {" "}
                      <span className="mdi mdi-cart" > <FaCartArrowDown /> </span> TT đặt hàng
                    </h5>
                    <ul>
                      <li>
                        Mã Đơn hàng: <span>{orderDetails.orderId}</span>
                      </li>
                      <li>
                        Ngày đặt hàng: <span>{orderDetails.orderDate}</span>{" "}
                      </li>
                      <li>
                        Trang thái: <span style={{ color: 'red' }}>{orderDetails.status}</span>
                      </li>
                    </ul>

                  </div>
                </address>
              </div>
              <div className="col-xl-3 col-lg-6">
                <address className="info-grid">
                  <div className="info-content">
                    <h5 className="title_infos">
                      {" "}
                      <span className="mdi mdi-card-bulleted" > <FaCcApplePay /> </span>
                      TT thanh toán
                    </h5>
                    <ul>
                      <li>
                        Phương thức TT: <span>{orderDetails.payMent.paymentMethod}</span>
                      </li>
                      <li>
                        Tình trạng TT: <span style={{ color: 'red' }}>{orderDetails.payMent.paymentStatus}</span>{" "}
                      </li>
                      <li>
                        Business name:<span>Grand Market LLC</span>{" "}
                      </li>

                    </ul>
                  </div>
                </address>
              </div>
            </div>
          </div>
          {/* ITEM CỦA ĐƠN HÀNG */}
          <div className="ec-odr-dtl card card-default mt-5">
            <div className="card-header card-header-border-bottom d-flex justify-content-between">
              <h2 className="ec-odr">ITEM CỦA ĐƠN HÀNG</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-striped o-tbl">
                      <thead>
                        <tr className="line">
                          <td>
                            <strong>#</strong>
                          </td>
                          <td>
                            <strong>Ảnh</strong>
                          </td>
                          <td>
                            <strong>Tên Sản Phẩm</strong>
                          </td>
                          <td>
                            <strong>Giá Bán</strong>
                          </td>
                          <td>
                            <strong>Số Lượng</strong>
                          </td>
                          <td>
                            <strong>Tổng</strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails &&
                          orderDetails.orderDetails.map((product, index) => (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>
                                <img
                                  className="product-img"
                                  src={`http://localhost:8080/api/admin/customers/${product.product.image}`}// Chọn đường dẫn ảnh từ dữ liệu sản phẩm
                                  alt={product.name}
                                />
                              </td>
                              <td>{product.name}</td>
                              <td>{formatPrice(product.unitPrice)}</td>
                              <td>{product.quantity}</td>
                              <td>{formatPrice(product.unitPrice * product.quantity)}</td>
                            </tr>
                          ))}
                        <tr>
                          <td colSpan={4}></td>
                          <td className="text-right">
                            <strong>Tổng:</strong>
                          </td>
                          <td className="text-right">
                            <strong>
                              {(orderDetails.amount + (orderDetails.voucher || 0)).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </strong>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={4}></td>
                          <td className="text-right">
                            <strong>Giảm Giá:</strong>
                          </td>
                          <td className="text-right"
                            style={{ color: 'red' }}
                          >
                            <strong>
                              {(orderDetails.voucher || 0).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </strong>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={4}></td>
                          <td className="text-right">
                            <strong>Tổng Thanh toán:</strong>
                          </td>
                          <td className="text-right">
                            <strong>
                              {orderDetails.amount.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </strong>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BUTTON  */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {orderDetails.status === 'WAITING' && (
              <button
                type="button"
                className="btn btn-warning"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => handleUpdateStatus('CONFIRMED')}
                disabled={loading}
              >
                <FaCheckCircle /> XÁC NHẬN
              </button>
            )}
            {orderDetails.status === 'CONFIRMED' && (
              <button
                type="button"
                className="btn btn-warning"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => handleUpdateStatus('SHIPPED')}
                disabled={loading}
              >
                <FaShippingFast /> XÁC NHẬN VẬN CHUYỂN
              </button>
            )}
          </div>

        </div>
      )}

    </Modal>

  );
};

export default OrderDetailsModal;
