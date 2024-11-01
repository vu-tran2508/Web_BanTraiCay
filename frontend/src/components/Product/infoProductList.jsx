import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegHeart, FaShoppingBasket } from 'react-icons/fa';
import { formatPrice } from "../../redux/actions/cart-action";
import { addToCart, isInCart } from '../../redux/actions/cart-action';
import { useDispatch, useSelector } from 'react-redux';
import config from "../../config";
import { Link } from "react-router-dom";
import LindaQuants from '../Button/LindaQuants';

const InfoProductList = ({ product }) => {
  const isProductInCart = useSelector((state) => isInCart(state.cart.items, product.productId));

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };



  return (
    <div style={{ width: "235.25px" }}>
      <div style={{ background: "rgb(255, 255, 255)", margin: "3% 4% 2%", padding: "0% 0% 2%" }}>
        <div className="cardSia" style={{ height: "100%" }}>
          <div className="listCard3 card h-100" style={{ position: "relative", background: "transparent" }}>
            <div className="h-100">
              <div className="product-imgContainer">
                {/*----*/}
                <a href="/products/product-detail/chiquita-banana/30571000371">
                  <div className="item-heart">
                    <FaRegHeart className="heart-icon" />
                  </div>
                  <div className="product-imgContainer-img">
                    <Link to={`${config.routes.GetProduct.replace(':productId', product.productId)}`}>
                      <img src={`http://localhost:8080/api/home/image/${product.image}`} alt={product.name} loading="eager" />
                    </Link>
                  </div>
                </a>
              </div>
              <div className="listCard3-contentWrap d-flex flex-column">
                <div className="spec-images">
                  <img src="https://resources.commerceup.io/?key=https://prod-admin-images.s3.ap-south-1.amazonaws.com/pWVdUiFHtKGqyJxESltt/other/image-EQOx8FPd3.png&amp;width=600&amp;background=no&amp;png=true&amp;resourceKey=pWVdUiFHtKGqyJxESltt" alt="spec-images" />
                </div>

                <div className="country">{product.supplier.nation} </div>
                <a href="/products/product-detail/chiquita-banana/30571000371">
                  <div className="d-flex listCard3-head-container">
                    <h2 className="listCard3-head elspsisClass" style={{ color: "rgb(0, 0, 0)", fontSize: "16px!important", fontFamily: "Tajawal", fontWeight: "800" }}> {product.name} </h2>
                  </div>
                  <div className="pro-price d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <span id="pro-mainPrice" className="df">{formatPrice(product.salePrice)}</span>
                      <span id="priceUnit1" style={{ textTransform: "capitalize" }}>/ {product.unit}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline w-100 justify-content-between">
                    <span id="pro-subPrice" className="blank-div" style={{ visibility: "hidden" }}>AED .</span>
                  </div>
                </a>

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

export default InfoProductList;
