import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Button, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import ImageUpload from './ImageUpload';
import { updateProfile,addImageCustomer } from '../../../services/Profile';
import { toast } from 'react-toastify';

const ProfileForm = () => {


  const [form] = Form.useForm();
  const [image, setImage] = useState(null); // State to store the image
  const [is, setIs] = useState(false); // State to store the image

  useEffect(() => {
    const storedUserData = localStorage.getItem("customer");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      form.setFieldsValue({
        customerId: parsedUserData.customerId || "",
        username: parsedUserData.username || "",
        fullname: parsedUserData.fullname || "",
        email: parsedUserData.email || "",
        phone: parsedUserData.phone || "",
        image: parsedUserData.image || "",
        gender: parsedUserData.gender || "",
        dateOfBirth: moment(parsedUserData.dateOfBirth) || null,
      });
      setImage(parsedUserData.image || null); // Set the image if available

    }
  }, [form]);

  const handleFinish = async  (values) => {
    try {
      const customerId = values.customerId; 
      const Profile = await updateProfile(customerId, values);
      console.log('Profile updated:', Profile);
      if(is){
        const addedImage = await addImageCustomer(customerId, image);
         console.log('Image added:', addedImage);
         console.log('Received values:', image);
        
      }
      localStorage.setItem("customer", JSON.stringify(Profile));
      toast.success('Cấp Nhật thông tin khách hàng thành công !!:',{ position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
      toast.error('Error updating profile:', error.message ,{ position: toast.POSITION.TOP_RIGHT });
    }
  };


  const handleImageChange = (newImage) => {
    setImage(newImage);
    setIs(true)
  };

  return (
    <div>
    <ImageUpload images={image} onImageChange={handleImageChange} />
    <Form form={form} onFinish={handleFinish} >
   
      <Row gutter={[16, 16]}>
         <Col md={24}>
          <Form.Item
            name="customerId"
            style={{ display: 'none' }} // or use "hidden" attribute
          >
            <Input />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label="username"
            name="username"
            className="contact-from-input mb-20"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input placeholder="username" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label="Họ Và Tên"
            name="fullname"
            className="contact-from-input mb-20"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder="Họ Và Tên" />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label="Email"
            name="email"
            className="contact-from-input mb-20"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input placeholder="Email" readOnly />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            className="contact-from-input mb-20"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {
                pattern: /^(\+\d{1,3}[- ]?)?(\d{10,})$/,
                message: 'Invalid phone number format',
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            className="contact-from-input mb-20"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please select your date of birth' }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>


        <Col md={12}>
          <Form.Item
            label="Giới tính"
            name="gender"
            className="z1"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Radio.Group>
              <Radio value="Male">Nữ</Radio>
              <Radio value="Female">Nam</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item className="cont-btn mb-20 mt-10">
            <Button type="primary" htmlType="submit" className="bd-bn__btn-1">
              Update Profile
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  );
};

export default ProfileForm;
