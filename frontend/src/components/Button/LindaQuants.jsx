import React, { useEffect, useState } from 'react';
import './button.css';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { decreaseQuantity,increaseQuantity } from '../../redux/actions/cart-action';
import { useDispatch, useSelector } from 'react-redux';

// LindaQuants component
const LindaQuants = (productId) => {
    const id = productId.productId;
    const dispatch = useDispatch();
    const storedQuantity = useSelector((state) => {
      const cartItem = state.cart.items.find((item) => item.productId === id);
    
      return cartItem ? cartItem.quantity : undefined;

    });
    const [quantity, setQuantity] = useState(storedQuantity || 1);

    useEffect(() => {
        // Cập nhật quantity khi storedQuantity thay đổi
        setQuantity(storedQuantity || 1);
      }, [storedQuantity]); // Sử dụng mảng dependency để đảm bảo useEffect chỉ chạy khi storedQuantity thay đổi

    const handleIncrease = () => {
      setQuantity(quantity + 1);
      dispatch(increaseQuantity(id));
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
      dispatch(decreaseQuantity(id));
    };
  
    return (
      <div key={quantity} className="lindaQuant d-flex align-items-center justify-content-between me-1 mt-auto">
        <span className="icon icon-minus" type="button" onClick={handleDecrease}>
          <FiMinus />
        </span>

        <span
          className="mx-2 center-qty d-flex justify-content-center align-items-center"
          style={{ color: "rgb(99, 99, 99)", fontSize: 15, fontWeight: 400 }}
        >
          {quantity}
        </span>
        <span className="icon icon-plus" onClick={handleIncrease}>
          <FaPlus />
        </span>
      </div>
    );
  };
  
  export default LindaQuants;

