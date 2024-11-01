
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo/LOGO.jpg';
import config from '../../../../config';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaRegHeart, FaRegUser, FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { RiAccountCircleFill, RiLoginCircleLine } from 'react-icons/ri';
import { AutoComplete, Input, Menu, Select, Dropdown } from 'antd';
import ProductService from '../../../../services/ProductService';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../redux/actions/auth-action';
import MenuHeaderComponent from '../../../../components/Menu/menuHeader';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;


const Header = ({ toggleCart }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAppHeaderVisible, setAppHeaderVisible] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    // SỐ ITEM TRONG GIỎ HÀNG 
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 700; // Độ dài mà bạn muốn người dùng lướt chuột xuống trước khi ẩn app-header

        if (scrollPosition > scrollThreshold && isAppHeaderVisible) {
            setAppHeaderVisible(false);
        } else if (scrollPosition <= scrollThreshold && !isAppHeaderVisible) {
            setAppHeaderVisible(true);
        }
    };
    const customerData = JSON.parse(localStorage.getItem('customer'));
    const getImage = () => {
        if (customerData && customerData.image) {
            return customerData.image;
        }
        return "";
    };
    const getUsername = () => {
        if (customerData) {
            return customerData.customerId;
        }
        return "";
    };
    const username= getUsername();
    const Avata = getImage();
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 70000;

            if (scrollPosition > scrollThreshold && isAppHeaderVisible) {
                setAppHeaderVisible(false);
            } else if (scrollPosition <= scrollThreshold && !isAppHeaderVisible) {
                setAppHeaderVisible(true);
            }

        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup: remove event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAppHeaderVisible]);

    const handleLogout = () => {
        dispatch(logout(navigate));

    };



    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const isAvata= !!Avata; // Check if the username exists

    const isLogin= !!username; // Check if the username exists

    const dropdownClasses = `dropdown-menu dropdown-menu-end dropdown-menu-arrow profile${isDropdownOpen ? '-open' : ''}`;

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);

    const handleSearch = async (value) => {
        try {
            if (value.length >= 1) {
                const response = await ProductService.finby(value);
                setOptions(response.data.map(option => ({
                    value: option.name,
                    label: (
                        <div className="search-option" style={{ alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd', transition: 'background 0.3s' }}>
                            <img src={`http://localhost:8080/api/home/image/${option.image}`} alt={option.name} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }} />
                            <span style={{ marginRight: '10px' }}>{option.name}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <span style={{ marginLeft: '40px', fontSize: '13px', color: '#808080' }}>Nhà sản xuất :  {option.supplier.nation}</span>
                                <span style={{ marginLeft: '40px', fontSize: '16px' }}>Giá {option.salePrice}</span>
                            </div>
                        </div>
                    ),
                    product: option,
                })));
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSelect = (value, option) => {
        setSelectedOption(option);
        navigate(`/products/details/${option.product.productId}`);
    };

    const handleBlur = () => {
        // Khi AutoComplete mất focus, kiểm tra nếu một option đã được chọn thì chuyển đến trang
        if (selectedOption) {
            navigate(`/products/details/${selectedOption.product.productId}`);
        }
        // Đặt lại trạng thái của AutoComplete
        setAutoCompleteVisible(false);
    };
    const menu = (
        <Menu>
            {isLogin? (
                <>
                    <Menu.Item>
                        <Link to={config.routes.Profile}>
                            <a className="dropdown-profile d-flex align-items-center">
                                <FaShoppingCart style={{ paddingRight: '5px', fontSize: '18px' }} />
                                <span> Đơn hàng của tôi</span>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={config.routes.Profile}>
                            <a className="dropdown-profile d-flex align-items-center">
                                <RiAccountCircleFill style={{ paddingRight: '5px', fontSize: '18px' }} />
                                <span>Tài khoản của tôi</span>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a className="dropdown-profile d-flex align-items-center" onClick={handleLogout}>
                            <RiLoginCircleLine style={{ paddingRight: '5px', fontSize: '18px' }} />
                            <span>Đăng xuất</span>
                        </a>
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item>
                    <Link to={config.routes.Login}>
                        <a className="dropdown-profile d-flex align-items-center">
                            <RiLoginCircleLine style={{ paddingRight: '5px', fontSize: '18px' }} />
                            <span>Đăng nhập</span>
                        </a>
                    </Link>
                </Menu.Item>
            )}
        </Menu>
    );
    return (
        <header>
            {isAppHeaderVisible && (
                <div className="app-header">
                    <div className="content-header row">

                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <div className="logo_sec">

                                <Link to={config.routes.home}>
                                    <img src={Logo} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex">
                                <div className="col-lg-6 col-md-6 col-sm-6 px-3">
                                    <div className="search_sec">

                                        <AutoComplete
                                            popupMatchSelectWidth="100%"
                                            className="autocomplete-container"
                                            options={options}
                                            onSelect={onSelect}
                                            onSearch={handleSearch}
                                            size="large"
                                            notFoundContent={
                                                <div style={{ textAlign: 'center', padding: '8px' }}>
                                                    Không tìm thấy kết quả
                                                </div>
                                            }
                                            onBlur={handleBlur}
                                            dropdownVisible={autoCompleteVisible}
                                            onDropdownVisibleChange={(visible) => setAutoCompleteVisible(visible)}
                                        >
                                            <div className="input-container">
                                                <Input.Search
                                                    size="large"
                                                    placeholder="Tìm sản phẩm"
                                                    enterButton
                                                />
                                            </div>
                                        </AutoComplete>

                                    </div>
                                </div>
                                <div className="col-md-2 px-3">
                                    <div className="head-mobile">
                                        <div className="mob-icon">
                                            <BsTelephoneFill style={{ color: '#40b87b' }} />
                                        </div>
                                        <div className="mob-text">
                                            <span className="call-us">Gọi</span>
                                            <div className="mobile-num">
                                                <a href="tel:800 1 627538">800 1 627538</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="toolbar_sec">
                                        <div className="t5-icons text-center">
                                            <div className="language"> <a href="" style={{ fontSize: '14px', color: '#40b87b', textDecoration: 'underline' }}>TiếngAnh</a> </div>
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
                                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                                    <FaRegUser />

                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="t5-icons text-center ">
                                            <FaShoppingBasket id="cart-icon" onClick={toggleCart} />
                                            {itemCount > 0 && (
                                                <span className="badge rounded-pill badge-notification" style={{ position: 'absolute', fontSize: '.45em', backgroundColor: '#40b87b' }}>
                                                    {itemCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 px-3 pt-3">
                                    {Avata && (
                                        <div style={{ height: '40px', width: '40px' }}>
                                            <img
                                                style={{ height: '40px', width: '40px', borderRadius: '8px' }}
                                                src={`http://localhost:8080/api/home/image/${Avata}`}
                                                alt=""
                                            />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container-full header-full">
                {/*  */}
                <MenuHeaderComponent />

            </div>
        </header>
    );
};

export default Header;
