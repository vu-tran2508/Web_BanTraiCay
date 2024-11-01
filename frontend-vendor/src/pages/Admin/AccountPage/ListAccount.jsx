import React, { useEffect, useState } from 'react';
import '../../Vendor/ProductPage/AddProducts.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddAccountModal from '../../../components/Account/AddForm';
import { Table, Modal, Spin } from 'antd';
import { AiFillDelete } from 'react-icons/ai';

import AccountService from '../../../services/AccountService';

const ListAccount = () => {
    const [accounts, setAccount] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isModalAdd, setIsModalAdd] = useState(false);

    const showModalAdd = () => {
        setIsModalAdd(true);
    };

    const handleCancelAdd = () => {
        setIsModalAdd(false);
    };

    const handleAddAccount = async (values) => {
        const URL = 'http://localhost:8080/api/admin/accounts/add';
        try {
            const response = await axios.post(URL, values.values, { headers: { 'Content-Type': 'application/json' } });
            console.log("  TRANG THAI");  // Thêm dòng này
            toast.success('Thêm tài khoản thành công', { position: toast.POSITION.TOP_RIGHT });
            setIsModalAdd(false); // Ẩn modal sau khi thêm thành công
            fetchAccounts();
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            toast.error(error.response.data.message, { position: toast.POSITION.TOP_RIGHT });
        }
    };

    useEffect(() => {

        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const data = await AccountService.getAccountList();
            setAccount(data);

        } catch (error) {
            console.error('Error fetching account list:', error);
        } finally {
            setLoading(false);
        }
    };

    const showDeleteModal = (accountId) => {
        setCustomerToDelete(accountId);
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            if (customerToDelete !== null) {
                await AccountService.deleteAccount(customerToDelete);
                toast.success('Đã xoá thành công', { position: toast.POSITION.TOP_RIGHT });
                fetchAccounts();
            } else {
                console.log('KHÔNG TÌM THẤY ID');
            }
        } catch (error) {
            toast.error('Lỗi xóa tài khoản:', { position: toast.POSITION.TOP_RIGHT });
        } finally {
            setDeleteModalVisible(false);
        }
    };

    const hideDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'TÊN NHÂN VIÊN',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'SDT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'GIỚI TÍNH',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'NGÀY SINH',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'TRANG THÁI',
            dataIndex: 'status',
            key: 'status',

        },
        {
            title: 'HÀNH ĐỘNG',
            dataIndex: 'actions',
            render: (_, record) => (
                <div className="flex items-center">
                    {/* ... your existing buttons */}
                    <a href="#" style={{ paddingLeft: '10px' }}>
                        <button
                            className="borderBTN inline-flex h-7 w-7 items-center"
                            onClick={() => showDeleteModal(record.accountId)}
                        >
                            <AiFillDelete />
                        </button>
                    </a>
                </div>
            ),
        },
    ];

    const paginationOptions = {
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15'],
        onShowSizeChange: (_, newSize) => setPageSize(newSize),
    };





    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0">
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}>Các Nhân Viên</font>
                            </font>
                        </h4>
                        <div className="page-title-right">
                            <nav aria-label="vụn bánh mì" className="m-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a className="" href="#" target="_self">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                    Nhân Viên
                                                </font>
                                            </font>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span aria-current="location">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                    Các Nhân Viên
                                                </font>
                                            </font>
                                        </span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
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
                                onClick={showModalAdd}

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
                                    <font style={{ verticalAlign: "inherit" }}>Thêm Nhân Viên</font>
                                </font>
                            </button>

                        </div>
                    </div>
                    {/* Phần Table  */}
                    <AddAccountModal visible={isModalAdd} onCancel={handleCancelAdd} onAddAccount={handleAddAccount} />


                    <Spin spinning={loading} size="large" tip="Loading...">
                        <div>
                            <Table columns={columns} dataSource={accounts} rowKey="accountId" pagination={paginationOptions} />

                            {/* Delete Confirmation Modal */}
                            <Modal
                                title="Xác nhận Xóa"
                                visible={deleteModalVisible}
                                onOk={handleDelete}
                                onCancel={hideDeleteModal}
                            >
                                {customerToDelete && (
                                    <p>Bạn có chắc chắn muốn xóa khách hàng : <strong style={{ color: 'red' }}>{accounts.find(cust => cust.accountId === customerToDelete)?.fullname}</strong> này?</p>
                                )}
                            </Modal>
                        </div>
                    </Spin>


                </div>

            </div>
            {/* Thêm các phần khác cho trang AddProducts tại đây */}
        </div>
    );
};

export default ListAccount;
