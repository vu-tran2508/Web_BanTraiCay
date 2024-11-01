import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, notification, Spin, DatePicker, Select } from 'antd';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const initialEmail = localStorage.getItem('RegisterEmail');

  const navigate = useNavigate();
  const { Option } = Select;

  useEffect(() => {
    // Kiểm tra xem người dùng đã nhập OTP chưa
    const isOtpVerified = localStorage.getItem('isOtpVerified');

    if (!isOtpVerified) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn phải xác minh tải khoản',
      });
      // Nếu chưa nhập OTP, chuyển hướng về trang khác hoặc thực hiện các xử lý khác
      navigate('/account/register');

    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values)
    try {
      const response = await AuthService.register(values);

      notification.success({
        message: 'Thành Công',
        description: 'Đăng ký thành công.',
      });
      setLoading(false);
      localStorage.removeItem('isOtpVerified');
      localStorage.removeItem('RegisterEmail');

      // Chuyển hướng
      navigate('/account/login');
    } catch (error) {
      setLoading(false);
      console.error('Lỗi không mong muốn xảy ra trong quá trình đăng ký:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.',
      });
    }
  };

  console.log("Email", initialEmail)
  return (
    <Spin spinning={loading} tip="Đang đăng ký tải khoản...">
      <Form
        name="form_dang_ky"
        className="form-dang-ky"
        initialValues={{ remember: true, email: initialEmail }}
        onFinish={onFinish}
      >
        <Form.Item name="email">
          <Input placeholder="Email" defaultValue={initialEmail} readOnly />
        </Form.Item>


        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập Mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập Tên đăng nhập!' }]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập Số điện thoại!' },
            {
              pattern: /^[0-9]{10,11}$/,
              message: 'Số điện thoại không hợp lệ. Vui lòng nhập từ 10 đến 11 chữ số.',
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn Giới tính!' }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          rules={[{ required: true, message: 'Vui lòng chọn Ngày sinh!' }]}
        >
          <DatePicker placeholder="Chọn ngày sinh" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ đăng nhập</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className="clearfix custommer_account_action">
            <div className="action_bottom">
              <Button type="primary" htmlType="submit" className='btnLogin'>
                Hoàn Thành
              </Button>
            </div>
          </div>

        </Form.Item>
      </Form>
    </Spin>
  );
};

export default RegistrationForm;
