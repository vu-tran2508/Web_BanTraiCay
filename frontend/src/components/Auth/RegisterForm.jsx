import React, { useState } from 'react';
import { FaFacebookF, FaUserShield } from 'react-icons/fa';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { Spin, Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        if (!values.email) {
            console.log("Values is falsy");
            toast.error('Vui lòng nhập email !', { position: toast.POSITION.TOP_RIGHT });
            return;
        }
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const url = `http://localhost:8080/api/user/send/${values.email}`;
            const response = await axios.get(url);
            setLoading(false);
              // Save the email to local storage
            localStorage.setItem('RegisterEmail', values.email);
            navigate('/account/verify');
        } catch (error) {
            console.error('Lỗi khi gọi API để gửi mã xác nhận.', error);
            setLoading(false);
            // Handle error, e.g., show a notification
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi gửi mã xác nhận. Vui lòng thử lại.',
            });
        }
    };

    return (
        <Spin spinning={loading} tip="Đang gửi mã xác nhận...">
            <Form
                className="form-dang-ky"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
            >
                <div className="clearfix large_form large_form-mrb">
                    <label htmlFor="#" className="icon-field">
                        <FaUserShield />
                    </label>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập địa chỉ Email!' },
                            { type: 'email', message: 'Địa chỉ Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ Email" />
                    </Form.Item>
                </div>
                <div className="clearfix custommer_account_action">
                    <div className="action_bottom">
                        <Form.Item>
                            <Button
                                className="btnLogin"
                                type="primary"
                                htmlType="submit"
                            >
                                Gửi mã xác nhận
                            </Button>
                        </Form.Item>
                    </div>
                </div>
                <div className="btn-social" style={{ marginTop: 20 }}>
                    <button type="button" className="btsocialloginfb" id="btn-facebook-login">
                        <FaFacebookF /> Facebook
                    </button>
                    <button type="button" className="btsociallogingg" id="btn-google-login">
                        <AiOutlineGooglePlus /> Google
                    </button>
                </div>
            </Form>
        </Spin>
    );
};

export default RegisterForm;
