
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import CategoryService from '../../services/CategoryService';



const FormEdit = ({ visible, onClose ,categoryId,load}) => {
  console.log("ID ",categoryId)
  const [form] = Form.useForm();

  const handleUpadteCategory = async () => {
    try {
      const values = await form.validateFields();
      await CategoryService.update({ ...values, categoryId });
      load()
      onClose()
      toast.success('Chỉnh sửa Danh Muc Thanh Công', { position: toast.POSITION.TOP_RIGHT });
 
    } catch (error) {
      toast.error('Xảy ra lỗi khi Chỉnh sửa Danh Muc', { position: toast.POSITION.TOP_RIGHT });
      console.error('Error saving category:', error);
    }
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const result = await CategoryService.get(categoryId);
        form.setFieldsValue(result.data);
      } catch (error) {
        console.error('Error loading category:', error);
      }
    };

    loadCategory();

  }, [categoryId, form]);

  return (
    <div>
      <Modal
        title="Chỉnh Sửa Danh Mục"
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} onFinish={handleUpadteCategory}>
          <Form.Item
            label="Tiêu đề"
            name="name"
            rules={[{ required: true, message: 'Tên là bắt buộc' }]}
          >
            <Input placeholder="Tiêu đề danh mục" />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Slug là bắt buộc' }]}
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

          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu Chỉnh Sửa
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormEdit;
