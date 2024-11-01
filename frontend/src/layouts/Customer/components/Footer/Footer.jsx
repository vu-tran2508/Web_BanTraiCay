import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'
import facebook from '../../../../assets/images/Logo/facebook.svg';
import instagram from '../../../../assets/images/Logo/instagram.svg';
import jcb from '../../../../assets/images/Logo/jcb.svg';
import visa from '../../../../assets/images/Logo/visa.svg';
import mastercard from '../../../../assets/images/Logo/mastercard.svg';
import paypal from '../../../../assets/images/Logo/paypal.svg';
import redirect from '../../../../assets/images/Logo/redirect.svg';
import skrill from '../../../../assets/images/Logo/skrill.svg';
import twitter from '../../../../assets/images/Logo/twitter.svg';
import youtube from '../../../../assets/images/Logo/youtube.svg';
import LOGO from '../../../../assets/images/Logo/LOGO.jpg';

const Footer = () => {
  return (
    <footer>
    <div className="footer-main">
      <div className="footer-form">
        <div className="footer-one">
          <div className="footer-one-content">
            <a href="">
              <img
                src={LOGO}
                alt="FPT"
                loading="eager"
                width={131}
                height={30}
                decoding="async"
                className="transform scale-85 md:scale-100"
                data-nimg={1}
                style={{ color: "transparent" }}
              />
            </a>
            <p>
              Chúng tôi cung cấp thực phẩm chất lượng cao và dịch vụ giao hàng tốt
              nhất, cũng như thị trường thực phẩm mà bạn có thể tin tưởng mù
              quáng.
            </p>
          </div>
          <ul>
            <li>
              <a target="_blank" rel="noreferrer" href="">
                <img
                  alt="facebook"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="transform scale-85 md:scale-100"
                  style={{ color: "transparent", width: "auto" }}
                  src={facebook}
                />
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="">
                <img
                  alt="x"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="transform scale-85 md:scale-100"
                  style={{ color: "transparent", width: "auto" }}
                  src={twitter}
                />
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="">
                <img
                  alt="instagram"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  className="transform scale-85 md:scale-100"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={instagram}
                />
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="">
                <img
                  alt="youtube"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="transform scale-85 md:scale-100"
                  style={{ color: "transparent", width: "auto" }}
                  src={youtube}
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-two">
          <h3>Nhà cùng cấp</h3>
          <ul>
            <li>
              <a href="">Công ty A</a>
            </li>
            <li className="li">
              <a href="">Công ty B</a>
            </li>
            <li className="li">
              <a href="">Công ty C</a>
            </li>
            <li className="li">
              <a href="">Công ty D</a>
            </li>
          </ul>
        </div>
        <div className="footer-three">
          <h3>Thông tin của chúng tôi</h3>
          <ul>
            <li>
              <a href="">Cập nhật chính sách bảo mật</a>
            </li>
            <li className="li">
              <a href="">Điều khoản &amp; điều kiện</a>
            </li>
            <li className="li">
              <a href="">Chính sách đổi trả</a>
            </li>
            <li className="li">
              <a href="">Bản đồ trang web</a>
            </li>
          </ul>
        </div>
        <div className="footer-four">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>
              <a href="">Về chúng tôi</a>
            </li>
            <li className="li">
              <a href="">Liên hệ</a>
            </li>
            <li className="li">
              <a href="">Về đội ngũ</a>
            </li>
            <li className="li">
              <a href="">Hỗ trợ khách hàng</a>
            </li>
          </ul>
        </div>
        <div className="footer-five">
          <h3>Đăng ký ngay</h3>
          <p>
            Đăng ký email để nhận bản tin và tin tức nổi bật dựa trên sở thích của
            bạn
          </p>
          <form action="">
            <span>
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
              
                
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M16.3125 2.25H1.68751C0.75696 2.25 0 3.00696 0 3.93751V14.0625C0 14.9931 0.75696 15.75 1.68751 15.75H16.3125C17.243 15.75 18 14.9931 18 14.0625V3.93751C18 3.00696 17.243 2.25 16.3125 2.25ZM16.3125 3.375C16.3889 3.375 16.4616 3.39085 16.5281 3.41854L9 9.94319L1.47188 3.41854C1.53834 3.39089 1.61105 3.375 1.68747 3.375H16.3125ZM16.3125 14.625H1.68751C1.37715 14.625 1.125 14.3729 1.125 14.0625V4.60711L8.6314 11.1127C8.73743 11.2044 8.86872 11.25 9 11.25C9.13128 11.25 9.26256 11.2044 9.3686 11.1127L16.875 4.60711V14.0625C16.875 14.3729 16.6228 14.625 16.3125 14.625Z"
                    fill="#B3B3B3"
                  />
                </g>
              </svg>
            </span>
            <div className="footer-five-input">
              <input type="text" name="" id="" />
            </div>
            <button>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              
              
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M18.809 8.21633L2.67252 1.52062C1.99272 1.23851 1.22471 1.36262 0.668264 1.84434C0.111818 2.32613 -0.120916 3.06848 0.0609589 3.78164L1.49725 9.41414H8.52951C8.85311 9.41414 9.11549 9.67648 9.11549 10.0001C9.11549 10.3237 8.85315 10.5861 8.52951 10.5861H1.49725L0.0609589 16.2186C-0.120916 16.9318 0.111779 17.6741 0.668264 18.1559C1.22584 18.6386 1.99393 18.7611 2.67256 18.4796L18.809 11.7839C19.5437 11.4791 20.0001 10.7955 20.0001 10.0001C20.0001 9.20469 19.5437 8.52113 18.809 8.21633Z"
                    fill="#02B290"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width={20} height={20} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="footer-pay">
      <div className="pay-form">
        <div className="pay-content">
          <p>
            ©&nbsp; Bản quyền 2023
            {/* */}&nbsp;
            <a
              className="transition-colors duration-200 ease-in-out text-brand-dark hover:text-brand"
            
            >
              REDQ
            </a>
            &nbsp;
            {/* */}Tất cả các quyền đã đặt
          </p>
          <ul>
            <li>
              <a
                href="/"
                target="_blank"
                className="inline-flex"
                rel="noreferrer"
              >
                <img
                  alt="Master Card"
                  loading="lazy"
                  width={34}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={mastercard}
                />
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                className="inline-flex"
                rel="noreferrer"
              >
                <img
                  alt="Visa"
                  loading="lazy"
                  width={50}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={visa}
                />
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                className="inline-flex"
                rel="noreferrer"
              >
                <img
                  alt="Paypal"
                  loading="lazy"
                  width={76}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={paypal}
                />
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                className="inline-flex"
                rel="noreferrer"
              >
                <img
                  alt="JCB"
                  loading="lazy"
                  width={26}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={jcb}
                />
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                className="inline-flex"
                rel="noreferrer"
              >
                <img
                  alt="Skrill"
                  loading="lazy"
                  width={39}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  style={{ color: "transparent", width: "auto" }}
                  src={skrill}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
