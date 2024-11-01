
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo/LOGO.jpg';
import searchIcon from '../../../../assets/images/Logo/searchIcon.png';
import config from '../../../../config';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaRegHeart, FaRegUser, FaShoppingBasket, FaShoppingCart, FaSortDown } from 'react-icons/fa';
import { RiAccountCircleFill, RiLoginCircleLine } from 'react-icons/ri';
import './Header.css'

const Header = ({ toggleCart }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAppHeaderVisible, setAppHeaderVisible] = useState(true);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 1000; // Độ dài mà bạn muốn người dùng lướt chuột xuống trước khi ẩn app-header

        if (scrollPosition > scrollThreshold && isAppHeaderVisible) {
            setAppHeaderVisible(false);
        } else if (scrollPosition <= scrollThreshold && !isAppHeaderVisible) {
            setAppHeaderVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup: remove event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAppHeaderVisible]);
    const dropdownClasses = `dropdown-menu dropdown-menu-end dropdown-menu-arrow profile${isDropdownOpen ? '-open' : ''}`;
    return (
        <header>
            {isAppHeaderVisible && (
                <div className="app-header">
                    <div className="content-header row">
                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <div className="logo_sec">
                                <a href="/">
                                    <img src={Logo} alt="Logo" />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex">
                                <div className="col-lg-6 col-md-6 col-sm-6 px-3">
                                    <div className="search_sec">
                                        <div className="autocomplete-container">
                                            <div className="input-container">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Search"
                                                    className="ng-untouched ng-pristine ng-valid"
                                                />
                                                <div className="x">
                                                    <img src={searchIcon} alt="search icon" style={{ width: '20px', paddingBottom: '10px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 px-3">
                                    <div className="head-mobile">
                                        <div className="mob-icon">
                                            <BsTelephoneFill style={{ color: '#40b87b' }} />
                                        </div>
                                        <div className="mob-text">
                                            <div className="call-us">Call Us</div>
                                            <div className="mobile-num">
                                                <a href="tel:800 1 627538">800 1 627538</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 px-3">
                                    <div className="toolbar_sec">
                                        <div className="t5-icons text-center">
                                            <div className="language"> <a href="" style={{ fontSize: '14px', color: '#40b87b', textDecoration: 'underline' }}>English</a> </div>
                                        </div>
                                        <div className="t5-icons text-center">
                                            <div className="wishlist">
                                                <span>
                                                    <FaRegHeart className='fa-regular' />

                                                </span>
                                            </div>
                                            <p style={{ color: 'rgb(68, 68, 68)', fontSize: '15px', fontFamily: 'Tajawal', fontWeight: 700 }}></p>
                                        </div>
                                        <div className="t5-icons text-center nav-item dropdown">
                                            <FaRegUser aria-expanded={isDropdownOpen} onClick={handleDropdownToggle} />
                                            <ul className={dropdownClasses} >
                                                <li>
                                                    <a className="dropdown-profile d-flex align-items-center" href="users-profile.html">
                                                        <FaShoppingCart style={{ paddingRight: '5px', fontSize: '18px' }} />
                                                        <span> My Orders</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-profile d-flex align-items-center" href="login.html">
                                                        <RiAccountCircleFill style={{ paddingRight: '5px', fontSize: '18px' }} />
                                                        <span>My Account</span>
                                                    </a>
                                                </li>
                                                <Link to={config.routes.Login}>
                                                <li>
                                                    <a className="dropdown-profile d-flex align-items-center" href="pages-faq.html">
                                                        <RiLoginCircleLine style={{ paddingRight: '5px', fontSize: '18px' }} />
                                                        <span>Login</span>
                                                    </a>
                                                </li>
                                                 </Link>
                                            </ul>
                                        </div>
                                        <div className="t5-icons text-center">
                                            <FaShoppingBasket id="cart-icon" onClick={toggleCart} />
                                            <span className="badge rounded-pill badge-notification" style={{ position: 'absolute', fontSize: '.45em', backgroundColor: '#40b87b' }}>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container-full header-full">
                <div className="menu-header">
                    <div className="navbar navbar-light navbar-static-top navbar-expand-md">
                        <div className="navbar-collapse">
                            <ul>
                                <li>TRANG CHỦ</li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#4d4d4d' }}>
                                        HOA QUẢ <FaSortDown className='fa-caret-down' />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu_2" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Trái cây nhiệt đới & kỳ lạ</a>
                                        <a className="dropdown-item" href="#">cam quýt</a>
                                        <a className="dropdown-item" href="#">Quả hạch</a>
                                        <a className="dropdown-item" href="#">Táo</a>
                                        <a className="dropdown-item" href="#">chuối</a>
                                        <a className="dropdown-item" href="#">Quả nho</a>
                                        <a className="dropdown-item" href="#">Latin</a>
                                        <a className="dropdown-item" href="#">dưa</a>
                                        <a className="dropdown-item" href="#">Xoài</a>
                                    </div>
                                </li>
                                <Link to={config.routes.products_list}>
                                <li> RAU</li>
                                </Link>
        
                                <li> NƯỚC ÉP &CẮT LÁT  <FaSortDown className='fa-caret-down' /> </li>
                                <li> GIỎ QUÀ  <FaSortDown className='fa-caret-down' /> </li>
                                <li> BÀI VIẾT  <FaSortDown className='fa-caret-down' /> </li>
                                <li> LIÊN HỆ</li>
                                <li> CHÍNH SÁCH </li>
                                <li> VỀ CHUNG TÔI  <FaSortDown className='fa-caret-down' /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
