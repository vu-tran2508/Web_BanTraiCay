import React, { useState } from 'react';
import close from '../../../assets/images/Logo/close.png';
import couponTag from '../../../assets/images/Logo/couponTag.png';
import redirect from '../../../assets/images/Logo/redirect.svg';
import truck from '../../../assets/images/Logo/truck.png';
import { Empty } from 'antd';
import {AiOutlineDoubleRight,AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai';
import { increaseQuantity, decreaseQuantity,removeFromCart } from '../../../redux/actions/cart-action';
import config from '../../../config';
import { Link } from 'react-router-dom';
import './cart.css'
import { useDispatch, useSelector } from 'react-redux';

const ModelCart = ({toggleCart}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const formatPrice = (salePrice) => {
    // Sử dụng đối tượng Intl.NumberFormat để định dạng tiền tệ
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(salePrice);

    return formattedPrice;
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((product) => {
      total += product.salePrice * product.quantity;
    });
    return total;
  };



  return (
    <div className="miniKartCont" id="cart-container">
      <div style={{ width: '74%', position: 'fixed', height: '100vh', top: 0, left: 0 }}></div>
     
      <div className="miniKart miniKartOver">
        <div className="minKart_strip d-flex align-items-center py-4 px-4" tabIndex="0" style={{ background: 'rgb(115, 183, 125)' }}>
          <span tabIndex="0">
            <img src={redirect} data-bs-toggle="tooltip" data-bs-placement="top" title="Go to Main Cart Page" alt="" className="me-3" style={{ width: '1.2rem', outline: 'none' }} />
          </span>
          <span style={{ cursor: 'pointer' }} tabIndex="0">
            <span style={{ cursor: 'pointer' }}>Giỏ hàng của tôi</span> (3 items)
          </span>
          <div style={{ position: 'absolute', top: '20px', right: '15px', alignItems: 'center' }}>
            <img src={close} alt="" style={{ cursor: 'pointer', width: '1rem', outline: 'none' }} id="close-button" onClick={toggleCart} />
          </div>
        </div>
        <div style={{ padding: '0 10px 10px', width: '98%', marginBottom: '-4%', marginTop: '4%' }}>
          <div className="top-area">
            <img src={truck} alt="delivery" /> Chúc mừng! Bạn đủ điều kiện để được giao hàng miễn phí
          </div>
        </div>
        <div className="minikart_main">
    <div className="miniKart_pricing py-4" style={{ paddingBottom: "35px !important" }}>
        <div id="total_mrp" className="d-flex">
            <span> Tổng phụ</span>
            <span>{formatPrice(calculateTotal())}</span>
        </div>
        
        <div className="d-flex">
            <span>Phí vận chuyển</span>
            <span> -- </span>
            
        </div>
        <div className="d-flex" style={{ position: "relative" }}>
            <span style={{ fontWeight: 550, fontSize: "12px" }}>Tổng cộng</span>
            <span style={{ fontWeight: 550, fontSize: "12px" }}> {formatPrice(calculateTotal())}</span>
        </div>
    </div>
    {/* SẢN PHẨM TRONG CART START */}
    {cartItems.map((product) => (
    <div key={product.productId}  className="miniKart-product px-4 d-flex py-2">
        <div className="img-wrap">
            <div style={{ height: "100%" }}>
                <img alt={`image of product ${product.productId}`} className="img-fluid m-auto" style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} 
               src={`http://localhost:8080/api/home/image/${product.image}`}/>
            </div>
        </div>
        <div className="text-wrap my-auto">
            <span className="product-off mb-1"> {formatPrice(product.discount)}  off </span>
            <h2 className="mb-1">{product.name}</h2>
            <div className="d-flex pricingDiv align-items-baseline justify-content-between" style={{ borderTop: "none !important", paddingTop: "0px !important" }}>
                <div className="add-remove d-flex align-items-center">
                   <AiOutlineMinus id="fa-solid" onClick={() => handleDecrease(product.productId)} />
                    <span style={{ margin: "0 8px", fontSize: ".9rem" }}>{product.quantity}</span>
                    <AiOutlinePlus id="fa-solid" onClick={() => handleIncrease(product.productId)} />
                   
                </div>
                <div className="minikart-pricing">
                   <span style={{ color: "rgb(115, 183, 125)" }}>
                      {formatPrice(product.salePrice * product.quantity)} <span>/</span><span id="priceUnit1" style={{ textTransform: "capitalize" }}>{product.unit}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
     ))}
    {/* SẢN PHẨM TRONG CART END */}


 
        </div>

        {/* Các sản phẩm khác tương tự */}
        <div className="miniKart-coupon px-3 py-2 mb-2 d-flex align-items-center shadow-sm mt-2" tabIndex="0">
          <img src={couponTag} alt="" className="me-2" />
          ÁP DỤNG PHIẾU GIẢM GIÁ <AiOutlineDoubleRight className='ms-auto'/> 
        </div>
        <div className="minikart_footer px-4 py-4">
        <Link to={config.routes.Cart}>
          <button className="btn" style={{ background: 'rgb(115, 183, 125)', color: 'rgb(255, 255, 255)' }} onClick={toggleCart}>
            <a >Tiến hành thành toán</a>
            <span>{formatPrice(calculateTotal())}</span>
          </button>
        </Link>
        </div>
      </div>
       )}
    </div>
  );
};

export default ModelCart;
