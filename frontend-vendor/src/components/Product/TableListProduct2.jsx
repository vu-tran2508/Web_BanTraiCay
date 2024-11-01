import React, { useState, useEffect } from 'react';
import { Table, Space, Pagination, Select, Spin, Modal } from 'antd';
import { AiOutlineStar, AiFillStar, AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../redux/actions/product-action';
import { Link, NavLink } from 'react-router-dom';
import config from '../../config';
const { Option } = Select;

const TableListProduct = () => {
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(5); // Số items trên mỗi trang mặc định
    const { products = [], loading } = useSelector((state) => state.products);

    // Hàm fetchData để lấy dữ liệu sản phẩm
    const fetchData = async () => {
        await dispatch(fetchProducts());
    };

    // Hàm xử lý khi xóa sản phẩm
    const handleDelete = async (productId) => {
        try {
            await dispatch(deleteProduct(productId)); 
            // Làm mới dữ liệu sau khi xóa thành công
            fetchData();
        } catch (error) {
            console.error(`Lỗi khi xóa sản phẩm có ID ${productId}:`, error);
        }
    };

    useEffect(() => {
        // Gọi fetchData khi component được mount để lấy dữ liệu sản phẩm
        fetchData();
    }, [dispatch]);


    const handleLinkClick = (productId) => {
        window.location.href = "/admin/products/edit/" + productId;
    };
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space size="middle">
                    <img
                        src={`http://localhost:8080/api/admin/customers/${record.image}`}
                        alt={record.name}
                        title={record.name}
                        width={48}
                        height={48}
                        className="rizzui-avatar-img inline-flex items-center justify-center flex-shrink-0 object-cover rounded-lg"
                        style={{ width: 48, height: 48, backgroundColor: "rgb(255, 71, 148)" }}
                    />
                    <div className="grid gap-0.5">
                        <p className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                            {record.name}
                        </p>
                        <p className="text-[13px] text-gray-500"> {record.name}</p>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'viewCount',
            key: 'viewCount',
            render: (text, record) => (
                <span>{record.category ? record.category.name : ''}</span>
            ),
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'GIÁ',
            dataIndex: 'salePrice',
            key: 'salePrice',
        },
        {
            title: 'Thường Hiểu',
            dataIndex: 'commonUnderstanding',
            key: 'commonUnderstanding',
            render: (text, record) => (
                <span>{record.supplier ? record.supplier.nation : ''}</span>
            ),
        },
        // {
        //     title: 'XẾP HẠNG',
        //     dataIndex: 'rating',
        //     key: 'rating',
        //     render: (text, record) => (
        //         <div className="flex items-center">
        //             <span className="me-1 shrink-0">0</span>
        //             <AiOutlineStar style={{ color: "gold" }} />
        //             <AiOutlineStar style={{ color: "gold" }} />
        //             <AiOutlineStar style={{ color: "gold" }} />
        //             <AiOutlineStar style={{ color: "gold" }} />
        //             <AiOutlineStar style={{ color: "gold" }} />
        //             <span className="ms-1 shrink-0">(0)</span>
        //         </div>
        //     ),
        // },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case 1:
                        return 'Hàng Mới';
                    case 2:
                        return 'Sắp ra mắt';
                    case 3:
                        return 'Chỉ có sẵn ngoại tuyến';
                    default:
                        return '';
                }
            },
        },
        {
            title: 'HÀNH ĐỘNG',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex items-center">
                    <Link to={"/admin/products/edit/" + record.productId} className="flex items-center" onClick={() => handleLinkClick(record.productId)}>
                        <a href="#" style={{ paddingLeft: "10px" }}>
                            <button className="borderBTN inline-flex h-7 w-7 items-center"> <MdEdit /> </button>
                        </a>
                    </Link>
                    <a href="#" style={{ paddingLeft: "10px" }}>
                        <button className="borderBTN inline-flex h-7 w-7 items-center" onClick={() => showDeleteConfirm(record.productId, record.name)}> <AiFillDelete /> </button>
                    </a>
                </div>
            ),
        },
    ];


    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: products.length,
    });

    const handleChangePage = (page, pageSize) => {
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize,
        });
    };
    // Delete confirmation modal
    const showDeleteConfirm = (productId, name) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: (
                <p>{`Bạn có chắc chắn muốn xóa Sản phẩm "`}<strong style={{ color: 'red' }}>{name}</strong>{'"?'}</p>
            ),
            onOk() {
                handleDelete(productId);
            },
            onCancel() {
                // Do nothing on cancel
            },
            okText: 'Xóa',
            cancelText: 'Hủy',
        });
    };


    const reversedProducts = [...products].reverse();

    return (
        <Spin spinning={loading} size="large" tip="Loading...">
            <div>
                <Table
                    columns={columns}
                    dataSource={reversedProducts}  // Use the reversedProducts array
                    pagination={{
                        total: products.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        defaultPageSize: pageSize,
                        pageSizeOptions: ['3', '5', '10', '20'], // Các tùy chọn cho số lượng items trên mỗi trang
                        showSizeChanger: true,
                        onChange: handleChangePage,
                    }}

                />
            </div>
        </Spin>
    );
};

export default TableListProduct;
