import React from 'react';
import RegisterForm from '../../../components/Auth/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LoginPage/Login.css'
import { Link } from 'react-router-dom';
import config from '../../../config';
const Register = () => {
    return (

        <div className="layout-account" >
            <div className="containerLogin">
                <div className="wrapbox-content-account">
                    <div id="customer-login" className="customers_accountForm customer_login">
                        <div className="tab-form-account d-flex align-items-center justify-content-center">
                            <h4 className="active">

                                <Link to={config.routes.Login}>
                                    <a style={{ fontWeight: '600',color: '#cacaca'}}>
                                        Đăng nhập
                                    </a>
                                </Link>
                            </h4>
                            <h4 className="vz">
                                <Link to={config.routes.Register}>
                                    <a style={{ fontWeight: '600' ,color:'black'}}>
                                        Đăng ký
                                    </a>
                                </Link>
                            </h4>
                        </div>
                        <div id="Register">
                            <div className="accounttype">
                                <h2 className="title" />
                            </div>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Register;