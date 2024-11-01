import React from 'react';
import { MdAddCircle } from "react-icons/md";
import { HiMiniTag } from "react-icons/hi2";
import { FaComment } from "react-icons/fa6";
import img_blog from '../../assets/images/blog/img_blog_8_1024x1024.webp';

const CartPostInfo = () => {

  
    return (
        <li>
        <div className="blog--item">
          <a href="#" className="item--images" title="Món ngon mùa hè" rel="nofollow">
            <img
              src={img_blog}
              alt="Món ngon mùa hè" style={{ maxWidth: "100%", height: "auto"}}
            />
             <div className="image-overlay">
            </div>
            <div className="icon-container">
                        <MdAddCircle className="add-icon" />
         </div>
          </a>
         
          <div className="item--date">
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>Tháng <br /> Sáu</font>
            </font>
            <span>
              <font style={{ verticalAlign: "inherit" }}>
                <font style={{ verticalAlign: "inherit" }}>09</font>
              </font>
            </span>
          </div>
          <div className="item--category">
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>Tin tức</font>
            </font>
          </div>
          <h2 className="item--title--post">
            <a href="#" title="Món ngon mùa hè">
              <i>
             
                  Món ngon mùa hè
               
              </i>
            </a> 
          </h2>
          <p className="item--description">
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>
              Ngay cả cuộc sống cũng tuyệt vời.{" "}
              </font>
              <font style={{ verticalAlign: "inherit" }}>
              Một số nhà phát triển sẽ theo đuổi sự phát triển lâm sàng.{" "}
              </font>
              <font style={{ verticalAlign: "inherit" }}>
              Chúng ta sống và sống như nỗi đau trong lòng ngựa. {" "}
              </font>
              <font style={{ verticalAlign: "inherit" }}>
              Đối với ai là dễ dàng và tuyệt vời....
              </font>
            </font>
          </p>
          <ul className="item--meta">
            <li>
              <font style={{ verticalAlign: "inherit" }}>
                <font style={{ verticalAlign: "inherit" }}>Đăng bởi </font>
              </font>
              <a href="#">
                <strong>
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>Engo Creative</font>
                  </font>
                </strong>
              </a>
            </li>
            <li>
             <HiMiniTag className='fa-tag'/>
              <strong>
                <a
                  href="/blogs/news/tagged/foods"
                  title="Hiển thị các bài viết được gắn thẻ Thực phẩm"
                >
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>Thực phẩm </font>
                  </font>
                </a>
              </strong>
              <strong>
                <a
                  href="/blogs/news/tagged/orange"
                  title="Hiển thị các bài viết được gắn thẻ màu cam"
                >
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>Màu cam </font>
                  </font>
                </a>
              </strong>
              <strong>
                <a
                  href="/blogs/news/tagged/summer"
                  title="Hiển thị các bài viết được gắn thẻ Mùa hè"
                >
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>Mùa hè</font>
                  </font>
                </a>
              </strong>
            </li>
            <li>
              <FaComment className='fa-comment'/>
              <a href="##comments">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>3 Bình luận</font>
                </font>
              </a>
            </li>
          </ul>
        </div>
      </li>
      
    )
}

export default CartPostInfo