import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import SupplierService from '../../services/SupplierService';
import { useParams } from 'react-router-dom';

const EditSupplierForm = () => {
    const [form] = Form.useForm();
    const { supplierId } = useParams();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false); // Thêm state để xử lý trạng thái loading
    const [initialData, setInitialData] = useState({});
    const [Logo, setLogo] = useState(null); // Thêm state để xử lý trạng thái loading



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


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Gọi API để lấy chi tiết nhà cung cấp theo ID
                const supplierData = await SupplierService.getSupplierById(supplierId);

                // Lưu dữ liệu để sử dụng khi cập nhật
                setInitialData(supplierData);
                // Đổ dữ liệu từ API vào form
                form.setFieldsValue({
                    supplierName: supplierData.name,
                    Nation: supplierData.nation,
                    phone: supplierData.contactNumber,
                    address: supplierData.address,
                    description: supplierData.description,

                });
                setLogo(supplierData.logo);
                setLoading(false);
            } catch (error) {
                console.error(`Lỗi khi lấy chi tiết nhà cung cấp có ID ${supplierId}:`, error);
                setLoading(false);
            }
        };

        fetchData();
    }, [supplierId, form]);

    const onFinish = async (values) => {
        try {
            setLoading(true);

            // Thêm một số logic kiểm tra và xử lý giá trị trước khi gọi API cập nhật nhà cung cấp
            const updatedData = {
                name: values.supplierName,
                address: values.address,
                nation: values.Nation,
                contactNumber: values.phone,
                description: values.description,
                // Thêm các trường khác nếu cần
            };

            // Gọi hàm cập nhật nhà cung cấp
            await SupplierService.updateSupplier(supplierId, updatedData);


            // Gọi API để cập nhật logo nếu có thay đổi
            if (fileList.length > 0 && fileList[0].status === 'done') {
                const imageResponse = await SupplierService.addImageCustomer(supplierId, fileList[0]);
                console.log('Lưu ảnh thành công:', imageResponse);
            }


            message.success('Cập nhật nhà cung cấp thành công');

            setLoading(false);
        } catch (error) {
            // Hiển thị thông báo hoặc thực hiện các thao tác khác khi có lỗi
            message.error('Có lỗi khi cập nhật nhà cung cấp');
            console.error('Lỗi khi cập nhật nhà cung cấp:', error);

            setLoading(false);
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
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
                <Input placeholder="Nhập Địa Chỉ nhà sản xuất" />
            </Form.Item>

            <Form.Item
                label="Hình ảnh"
                extra="Tải lên thư viện hình ảnh Logo tại đây"
                name="images"
            >
                <Upload
                    customRequest={handleUploadClick}
                    onChange={handleFileChange}
                    fileList={fileList}
                    listType="picture-card"
                    onPreview={() => { }}
                >
                    {fileList.length > 0 ? (
                     <div>
                     <FaCloudUploadAlt />
                     <div style={{ marginTop: 8 }}>Tải lên</div>
                 </div>
                    ) : (
                       
                           <img
                           src={`http://localhost:8080/api/admin/customers/${Logo}`}
                           alt={Logo}
                           style={{ width: '100%', height: '100%' }}
                       />
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
                    Cấp nhật Nhà cung cấp
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditSupplierForm;
