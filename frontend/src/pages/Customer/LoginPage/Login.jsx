import React from 'react';
import LoginForm from '../../../components/Auth/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import config from '../../../config';
import './Login.css'

const Login = () => {
    return (

        <div className="layout-account" >
            <div className="containerLogin">
                <div className="wrapbox-content-account">
                    <div id="customer-login" className="customers_accountForm customer_login">
                        <div className="tab-form-account d-flex align-items-center justify-content-center">
                            <h4 className="active">

                                <Link to={config.routes.Login}>
                                    <a style={{ fontWeight: 600 }}>
                                        Đăng nhập
                                    </a>
                                </Link>
                            </h4>
                            <h4 className="vz">
                                <Link to={config.routes.Register}>
                                    <a style={{ fontWeight: '600', color: '#cacaca' }}>
                                        Đăng ký
                                    </a>
                                </Link>
                            </h4>
                        </div>
                        <div id="login">
                            <div className="accounttype">
                                <h2 className="title" />
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Login;