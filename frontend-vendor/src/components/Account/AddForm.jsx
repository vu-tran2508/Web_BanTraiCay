import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddAccountModal = ({ visible, onCancel, onAddAccount }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        // onAddAccount({ ...values, image: fileList.map((file) => file.originFileObj) });
        onAddAccount({ values });
        setFileList([]); // Reset danh sách ảnh sau khi thêm thành công
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ được tải lên file JPG/PNG!');
    }
    return isJpgOrPng;
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );


  return (
    <Modal
      visible={visible}
      title="Thêm Tài Khoản"
      okText="Thêm"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true ,type: 'email', message: 'Email không hợp lệ!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
  label="Mật khẩu"
  name="password"
  rules={[
    { required: true, message: 'Vui lòng nhập mật khẩu!' },
    { type: 'string', min: 6, message: 'Mật khẩu phải chứa ít nhất 6 ký tự!' },
  ]}
>
  <Input.Password />
</Form.Item>


        <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
          <Select>
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            {/* Thêm các trạng thái khác nếu cần */}
          </Select>
        </Form.Item>

     
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
     

        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại !' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
