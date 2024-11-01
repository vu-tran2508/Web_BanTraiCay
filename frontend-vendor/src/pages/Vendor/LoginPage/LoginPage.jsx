import React from 'react';
import Logo from '../../../assets/images/Logo/LOGO2.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import LoginForm from '../../../components/Auth/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css'
import AuthService from '../../../services/AuthService';

const Login = () => {
  const hasPermission = () => {
    // Check the user's roles or permissions using your logic
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.accessToken) {
      return false;
    }
  
    const decodedToken = jwtDecode(currentUser.accessToken);
    if (!decodedToken || !(decodedToken.roles.includes('ROLE_STAFF') || decodedToken.roles.includes('ROLE_ADMIN'))) {
      return false;
    }
  
    return true;
  };
  
  if (hasPermission()) {
   
    return <Navigate to="/admin" />;
  }



  return (
    <main>
      <div className="vh-100">
        <div className="login-form-bx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-7 box-skew d-flex">
                <div className="authincation-content">
                  <div className="mb-4">
                    <h3 className="mb-1 font-w600">Chào mừng bạn đến Fruit FPT</h3>
                    <p className="">Đăng nhập bằng cách nhập thông tin bên dưới</p>
                  </div>
                  <LoginForm />
                  <div className="new-account mt-2">
                    <p className="mb-0">
                      Bạn chưa có tài khoản?{" "}
                      <a className="text-black" href="/admin/demo/page-register">
                        Đăng ký
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 d-flex box-skew1">
                <div className="inner-content align-self-center">
                  <a className="login-logo" href="admin/dashboard">

                    <img
                      src={Logo}
                      alt=""
                      className="logo-text ml-1 logo2"
                    />
                  </a>
                  <h2 className="m-b10 text-white">Đăng nhập vào bạn ngay bây giờ</h2>
                  <p className="m-b40 text-white">
                    Bạn có thể &amp; Đăng nhập bằng mạng xã hội
                  </p>
                  <ul className="social-icons mt-4">
                    <li>
                      <a href="admin/login">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="admin/login">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="admin/login">
                        <FaLinkedinIn />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </main>


  );
};

export default Login;
