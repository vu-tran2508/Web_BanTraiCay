import React, { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd'; // Import the Spin component
import { login } from '../../redux/actions/auth-action';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Vui lòng nhập email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    const user = {
      email,
      password,
    };

    try {
      await dispatch(login(user, navigate));
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
        <Spin spinning={loading} tip="Đang xử lý...">
        <form
            acceptCharset="UTF-8"
            action="#"
            id="#"
            method="post"
            style={{ fontWeight: 400 }}
        >
            <div className="clearfix large_form">
                <label className="icon-field">
                    <i className="icon-login icon-envelope " />
                </label>
                <input required="" type="text" defaultValue=""
                 name="email" id="#" placeholder="Vui lòng nhập email"
                 className={`text ${emailError && 'is-invalid'}`}
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} 
                />
                {emailError && <span className="invalid-feedback">{emailError}</span>}
            </div>
            <div className="clearfix large_form large_form-mrb">
                <label className="icon-field">
                    <i className="icon-login icon-shield" />
                </label>
                <input required=""type="password" defaultValue="" name="#"
                 id="#" placeholder="Vui lòng nhập mật khẩu" 
                 className={`text ${passwordError && 'is-invalid'}`}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
             {passwordError && <span className="invalid-feedback">{passwordError}</span>}
            </div>
            <div className="clearfix large_form sitebox-recaptcha ">
                This site is protected by reCAPTCHA and the Google
                <a  target="_blank" rel="noreferrer">
                    Privacy Policy
                </a>
                and{" "}
                <a  target="_blank" rel="noreferrer">
                    Terms of Service
                </a>{" "}
                apply.
            </div>
            <div className="clearfix custommer_account_action">
                <div
                    className="action_bottom">
                        <button className="btnLogin" type="submit" defaultValue="Đăng nhập" onClick={handleSubmit} >Đăng nhập</button>
                    
                </div>
                <div className="req_pass">
                    <p style={{ marginBottom: 0 }}>
                        Bạn chưa có tài khoản?
                        <a   title="Quên mật khẩu">
                            Quên mật khẩu?
                        </a>
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        Bạn quên mật khẩu?
                    <a  title="Đăng ký">{" "} Đăng ký</a>
                    </p>
                </div>
            </div>
            <div className="btn-social" style={{ marginTop: 20 }}>
                <button type="button" className="btsocialloginfb" id="btn-facebook-login">
                  <FaFacebookF/> Facebook
                </button>
                <button type="button" className="btsociallogingg" id="btn-google-login">
                    <AiOutlineGooglePlus/> Google
                </button>
            </div>
        </form>
        </Spin>


    );
};
export default LoginForm; 