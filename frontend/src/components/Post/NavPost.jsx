import React from 'react';



const NavPost = () => {

  
    return (
        <nav className="woocommerce-breadcrumb">
        <a href="https://tomoko-demo.myshopify.com" title="Quay lại trang đầu">
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>Trang chủ </font>
          </font>
        </a>
        <span aria-hidden="true">
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>/ </font>
          </font>
        </span>
        <span>
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>Tin tức</font>
          </font>
        </span>
      </nav>
      
    )
}

export default NavPost