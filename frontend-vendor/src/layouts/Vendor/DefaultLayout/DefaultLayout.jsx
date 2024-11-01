import PropTypes from 'prop-types';
import React from "react";
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import SidebarMenu from '../components/Sidebar-Menu/SidebarMenu';
import Header from '../components/Header/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {


    return (
        <div id='layout-wrapper'>
            <Header />
            <SidebarMenu />


            {/*  */}
            <div className={cx('main-content')}>
                <div className={cx('page-content')}>
                    <div className={cx('container-fluid')}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;