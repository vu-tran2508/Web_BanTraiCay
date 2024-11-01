// CompleteOrder.js

import React, { useEffect, useState } from 'react';
import './complete-order.css';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../redux/actions/cart-action';
import { getOrderById } from '../../services/InvoiceService';

const CompleteOrder = () => {
    const [order, setOrder] = useState(null);
    const { orderId } = useParams();
    console.log(" ID : ", orderId)
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(orderId);
                console.log("DỮ LIỄU TRẢ VỀ ID : ", orderData)
                setOrder(orderData);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchOrder();
    }, [orderId]);


    return (
        <div className="order-main">



            {order ? (
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
                    </ul>
                    <p>Thanh toán bằng tiền mặt khi delevery.</p>
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
                                    <td>{formatPrice(order.amount)}</td>                                </tr>
                                <tr className="subtotal-row" style={{color:'red'}}>
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
                                    <td className="td1">Ghi:</td>
                                    <td>{order.note}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
};

export default CompleteOrder;
