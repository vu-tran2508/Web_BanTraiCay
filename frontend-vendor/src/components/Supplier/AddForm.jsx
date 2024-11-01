import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import SupplierService from '../../services/SupplierService';

const AddSupplierForm = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleUploadClick = (options) => {
        const { file, onSuccess, onError } = options;

        // Giữ lại chỉ cho phép tải lên một ảnh
        setFileList([file]);

        // Simulate upload success
        setTimeout(() => {
            onSuccess();
        }, 1000);
    };

    const onFinish = async (values) => {
        try {
            // Thêm một số logic kiểm tra và xử lý giá trị trước khi gọi API tạo nhà cung cấp
            const formData = {
                name: values.supplierName,
                address: values.address,
                Nation:values.Nation,
                contactNumber: values.phone,
                description: values.description,
                // Thêm các trường khác nếu cần
            };

            // Gọi hàm tạo nhà cung cấp
            const newSupplier = await SupplierService.createSupplier(formData);
         
            console.log('Nhà cung cấp mới:', newSupplier);
            if (fileList && newSupplier !==null) {
                console.log('HÌNH ẢNH :', fileList[0]);
                const imageResponse = await SupplierService.addImageCustomer(newSupplier.supplierId, fileList[0]);
                console.log('Lưu ảnh thành công:', imageResponse);
            }

            // Reset form và danh sách file
            form.resetFields();
            setFileList([]);

        } catch (error) {
            // Hiển thị thông báo hoặc thực hiện các thao tác khác khi có lỗi
            toast.error(error.response.data, { position: toast.POSITION.TOP_RIGHT });
            console.error('Lỗi khi tạo nhà cung cấp:', error);
        }
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Form.Item
                label="Tên sản xuất"
                name="supplierName"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản xuất!' }]}
            >
                <Input placeholder="Tên sản xuất" />
            </Form.Item>

            <Form.Item
                label="Quốc gia"
                name="Nation"
                rules={[{ required: true, message: 'Vui lòng nhập quốc gia!' }]}
            >
                <Input placeholder="Quốc gia" />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
                ]}
            >
                <Input placeholder="Nhập số điện thoại công việc" />
            </Form.Item>



            <Form.Item
                label="Email"
                name="address"
                rules={[{ required: true,type: 'email', message: 'Vui lòng nhập địa chỉ!' }]}
            >
                <Input placeholder="Nhập Địa Chỉ nhà sản xuất" />
            </Form.Item>

            <Form.Item
                label="Hình ảnh"
                extra="Tải lên thư viện hình ảnh Logo  tại đây"
                name="images"
            >
                <Upload
                    customRequest={handleUploadClick}
                    onChange={handleFileChange}
                    fileList={fileList}
                    listType="picture-card"
                    onPreview={() => { }}
                >
                    {fileList.length === 0 && (
                        <div>
                            <FaCloudUploadAlt />
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item
                label="Mô tả Nhà Cung Cấp"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả nhà cung cấp!' }]}
            >
                <Input.TextArea rows={4} placeholder="Nhập mô tả nhà cung cấp" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button className='rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100' htmlType="submit">
                    Tạo Nhà cung cấp
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddSupplierForm;
