// src/components/AddProducts/AddProducts.jsx
import React from 'react';
import '../ProductPage/AddProducts.css';
import AddSupplierForm from '../../../components/Supplier/AddForm';


const AddSupplier = () => {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0">
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}>Tạo nhà cung cấp</font>
                            </font>
                        </h4>
                        <div className="page-title-right">
                            <nav aria-label="vụn bánh mì" className="m-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a className="" href="#" target="_self">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                Nhà cung cấp
                                                </font>
                                            </font>
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span aria-current="location">
                                            <font style={{ verticalAlign: "inherit" }}>
                                                <font style={{ verticalAlign: "inherit" }}>
                                                    Thêm Mới
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
                    <AddSupplierForm/>
          
                  



                    {/*  */}

                    {/*  */}

                </div>

            </div>
            {/* Thêm các phần khác cho trang AddSupplier tại đây */}
        </div>
    );
};

export default AddSupplier;
