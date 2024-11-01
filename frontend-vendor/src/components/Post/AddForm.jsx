import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS
import { jwtDecode } from "jwt-decode";
import PostService from '../../services/PostService';
import { fetchTags } from '../../redux/actions/tag-action';
import { useDispatch, useSelector } from 'react-redux';
const { TextArea } = Input;
const { Option } = Select;

const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';

const AddPostForm = () => {
    const [tags, setTags] = useState([]);
    const [form] = Form.useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const [emailAccount, setEmailAccount] = useState(null);
    const [postContent, setPostContent] = useState('');
    const tagsData = useSelector((state) => state.tags); // 
    const fetchedTags = tagsData.tags || []; // Change the name here

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTags());
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        setTags(fetchedTags); // Update the state with the fetchedTags
        console.log("Data : ", tags)
    }, [fetchedTags]);


    useEffect(() => {
        // Lấy AccessToken từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            // Giải mã token để lấy thông tin
            const decodedToken = jwtDecode(user.accessToken);
            // Kiểm tra quyền và lấy AccountId
            if (decodedToken.roles.includes('ROLE_STAFF') || decodedToken.roles.includes('ROLE_ADMIN')) {
                setEmailAccount(decodedToken.sub);
            } else {

                message.error('Bạn không có quyền truy cập!');
            }
        } else {
            // AccessToken không tồn tại, xử lý tùy theo yêu cầu của bạn
            // Ví dụ: chuyển hướng hoặc hiển thị thông báo
            message.error('Vui lòng đăng nhập!');
        }
    }, []);

    const handleQuillChange = (content) => {
        setPostContent(content);
    };

    const handleSubmit = async (values) => {
        try {
            // Kiểm tra dữ liệu trước khi submit
            if (!values.name || !values.tag_id || !values.status || !values.description) {
                message.error('Vui lòng điền đầy đủ thông tin');
                return;
            }
    
            // Prepare post data
            const postData = {
                name: values.name,
                tagId: values.tag_id,
                metaKeywords: values.metaKeywords,
                metaDescription: values.metaDescription,
                status: values.status,
                description: postContent,
                emailAccount: emailAccount,
            };
    
            // Gọi API để tạo bài đăng mới
            const response = await PostService.createPost(postData);
    
            // Hiển thị dữ liệu trong console
            console.log('Dữ liệu từ form và ReactQuill:', response);
    
            // Thông báo thành công nếu cần
            message.success('Đã lưu thành công!');
    
            // Check if an image is selected
            if (selectedImage) {
                // Gọi API để thêm ảnh cho bài đăng
                const imageResponse = await PostService.addImageCustomer(response.postId, selectedImage);
                console.log('Lưu ảnh thành công:', imageResponse);
                setSelectedImage(null)
            }
            form.resetFields();
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error('Lỗi khi tạo bài đăng:', error);
            message.error('Đã xảy ra lỗi khi tạo bài đăng.');
        }
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Set the selected image
            setSelectedImage(file);
            message.success(`${file.name} selected successfully.`);
        }
        console.log("Hình Ảnh ",selectedImage)
    };



    const modules = {
        toolbar: [
            [{ align: [] }],
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            ['table'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'script',
        'indent',
        'color',
        'background',
        'clean',
        'table',
    ];

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
        >
            <div className="row">
                <div className="col-span-full col-sm-4">
                    <h4 className="text-base font-medium">Bản tóm tắt</h4>
                    <p className="mt-2">
                        Chỉnh sửa mô tả bài viết của bạn và thông tin cần thiết từ đây
                    </p>
                </div>
                <div className="col-sm-8">
                    <Form.Item
                        label="Tiêu đề"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề sản phẩm' }]}
                    >
                        <Input placeholder="Tiêu đề sản phẩm" />
                    </Form.Item>
                    <Form.Item
                        label="Loại Bài viết"
                        name="tag_id"
                        rules={[{ required: true, message: 'Vui lòng chọn loại bài viết' }]}
                    >
                        <Select placeholder="Lựa chọn">
                            {tags.map(tag => (
                                <Option key={tag.tag_id} value={tag.id}>
                                    {tag.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Trang Thái"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                    >
                        <Select placeholder="Lựa chọn">
                            <Option value={ACTIVE}>ACTIVE</Option>
                            <Option value={INACTIVE}>INACTIVE</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề"
                        name="metaKeywords"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề metaKeywords' }]}
                    >
                        <Input placeholder="Tiêu đề metaKeywords" />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="metaDescription"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung meta Description' }]}
                    >
                        <TextArea rows={4} placeholder="Nội dung  meta Description" />
                    </Form.Item>
                    <Form.Item label="Tải ảnh lên" name="selectedImage">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            ref={(input) => input && (input.value = null)} // Reset the input value for consecutive selections
                        />
                        <Button
                            type="button"
                            onClick={() => document.querySelector('input[type="file"]').click()}
                        >
                            <UploadOutlined /> Chọn ảnh
                        </Button>
                        {selectedImage && (
                            <Image
                                src={URL.createObjectURL(selectedImage)}
                                alt="Ảnh đại diện"
                                style={{ width: '200px', height: '200px' }}
                            />

                        )}
                    </Form.Item>

                </div>

            </div>

            <div className='row' style={{ height: '800px' }}>
                <div style={{ paddingLeft: '20px', paddingBottom: '10px' }}>
                    <table>Nội dung bài viết *</table>
                </div>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
                >
                    <ReactQuill
                        style={{ textAlign: 'center', margin: '0 auto', width: '1130px', height: '740px' }}
                        value={postContent}
                        onChange={handleQuillChange}
                        modules={modules}
                        formats={formats}
                    />
                </Form.Item>
            </div>

            {/* ... (giữ nguyên phần code tiếp theo) ... */}
            <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4">
                <Button
                    type="button"
                >
                    Lưu dưới dạng bản nháp
                </Button>
                <Button
                    type="submit"

                    onClick={() => form.submit()}
                >
                    Tạo Bài Viết
                </Button>
            </div>
        </Form>
    );
};

export default AddPostForm;
