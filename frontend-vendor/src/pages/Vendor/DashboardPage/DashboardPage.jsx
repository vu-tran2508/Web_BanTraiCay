import React, { useState, useEffect } from 'react';
import ColumnPlot from './ColumnPlot';
import PieChart from './PieChart';
import axios from 'axios'; // Import axios hoặc thư viện HTTP client bạn sử dụng
import './DashboardPage.css';

const DashboardPage = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/statistics/total-revenue');
        setTotalRevenue(response);


        const response2 = await axios.get('http://localhost:8080/api/admin/statistics/total-order');
        setTotalOrders(response2);


        const response3 = await axios.get('http://localhost:8080/api/admin/statistics/total-Custoemr');
        setTotalCustomers(response3);

        const response4 = await axios.get('http://localhost:8080/api/admin/statistics/total-product');
        setTotalProducts(response4);

        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const formattedTotalRevenue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalRevenue);


  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0">Dashboard</h4>
          <div className="page-title-right">
            <nav aria-label="breadcrumb" className="m-0">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a className="" href="#">
                    Minible
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  <span>Dashboard</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="float-end mt-2">
              <img src="images/h7.png" alt="" />
            </div>
            <div>
              <h4 className="mb-1 mt-1">
                {" "}
                {" "}
                <span data-plugin="counterup">
                  <span>{formattedTotalRevenue}</span>
                </span>
              </h4>
              <p className="text-muted mb-0">Tổng doanh thu</p>
            </div>
            {/* <p className="text-muted mt-3 mb-0">
              <i className="bi bi-arrow-up" style={{ color: "#28a745" }} />
              &nbsp;<span className="text-success me-1">2.65%</span> từ
              tuần trước
            </p> */}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="float-end mt-2">
              <img src="images/h6.png" alt="" />
            </div>
            <div>
              <h4 className="mb-1 mt-1">
                <span data-plugin="counterup">
                  <span>{totalOrders}</span>
                </span>
              </h4>
              <p className="text-muted mb-0">Đơn đặt hàng</p>
            </div>
            {/* <p className="text-muted mt-3 mb-0">
              <i className="bi bi-arrow-down" style={{ color: "#dc3545" }} />
              &nbsp;
              <span className="text-danger me-1">0.82%</span> kể từ tuần trước
            </p> */}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="float-end mt-2">
              <img src="images/h5.png" alt="" />
            </div>
            <div>
              <h4 className="mb-1 mt-1">
                <span data-plugin="counterup">
                  <span>{totalCustomers}</span>
                </span>
              </h4>
              <p className="text-muted mb-0">Khách hàng</p>
            </div>
            {/* <p className="text-muted mt-3 mb-0">
              <i className="bi bi-arrow-down" style={{ color: "#dc3545" }} />
              &nbsp;<span className="text-danger me-1">6.24%</span> kể từ tuần trước
            </p> */}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="float-end mt-2">
              <img src="images/h8.png" alt="" />
            </div>
            <div>
              <h4 className="mb-1 mt-1">
                {" "}
                 <span data-plugin="counterup">{totalProducts}</span>
              </h4>
              <p className="text-muted mb-0">Sản Phẩm</p>
            </div>
            {/* <p className="text-muted mt-3 mb-0">
              <i className="bi bi-arrow-up" style={{ color: "#28a745" }} />
              &nbsp;<span className="text-success me-1">10.51%</span> since
              last week
            </p> */}
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-8">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Doanh thu trong năm</h4>
            <ColumnPlot/>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Top Loại sản phẩm</h4>
            <PieChart/>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Đơn Hàng Chở Xác Nhận</h4>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DashboardPage;
