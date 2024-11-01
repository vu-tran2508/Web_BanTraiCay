import React, { useEffect, useState } from 'react';
import { Table, Pagination, Space, Modal } from 'antd';
import { AiOutlineStar, AiFillStar, AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import config from '../../config';
import { toast } from 'react-toastify';
import SupplierService from '../../services/SupplierService';
import { Link } from 'react-router-dom';

const TableListSupplier = () => {
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(3); // Số items trên mỗi trang mặc định
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3 });
    const [dataSource, setDataSource] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');



    const columns = [
        {
            title: 'Tên Nhà SX',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space size="middle">
                    <img
                        src={`http://localhost:8080/api/admin/customers/${record.logo}`}
                        alt={text}
                        title={text}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="rizzui-avatar-img inline-flex items-center justify-center flex-shrink-0 object-cover rounded-lg"
                        style={{ width: 48, height: 48, backgroundColor: "rgb(255, 71, 148)" }}
                    />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Quốc gia',
            dataIndex: 'nation',
            key: 'nation',
        },
        {
            title: 'SDT',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`${config.routes.EditSupplier.replace(':supplierId', record.supplierId)}`}>
                        <button className="borderBTN inline-flex h-7 w-7 items-center"> <MdEdit /> </button>
                    </Link>
                    <a href="#" style={{ paddingLeft: "10px" }}>
                        <button className="borderBTN inline-flex h-7 w-7 items-center" onClick={() => showDeleteConfirm(record.supplierId, record.name)}> <AiFillDelete /> </button>
                    </a>
                </Space>
            ),
        },
    ];

    const fetchData = async (page, pageSize) => {
        try {
            setLoading(true);
            const response = await SupplierService.getAllSuppliers();
            const data = response.map((item, index) => ({ ...item, key: index + 1 }));
            setDataSource(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination]);

    const handlePageChange = (page, pageSize) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    const handleDelete = async (supplierId) => {
        try {
            const response = await SupplierService.deleteSupplier(supplierId);
            console.log('Xóa nhà cung cấp thành công:', response);

            // Refresh dữ liệu sau khi xóa thành công
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            toast.error(error.response.data, { position: toast.POSITION.TOP_RIGHT });
            console.error(`Lỗi khi xóa nhà cung cấp có ID ${supplierId}:`, error);
        }
    };

    // Delete confirmation modal
    const showDeleteConfirm = (supplierId, supplierName) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa nhà cung cấp "${supplierName}"?`,
            onOk() {
                handleDelete(supplierId);
            },
            onCancel() {
                // Do nothing on cancel
            },
        });
    };
    const onPageChange = (page, pageSize) => {
        setPageSize(page);
    };


    return (
        <div>
            <div className="table-filter mb-4 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="input-group rounded">
                        <label htmlFor="" className="searchLabel">
                            <BsSearch />
                            <input type="search" className="form-search rounded" placeholder="Tìm kiếm bằng bất cứ thứ gì..." aria-label="Search" aria-describedby="search-addon" />
                        </label>

                    </div>

                </div>
                <div className="ms-4 flex flex-shrink-0 items-center">
                    <button
                        className="rizzui-button inline-flex font-medium items-center justify-center  transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent "
                        type="button"

                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="1.7"
                            viewBox="0 0 256 256"
                            className="me-1.5 h-[18px] w-[18px]"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z" />
                        </svg>
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>Bộ lọc</font>
                        </font>
                    </button>

                </div>
            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 'max-content' }}
                pagination={{
                    total: dataSource.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    defaultPageSize: pageSize,
                    pageSizeOptions: ['3', '5', '10', '20'], // Các tùy chọn cho số lượng items trên mỗi trang
                    showSizeChanger: true,
                    onChange: onPageChange,
                }}
            />
        </div>
    );
};

export default TableListSupplier;
