import React from 'react';
import { FaPagelines } from "react-icons/fa";


const CartInfo = () => {

  
    return (
        <aside className="widget widget--adv">
  <div className="widget--content">
    <a href="#" className="item--adv style--white imgcover--wrap">
      <div className="imgcover--overlay">
        <img
          src="//tomoko-demo.myshopify.com/cdn/shop/t/4/assets/adv.jpg?v=8730449312740577141465532872"
          alt=""
        />
      </div>
      <div className="imgcover--content text-center">
        <FaPagelines/>
        <h5 className="item--slogan">
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>
              - Tươi &amp; Ngon -
            </font>
          </font>
        </h5>
        <h2>
          <i>
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>Dầu ô liu </font>
            </font>
            <br />
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>nguyên chất hữu </font>
              <font style={{ verticalAlign: "inherit" }}>cơ</font>
            </font>
            <br />
            <font style={{ verticalAlign: "inherit" }} />
          </i>
        </h2>
        <h5 className="item--slogan">
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>- Mới -</font>
          </font>
        </h5>
        <span className="button--common button--main button--hover-dark-main">
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>
              Mua sắm ngay bây giờ
            </font>
          </font>
        </span>
      </div>
    </a>
  </div>
</aside>

    )
}

export default CartInfo