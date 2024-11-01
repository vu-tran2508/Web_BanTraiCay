import React, { useState } from 'react';
import { Form, Button, notification, Spin } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPForm = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        if (!otp) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập mã OTP.',
            });
            return;
        }

        const otpString = otp.join('').trim();  // Remove leading and trailing whitespaces
        console.log('OTP:',otpString);

        try {
            setLoading(true); // Set loading to true during the API call
            const response = await axios.get(`http://localhost:8080/api/user/verify/${otpString}`);
            console.log('API response:', response.data);
            localStorage.setItem('isOtpVerified', 'true');
            setLoading(false); // Set loading to false after the API call is complete

            notification.success({
                message: 'Thành Công',
                description: 'Xác nhận mã OTP Thành công.',
            });
            navigate('/account/information');
        } catch (error) {
            console.error('Lỗi khi gọi API để xác minh tài khoản.', error);
            setLoading(false); // Set loading to false in case of an error
            // Handle error, e.g., show an error notification
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi xác minh tài khoản. Vui lòng thử lại.',
            });
        }
    };

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    return (
        <Spin spinning={loading} tip="Đang xác minh...">
            <Form onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="otp"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mã OTP.' },
                    ]}
                >
                    <InputOTP
                        value={otp}
                        onChange={handleOtpChange}
                        style={{ fontSize: '18px', padding: '12px', width: '200px' }}
                        length={5}  // Set the length prop to 5
                    />
                </Form.Item>

                <Form.Item>
                    <div className="clearfix custommer_account_action">
                        <div className="action_bottom">
                            <Button type="primary" htmlType="submit" className='btnLogin'>
                                Xác nhận OTP
                            </Button>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default OTPForm;
