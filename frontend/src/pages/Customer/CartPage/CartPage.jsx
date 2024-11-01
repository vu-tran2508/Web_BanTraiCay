// CartPage.js
import React, { useEffect, useState } from 'react';
import './CartPage.css'
import CartComponent from '../../../components/ModalCart/Cart';
import bike from '../../../assets/images/Logo/bike.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateCartData } from '../../../redux/actions/order-action';
import { Radio, DatePicker, TimePicker, Button } from 'antd'; // Thêm Button từ Ant Design
import { updateCartItemQuantity, removeFromCart } from '../../../redux/actions/cart-action';
const { RangePicker } = TimePicker;

const CartPage = () => {

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('timeNow');
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState('');

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    console.log(date, dateString); // You can replace this with your logic
  };

  useEffect(() => {
    updateTotalAmount();
  }, [cartItems]);

  const removeCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeCart(productId);
    } else {
      dispatch(updateCartItemQuantity(productId, newQuantity));
    }
  };
  const handleNoteChange = (newNote) => {
    setNote(newNote);
  };


  const updateTotalAmount = () => {
    const totalAmount = cartItems.reduce((acc, currentItem) => {
      // Tính giá tiền cho từng sản phẩm
      const itemTotal = currentItem.quantity * currentItem.salePrice;
    
      // Cộng giá tiền của sản phẩm vào tổng
      return acc + itemTotal;
    }, 0);
    
    
    setTotalAmount(totalAmount);
  };
  console.log("Tổng giá tiền:", totalAmount);

  const handleCheckout = () => {
    // Lưu thông tin vào Redux store
    dispatch(updateCartData({ note, deliveryDate: { date: selectedDate, time: selectedTime } }));
    navigate("/checkouts");
  };

  const formatPrice = (salePrice) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(salePrice);

    return formattedPrice;
  };

  return (
    <div className="wrapperMain_content">
      <div id="layout-cart">
        <div className="wrapper-mainCart">
          <div className="content-bodyCart">
            <div className="container">
              <div className="row" style={{ paddingTop: "20px" }}>
                <div
                  className="col-lg-8 col-md-12 col-12 contentCart-detail"
                  style={{ marginTop: 10 }}
                >
                  <div className="mainCart-detail">
                    <h1
                      className="heading-cart"
                      style={{ borderBottom: "1px solid #eae4e8" }}
                    >
                      Giỏ hàng của bạn
                    </h1>
                    <div className="list-pageform-cart">
                      <CartComponent removeFromCart={removeFromCart} updateQuantity={updateQuantity}  onNoteChange={handleNoteChange} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 sidebarCart-sticky">
                  <div className="wrap-order-summary" style={{ marginTop: "-5px" }}>
                    <div className="order-summary-block">
                      <h2 className="summary-title">Thông tin đơn hàng</h2>
                      <div className="summary-time summary-picktime">
                        <div className="summary-time__row">
                          <div className="boxtime-title">
                            <p className="txt-title">Thời gian giao hàng</p>
                            <p className="txt-time">
                              <i className="fa fa-clock-o" aria-hidden="true" />
                              <span>{deliveryOption === 'timeNow' ? 'Giao khi có hàng' : 'Chọn thời gian'}</span>
                            </p>
                          </div>
                          <div className="boxtime-radio" id="picktime_radio">
                            <Radio.Group onChange={(e) => handleDeliveryOptionChange(e.target.value)} value={deliveryOption}>
                              <Radio value="timeNow">Giao khi có hàng</Radio>
                              <Radio value="timeDate">Chọn thời gian</Radio>
                            </Radio.Group>
                          </div>
                        </div>
                        {deliveryOption === 'timeDate' && (
                          <div className="time-picker-container">
                            <DatePicker onChange={handleDateChange}  />
                            <RangePicker format="HH:mm" onChange={handleTimeChange} />
                          </div>
                        )}
                      </div>
                      <div className="summary-total">
                        <p>
                          Tổng tiền: <span>{formatPrice(totalAmount)}</span>
                        </p>
                      </div>
                      <div className="summary-action">
                        <p>
                          Quý khách mua biếu/ tặng, vui lòng để lại số điện thoại
                          tại phần NOTE trong trang giỏ hàng.
                        </p>
                        <p>
                          Phí vận chuyển và mã giảm giá sẽ được áp dụng ở trang
                          thanh toán.
                        </p>
                        <p>
                          Quý khách vui lòng thanh toán bằng hình thức: Ví VNpay để
                          tối thiểu chi phí giao hàng.
                        </p>
                      </div>
                      <div className="summary-button" onClick={handleCheckout}>
                        <a
                          id="btnCart-checkout"
                          className="checkout-btn btnred "

                        >
                          THANH TOÁN{" "}
                        </a>
                      </div>
                    </div>
                    <div className="order-summary-block">
                      <div className="cart-coupon coupon-initial  bgWhite">
                        <div className="title-coupon">
                          <h2>Khuyến mãi dành cho bạn</h2>
                        </div>
                        <div
                          className="owl-carousel owlCarousel-style owl-loaded owl-drag"
                          id="sliderCouponCart"
                        >
                          <div className="owl-stage-outer">
                            <div
                              className="owl-stage"
                              style={{
                                transform: "translate3d(0px, 0px, 0px)",
                                transition: "all 0s ease 0s",
                                width: 567
                              }}
                            >
                              <div
                                className="owl-item active"
                                style={{ width: "283.062px" }}
                              >
                                <div className="row-coupon">
                                  <div className="col-12 col-md-6 col-xl-12 coupon-item">
                                    <div className="coupon-item__inner">
                                      <div
                                        className="coupon-item__left"
                                        style={{
                                          borderRight: "1px dashed #eae4e8"
                                        }}
                                      >
                                        <div
                                          className="cp-img boxlazy-img"
                                          style={{ backgroundColor: "#f1c150" }}
                                        >
                                          <span className="boxlazy-img__insert">
                                            <img
                                              className=" ls-is-cached lazyloaded"
                                              data-src="#"
                                              src={bike}
                                              alt="Miễn phí vận chuyển đơn hàng từ 500.000đ"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                      <div className="coupon-item__right">
                                        <button
                                          type="button"
                                          className="cp-icon"
                                          title=""
                                          data-original-title="Miễn phí vận chuyển đơn hàng từ 500.000đ "
                                        ></button>
                                        <div className="cp-top">
                                          <h3>
                                            Miễn phí vận chuyển đơn hàng từ 500.000đ
                                          </h3>
                                          <p>Đơn hàng từ 500.000đ</p>
                                        </div>
                                        <div className="cp-bottom">
                                          <div className="cp-bottom-detail">
                                            <p>
                                              Mã: <strong>FREESHIP-01</strong>{" "}
                                            </p>
                                            <p>HSD: </p>
                                          </div>
                                          <div className="cp-bottom-btn">
                                            <button
                                              className="hz"
                                              data-coupon="FREESHIP-01"
                                            >
                                              Sao chép mã
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
