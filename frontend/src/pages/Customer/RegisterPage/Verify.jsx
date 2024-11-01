import React from 'react';
import VerifyForm from '../../../components/Auth/VerifyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LoginPage/Login.css'

const Verify = () => {
    return (

        <div className="layout-account" >
            <div className="containerLogin">
                <div className="wrapbox-content-account">
                    <div id="customer-login" className="customers_accountForm customer_login">
                        <div className="tab-form-account d-flex align-items-center justify-content-center">
                            <h4 className="active">
                                    <a style={{ fontWeight: '600',color: '#cacaca'}}>
                                        XÁC MINH TẢI KHOẢN
                                    </a>
                            </h4>
                           
                        </div>
                        <div id="Verify">
                            <div className="accounttype">
                                <h2 className="title" />
                            </div>
                            <VerifyForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Verify;