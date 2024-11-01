// CartComponent.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartComponent = ({ removeFromCart, updateQuantity, onNoteChange }) => {

  const cartItems = useSelector((state) => state.cart.items);

  const handleNoteChange = (e) => {
    // Gọi hàm callback để cập nhật giá trị của note trong CartPage.js
    onNoteChange(e.target.value);
  };
  return (
    <form action="/cart" method="post" id="cartformpage" data-gtm-form-interact-id="0">
      <div className="cart-row">
        <p className="title-number-cart">
          Bạn đang có <strong className="count-cart">{cartItems.length} sản phẩm</strong> trong giỏ hàng
        </p>
        <div className="table-cart" style={{ border: '2px solid #eae4e8' }}>
          {cartItems.map((item) => (
            <div key={item.productId} className="media-line-item line-item" >
              <div className="media-left">
                <div className="item-img">
                  <a href="#">
                    <img src={`http://localhost:8080/api/home/image/${item.image}`} />
                  </a>
                </div>
                <div className="item-remove">
                  <a
                    onClick={() => removeFromCart(item.productId)}
                    className="cart"
                  >
                    Xóa
                  </a>
                </div>
              </div>
              <div className="media-right">
                <div className="item-info">
                  <h3 className="item--title">
                    <a href="#">{item.name}</a>
                  </h3>
                  <div className="item--variant">
                    <span>{item.supplierName}</span>
                  </div>
                </div>
                <div className="item-price">
                  <p>
                    {' '}
                    <span>{item.salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  </p>
                </div>
              </div>
              <div className="media-total">
                <div className="item-total-price">
                  <div className="price">
                    <span>{(item.salePrice * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>

                  </div>
                </div>
                <div className="item-qty">
                  <div className="qty quantity-partent qty-click clearfix">
                    <button type="button" className="qtyminus qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                      -
                    </button>
                    <input
                      type="text"
                      size="4"
                      name={`updates[${item.variantId}]`}
                      min="1"
                      data-price={item.salePrice}
                      value={item.quantity}
                      readOnly
                      className="tc line-item-qty item-quantity"
                    />
                    <button type="button" className="qtyplus qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-row">
        <div className="order-noted-block">
          <div className="container-pd15">
            <div className="checkout-buttons clearfix">
              <label htmlFor="note" className="note-label">
                Ghi chú đơn hàng
              </label>
              <textarea className="form-control" id="note" name="note" rows="5" onChange={handleNoteChange} ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartComponent;
