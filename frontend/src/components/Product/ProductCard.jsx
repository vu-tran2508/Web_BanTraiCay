import React from 'react';
import './ProductCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addToCart ,isInCart} from '../../redux/actions/cart-action';
import { FaRegHeart, FaShoppingBasket } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import config from '../../config';
import LindaQuants from '../Button/LindaQuants';

const ProductCard = ({ product }) => {
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
    <div className="pro">

      <div className="item-label">
        {product.discountLabel && (
          <img src={product.discountLabel} alt="" className="lb-tragop" />
        )}
      </div>

      <div className="item-heart">
        <FaRegHeart />
      </div>

      <Link to={`${config.routes.GetProduct.replace(':productId', product.productId)}`}>
         <img src={`http://localhost:8080/api/home/image/${product.image}`} alt={product.name} loading="eager" />
        </Link>
      <div className="des">
        <span id="Nation">{product.supplier.nation}</span>
        <h5 className="title">{product.name}</h5>
        <div className="pro-price d-flex flex-column">
          <div className="d-flex align-items-center">
            <span id="pro-mainPrice" className="df">
              {formattedPrice}
            </span>
            <span id="priceUnit1" className="price-unit" style={{
              textTransform: 'capitalize',
              color: '#acacac',
              fontSize: '16px'
            }}>
              / {product.unit}
            </span>
          </div>
        </div>
      </div>
      {isProductInCart ? (
        <LindaQuants productId={product.productId}/>
      ) : (
        <div className="cartStrip add-to-cart-btn" onClick={handleAddToCart}>
          <FaShoppingBasket className='fa-solid fa-basket-shopping' /> Add to Bag
        </div>
      )}

    </div>
  );
};

export default ProductCard;
