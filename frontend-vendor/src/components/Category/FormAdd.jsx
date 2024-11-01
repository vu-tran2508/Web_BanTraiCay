import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/category-action';
import { Modal, Form, Input, Button } from 'antd';

const FormCategory = ({ visible, onClose ,load }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleSaveCategory = async () => {
    try {
      const values = await form.validateFields();
      dispatch(addCategory(values));
      load();
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Modal
      title="Thêm danh mục mới"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSaveCategory}
        initialValues={{
          name: '',
          slug: '',
          description: '',
        }}
      >
        {/* Form fields */}
        <Form.Item
          label="Tiêu đề"
          name="name"
          rules={[
            { required: true, message: 'Tên là bắt buộc' },
          ]}
        >
          <Input placeholder="Tiêu đề danh mục" />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: true, message: 'Slug là bắt buộc' },
          ]}
        >
          <Input placeholder="Slug danh mục" />
        </Form.Item>
        <Form.Item
          label="Mô tả Danh mục"
          name="description"
          rules={[
            { required: true, message: 'Description là bắt buộc' },
          ]}
        >
          <Input.TextArea placeholder="Mô tả danh mục" />
        </Form.Item>

        {/* Buttons */}
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Tạo Danh Mục
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormCategory;
