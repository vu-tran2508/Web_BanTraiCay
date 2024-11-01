// src/components/DeliveryInformation.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from '../../../services/InvoiceService';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';

const PaymentMethod = ({ total }) => {
    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const cartItems = useSelector((state) => state.cart.items);
    const cartData = useSelector(state => state.order.cartData);
    const addressData = useSelector(state => state.order.addresstData.selectedAddress);
    const customerData = JSON.parse(localStorage.getItem('customer'));
    const [invoiceRequest, setInvoiceRequest] = useState({
        payMentMethod: null,
        fullName: customerData.fullname,
        email: customerData.email,
        phone: customerData.phone,
        note: cartData.note,
        amont: total,
        addressId: addressData.addressId,
        code: addressData.code,
        city: addressData.city,
        district: addressData.district,
        ward: addressData.ward,
        streetNumber: addressData.streetNumber,
        // Các thông tin khác của đơn hàng
    });
    useEffect(() => {
        // Update invoiceRequest whenever selectedPaymentMethod changes
        setInvoiceRequest(prevInvoiceRequest => ({
            ...prevInvoiceRequest,
            payMentMethod: parseInt(selectedPaymentMethod)
        }));
    }, [selectedPaymentMethod]);

    const handlePayment = async () => {
        console.log("selectedPaymentMethod--", selectedPaymentMethod);
        if (invoiceRequest.payMentMethod !== null) {
         
            try {
                const response = await createOrder(invoiceRequest, cartItems);
                // Xử lý dữ liệu trả về từ API (response)
                if (invoiceRequest.payMentMethod === 1) {
                    const orderId =response.id;
                    navigate(`/complete-order/${orderId}`);
                    // Xử lý khi thanh toán tiền mặt
                    console.log('Order ID:', response.id);
                } else if (invoiceRequest.payMentMethod === 2) {
                    // Xử lý khi thanh toán qua VNPay
                    console.log('Payment URL:', response);
                  //Redirect người dùng đến URL để thanh toán
                  window.location.href = response.url;
                }
            } catch (error) {
                console.error('Error creating invoice:', error);
            }
        } else {
            toast.error('Vui long chọn phường thức thành toán !', { position: toast.POSITION.TOP_RIGHT });
        }
    };
    const handlePaymentMethodChange = (paymentMethodId) => {
        setSelectedPaymentMethod(paymentMethodId);
    };
    
    return (
        <div className="step">
            <div className="step-sections " step={2}>
                <div id="section-payment-method" className="section">
                    <div className="order-checkout__loading--box">
                        <div className="order-checkout__loading--circle" />
                    </div>
                    <div className="section-header">
                        <h2 className="section-title">Phương thức thanh toán</h2>
                    </div>
                    <div className="section-content">
                        <div className="content-box">
                            <div className="radio-wrapper content-box-row">
                                <label className="two-page" >
                                    <div className="radio-input payment-method-checkbox">
                                        <input
                                            type-id={1}
                                            className="input-radio"
                                            name="payment_method_id"
                                            type="radio"
                                            value="1"
                                           onChange={(e) => handlePaymentMethodChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="radio-content-input">
                                        <img
                                            className="main-img"
                                            src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                                        />
                                        <div className="content-wrapper">
                                            <span className="radio-label-primary">
                                                Thanh toán khi giao hàng (COD)
                                            </span>
                                            <span className="quick-tagline hidden" />
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className="radio-wrapper content-box-row">
                                <label className="two-page">
                                    <div className="radio-input payment-method-checkbox">
                                        <input
                                            className="input-radio"
                                            name="payment_method_id"
                                            type="radio"
                                            value="2"
                                            onChange={(e) => handlePaymentMethodChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="radio-content-input">
                                        <img
                                            className="main-img"
                                            src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=6"
                                        />
                                        <div className="content-wrapper">
                                            <span className="radio-label-primary">
                                                Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY
                                            </span>
                                            <span className="quick-tagline hidden" />
                                            <img
                                                className="child-img"
                                                src="https://hstatic.net/0/0/global/design/seller/image/payment/atm_visa_master_jcb.svg?v=6"
                                            />
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="step-footer" id="step-footer-checkout">
                <button
                    type="submit"
                    className="step-footer-continue-btn btn"
                    onClick={() => handlePayment()}

                >
                    <span className="btn-content">Hoàn tất đơn hàng</span>
                    <i className="btn-spinner icon icon-button-spinner" />
                </button>
                <a className="step-footer-previous-link" href="/cart">
                    Giỏ hàng
                </a>
            </div>
        </div>

    );
};

export default PaymentMethod;
