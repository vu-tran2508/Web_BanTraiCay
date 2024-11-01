// SidebarMenu.js

import React from 'react';
import './SidebarMenu.css'; // Import file CSS cho styling
import { FaBars, FaBloggerB } from 'react-icons/fa';
import { BiSolidCategory, BiConfused } from 'react-icons/bi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { GiFruitBowl } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import config from '../../../../config';
import Logo from '../../../../assets/images/Logo/LOGO2.png';
import Logo_sm from '../../../../assets/images/Logo/logo-sm.png';
import NavItem from '../../../../components/NavItem/NavItem';

const SidebarMenu = () => {

  const category = [
    { to: config.routes.ListCategory, title: 'Danh Sách Danh Mục' },
    // { to: config.routes.AddCatrgory, title: 'Tạo Danh Mục' },
  ];

  const supplier = [
    { to: config.routes.ListSupplier, title: 'Danh Sách Nhà SX' },
    { to: config.routes.AddSupplier, title: 'Tạo Nhà Cung Cấp' },
  ];
  const products = [
    { to: config.routes.ListProduct, title: 'Danh Sách Sản Phẩm' },
    { to: config.routes.AddProduct, title: 'Tạo Sản Phẩm' },
  ];
  const Invoice = [
    {to: config.routes.InvoiceConfirmation, title: 'Hóa Đơn Chơ Xác Nhận' },
    { to: config.routes.ListOrder, title: 'Danh Sách Hóa Đơn' },
    { href: '#', title: 'Thông Tin Chi Tiết' },
  ];
  const Blog = [
    { to:config.routes.ListPost, title: 'Danh Sách Bài Viết' },
    {to: config.routes.TagPost, title: 'Tags' },
    {to: config.routes.AddPost, title: 'Tạo Bài Viết' },

  ];
  const Customer = [
    { to: config.routes.ListCustomer, title: 'Danh Sách Khách Hàng' },
    { to: config.routes.AddCustomer, title: 'Tạo Khách Hàng' },

  ];
  const Account = [
    { to: config.routes.ListAccount, title: 'Danh Sách Tài Khoản' },
  ];


  return (

    <div className="vertical-menu" is-condensed="false">
      <div className="navbar-brand-box">
        <a
          aria-current="page"
          href="#"
          className="router-link-active router-link-exact-active logo logo-dark"
        >
          <span className="logo-sm">
            <img src={Logo_sm} alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src={Logo} alt="" height={80} />
          </span>
        </a>
        <a aria-current="page" href="/admin/" className="router-link-active router-link-exact-active logo logo-light" >
          <span className="logo-sm">
            <img
              src={Logo_sm}
              alt=""
              height={22}
            />
          </span>
          <span className="logo-lg">
            <img
              src={Logo}
              alt=""
              height={20}
            />
          </span>
        </a>
      </div>
      <button
        variant="button"
        className="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
        fdprocessedid="llb71s"
      >
        <FaBars />
      </button>
      <div className="sidebar-menu-scroll simplebar-scrollable-y" data-simplebar="init"  >
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                tabIndex={0}
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                      <li className="menu-title">Home</li>
                      <li className="mm-active">
                      <Link to={config.routes.Dashboard} className="side-nav-link-ref">
                      <i className="uil-home-alt" />
                          <span>Trang tổng quan</span>
                          <span className="badge rounded-pill bg-primary float-end">
                            01
                          </span>
                        </Link>

                      </li>
                      <li className="menu-title">Menu</li>
                      <li>
                        <Link to={config.routes.calendar} className="side-nav-link-ref">
                          <i className="uil-calender" />
                          <span>Lịch sự kiện</span>
                        </Link>
                      </li>
                      {/* <li>

                        <a
                          href="#"
                          className="side-nav-link-ref"
                        >
                          <i className="uil-comments-alt" />
                          <span>Trò chuyện</span>
                          <span className="badge rounded-pill bg-warning float-end">
                            New
                          </span>
                        </a>

                      </li> */}
                      {/*Thươngf mai điện tử start*/}
                
                      {/*Thương mai điện tử end */}
                      <NavItem title="Quản lý Sản Phẩm" icon={GiFruitBowl} links={products} />

                      <NavItem title="Quản Lý Danh Mục" icon={BiSolidCategory} links={category} />
               
                      <NavItem title="Quản Lý Nhà SX" icon={BiSolidCategory} links={supplier} />
                      <NavItem title=" Quản Lý Hóa Đơn " icon={TbFileInvoice} links={Invoice} />
               
                      <NavItem title=" Blog " icon={FaBloggerB} links={Blog} />
                      <NavItem title=" Quản Lý Khách H" icon={RiCustomerService2Fill} links={Customer} />
               
                      {/* <NavItem title="Đánh giá" icon={BiConfused}  links={Customer} />              */}
                      <li>
                        <Link to={config.routes.ListComment} className="side-nav-link-ref">
                        <BiConfused className='iconReact' />
                        <span>Đánh giá</span>
                        </Link>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="is-parent has-arrow"
                          aria-expanded="false"
                        >
                          <i className="uil-book-alt" />
  
                          <span>Liên lạc</span>
                        </a>

                        <ul className="sub-menu mm-collapse" aria-expanded="false">
                          <li>
                            <a
                              href="/minible/vue/v-light/contacts/grid"
                              className="side-nav-link-ref"
                            >
                              User Grid
                            </a>
    
    
                          </li>
                          <li>
                            <a
                              href="/minible/vue/v-light/contacts/list"
                              className="side-nav-link-ref"
                            >
                              User List
                            </a>
    
    
                          </li>
                          <li>
                            <a
                              href="/minible/vue/v-light/contacts/profile"
                              className="side-nav-link-ref"
                            >
                              Profile
                            </a>
    
    
                          </li>
                        </ul>
                      </li>
                      <li className="menu-title">Pages</li>

                      <NavItem title="Xác thực" icon={RiCustomerService2Fill} links={Account} />

                      <li className="menu-title">Cài Đặt</li>
                 
                      <li>
                        <a
                          href="#"
                          className="is-parent has-arrow"
                          aria-expanded="false"
                        >
                          <i className="uil-flask" />
  
                          <span>Cài Đặt 1</span>
                        </a>
                     
                      </li>
                      <li>
                        <a
                          href="#"
                          className="is-parent has-dropdown"
                          aria-expanded="false"
                        >
                          <i className="uil-shutter-alt" />
                          <span className="badge rounded-pill bg-danger float-end">
                            8
                          </span>
                          <span>Cài Đặt 2</span>
                        </a>
                   
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: 250, height: 912 }}
          />
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: "none" }}
          />
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: 490,
              transform: "translate3d(0px, 0px, 0px)",
              display: "block"
            }}
          />
        </div>
      </div>
    </div>

  );
}

export default SidebarMenu;
