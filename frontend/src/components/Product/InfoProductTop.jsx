import React from "react";
import './ProductCard.css';
import { FaRegHeart, FaShoppingBasket } from 'react-icons/fa';
import config from "../../config";
import { addToCart, isInCart } from '../../redux/actions/cart-action';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LindaQuants from '../Button/LindaQuants';
const InfoProductTop = ({ product }) => {


  const isProductInCart = useSelector((state) => isInCart(state.cart.items, product.productId));


  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };




  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.salePrice);

  return (
    <div style={{ background: 'rgb(255, 255, 255)', margin: '4% 2% 0%', padding: '3% 3% 1%' }}>
      <div className="cardSiaTop" style={{ height: '100%' }}>
        <div className="card h-100" style={{ position: 'relative', background: 'transparent' }}>
          <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-5 col-5">
              <div className="product-imgContainer">
                <Link to={`${config.routes.GetProduct.replace(':productId', product.productId)}`}>
                  <img src={`http://localhost:8080/api/home/image/${product.image}`} alt={product.name} loading="eager" />
                </Link>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 col-7">
              <div className="align-items-center listCard3-head-container">
                <h2 className="listCard3-head elepsis-card" style={{ color: 'rgb(17, 17, 17)', fontSize: '25px', fontWeight: '400' }}>
                  {product.name}
                </h2>
                <span id="pro-mainPrice">
                  {formattedPrice} <span className="selas-unit">/</span> <span id="priceUnit1">    / {product.unit}</span>
                </span>

                {isProductInCart ? (
                  <LindaQuants productId={product.productId} />
                ) : (
                  <div className="cartStrip add-to-cart-btn" onClick={handleAddToCart}>
                    <FaShoppingBasket className='fa-solid fa-basket-shopping' /> Add to Bag
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};
export default InfoProductTop;