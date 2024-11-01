// src/components/AddProducts/AddProducts.jsx
import {useState} from 'react';
import '../ProductPage/AddProducts.css';
import { BsSearch } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
// import config from '../../../config';
import TableListTag from '../../../components/TagPost/TableList';
import ModalAddPost from '../../../components/common/Modal/AddNewPost';

const ListTag = () => {
    const [isShowModalAddNew, setisShowModalAddNew ]= useState(false);

    const handleClose =() =>{
        setisShowModalAddNew(false);
    }
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0">
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}>Các Danh Mục</font>
                            </font>
                        </h4>
                        <div className="page-title-right">
                            <nav aria-label="vụn bánh mì" className="m-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a className="" href="#" target="_self">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                    Danh Mục
                                                </font>
                                            </font>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span aria-current="location">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                    Các Danh Mục
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
                                onClick={()=>setisShowModalAddNew(true)}

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
                                    <font style={{ verticalAlign: "inherit" }}>Thêm Tag</font>
                                </font>
                            </button>

                        </div>
                    </div>
                    {/* Phần Table  */}
                    <TableListTag />
                </div>

            </div>
            {/* Thêm các phần khác cho trang AddProducts tại đây */}
            <ModalAddPost
            show={isShowModalAddNew}
            handleClose ={handleClose}
            
            />
        </div>
    );
};

export default ListTag;
