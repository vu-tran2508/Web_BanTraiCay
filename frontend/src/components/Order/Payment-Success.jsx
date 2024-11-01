import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { BsCheckCircleFill, BsHouseDoorFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../../redux/actions/cart-action';
import { getOrderById } from '../../services/InvoiceService';

import './complete-order.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQueryParam = (paramName) => {
    return queryParams.get(paramName) || 'N/A';
  };

  const vnp_Amount = getQueryParam('vnp_Amount');
  const vnp_BankCode = getQueryParam('vnp_BankCode');
  const vnp_BankTranNo = getQueryParam('vnp_BankTranNo');

  const orderId = location.pathname.replace('/payment-successful/', '');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId);
        console.log("DỮ LIỄU TRẢ VỀ ID : ", orderData);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        // Set loading to false once data is fetched, regardless of success or failure
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="order-main">
      {loading ? (
        // Render loading spinner while data is being fetched
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        // Render the content once data is loaded
        <div className="order-form">
          <div className="order-message">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="w-5 h-5 text-brand"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
              </svg>
            </span>
            Cảm ơn bạn. Đơn đặt hàng của bạn đã được nhận.
          </div>
          <ul>
            <li>
              <span>MÃ ĐƠN ĐẶT HÀNG:</span>
              {order.orderId}
            </li>
            <li className="li">
              <span>NGÀY:</span>
              {order.orderDate}
            </li>
            <li className="li">
              <span>GỬI THƯ:</span>
              {order.customer.email}
            </li>
            <li className="li">
              <span>TỔNG THÀNH TOÁN:</span>
              {formatPrice(order.amount)}

            </li>
            <li className="li">
              <span>PHƯƠNG THỨC THANH TOÁN:</span>
              {order.payMent.paymentMethod}
            </li>
            <li className="li">
              <span>MÃ NGÂN HÀNG:</span>
              {vnp_BankCode}
            </li>
          </ul>
          <div className="order-detail">
            <h2>Chi tiết đơn hàng:</h2>
            <table>
              <thead>
                <tr>
                  <th className="th3">Hình ảnh</th>
                  <th className="th1">Sản phẩm</th>
                  <th className="th2">Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails.map((orderDetail) => (
                  <tr key={orderDetail.orderDetailId}>
                    <td>
                      <img
                        src={`http://localhost:8080/api/home/image/${orderDetail.product.image}`} alt={orderDetail.product.name}

                        style={{ height: 50, width: 60 }}
                      />
                    </td>
                    <td>{orderDetail.name}</td>
                    <td>{formatPrice(orderDetail.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="subtotal-row">
                  <td className="td1" style={{ width: '400px' }}>Tổng phụ:</td>
                  <td>{formatPrice(order.amount)}</td>
                </tr>
                <tr className="subtotal-row" style={{ color: 'red' }}>
                  <td className="td1">Giám Giá:</td>
                  <td>{order.voucher ? `${order.voucher.amount} VND` : '0 đ'}</td>
                </tr>
                <tr className="subtotal-row">
                  <td className="td1">Phương thức thanh toán:</td>
                  <td> {order.payMent.paymentMethod}</td>
                </tr>
                <tr className="subtotal-row">
                  <td className="td1">Tất cả:</td>
                  <td>{formatPrice(order.amount)}</td>
                </tr>
                <tr className="subtotal-row">
                  <td className="td1">Ghi Chú:</td>
                  <td>{order.note}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
