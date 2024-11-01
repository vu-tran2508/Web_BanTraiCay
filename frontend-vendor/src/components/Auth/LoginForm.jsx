import React, { useState } from 'react';
import { login } from '../../redux/actions/auth-action';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd'; // Import the Spin component
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mb-2 ">
            <strong className="">Email</strong>
          </label>
          <input
            type="email"
            className={`form-control ${emailError && 'is-invalid'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         
           
          />
           {emailError && <span className="invalid-feedback">{emailError}</span>}
        </div>
        <div className="form-group">
          <label className="mb-2 ">
            <strong className="">Password</strong>
          </label>
          <input
            type="password"
            className={`form-control ${passwordError && 'is-invalid'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          
          />
          {passwordError && <span className="invalid-feedback">{passwordError}</span>}
        </div>
        <div className="form-row d-flex justify-content-between mt-4 mb-2">
          <div className="form-group">
            <div className="custom-control custom-checkbox ml-1 ">
              <input
                type="checkbox"
                className="form-check-input"
                id="basic_checkbox_1"
              />
              <label
                className="form-check-label"
                htmlFor="basic_checkbox_1"
              >
                Ghi nhớ tôi
              </label>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btnLogin btn-primary btn-block"
          >
            Sign In
          </button>
        </div>
      </form>
      </Spin>

    );
};


export default LoginForm;