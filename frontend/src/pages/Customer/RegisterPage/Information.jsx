import React from 'react';
import RegistrationForm from '../../../components/Auth/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LoginPage/Login.css'

const Information = () => {
    return (

        <div className="layout-account" >
            <div className="containerLogin">
                <div className="wrapbox-content-account">
                    <div id="customer-login" className="customers_accountForm customer_login">
                        <div className="tab-form-account d-flex align-items-center justify-content-center">
                            <h4 className="active">
                                    <a style={{ fontWeight: '600',color: '#cacaca'}}>
                                       NHẬP THÔNG TIN TẠI KHOẢN
                                    </a>
                            </h4>
                           
                        </div>
                        <div id="Information">
                            <div className="accounttype">
                                <h2 className="title" />
                            </div>
                            <RegistrationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Information;