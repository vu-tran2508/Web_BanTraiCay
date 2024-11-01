import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './DefaultLayout.module.scss';
import ModelCart from '../../../pages/Customer/Cart/ModelCart';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {

    const [cartVisible, setCartVisible] = useState(false);

    const toggleCart = () => {
        setCartVisible(!cartVisible);
        console.log("cartVisible: ",!cartVisible)
    };

    return (
        <>
            <Header toggleCart={toggleCart}/>
            <div className={cx('content')}>{children}</div>
            {cartVisible && (
                <div id="cart-container">
                    <ModelCart toggleCart={toggleCart}/>
                </div>
            )}
         
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;