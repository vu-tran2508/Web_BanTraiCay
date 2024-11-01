import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './products-listing.css'
import SelectBox from '../../../components/ProductFilter/SelectBox';
import ProductFilter from '../../../components/ProductFilter';
import InfoProductList from '../../../components/Product/infoProductList';
import ProductService from '../../../services/ProductService';
import { Spin, Pagination } from 'antd'; // Import Spin from Ant Design
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Products_Listing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng sản phẩm trên mỗi trang
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [minPriceL, setMinPrice] = useState(null);
  const [maxPriceL, setMaxPrice] = useState(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let filteredProducts = [];

        if (selectedCategories.length > 0 || selectedSuppliers.length > 0 || minPriceL != null || maxPriceL != null) {
          // Nếu có ít nhất một trong hai selectedCategories hoặc selectedSuppliers có giá trị
          const params = {
            categoryIds: selectedCategories.join(','), // Convert the array to a comma-separated string
            supplierIds: selectedSuppliers.join(','), // Convert the array to a comma-separated string
            minPrice: minPriceL,
            maxPrice: maxPriceL,
          };
          const response = await ProductService.filterProducts(params);
          filteredProducts = response;
        } else {
          // Nếu cả hai đều không có giá trị, hiển thị tất cả sản phẩm
          const allProductsResponse = await ProductService.getAll();
          filteredProducts = allProductsResponse.data;
        }
        console.log("SP:", filteredProducts);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error loading products:', error);
        toast.error('Lỗi khi tải thông tin Sản phẩm !', { position: toast.POSITION.TOP_RIGHT });
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, selectedSuppliers, maxPriceL]);



  const handleCategoryCheckboxChange = (categoryId) => {
    setSelectedCategories(prevCategories => {
      const isSelected = prevCategories.includes(categoryId);

      if (isSelected) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  useEffect(() => {
    console.log("LOẠI SP : ", selectedCategories);
    console.log("NHÀ SẢN XUẤT : ", selectedSuppliers);
  }, [selectedCategories, selectedSuppliers]); // Sử dụng useEffect để theo dõi sự thay đổi của selectedCategories

  const handleSupplierCheckboxChange = (supplierId) => {
    const isSelected = selectedSuppliers.includes(supplierId);

    if (isSelected) {
      setSelectedSuppliers(selectedSuppliers.filter((id) => id !== supplierId));
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierId]);
    }
  };

  const handlePriceFilterChange = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    console.log("LỌC THEO GIÁ :", minPriceL, maxPriceL);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);


  return (
    <Spin spinning={loading} size="large" tip="Loading...">

      <div style={{ backgroundColor: ' rgb(255, 255, 255)', minWidth: '100vh' }}>
        <div className="page--body d-flex me-0">
          <div className="filterT2-container px-3">
            <div className="filters_full  pt-2">
              <div className="d-flex mt-lg-1 mt-xl-0">
                <div style={{ fontSize: "15px", float: "left", width: "60%", margin: "0", padding: "0", marginLeft: "auto", fontWeight: "800", color: "#000" }}>Lọc theo </div>
                <div style={{ margin: "auto", width: "40%", textAlign: "right" }}>
                  <button className="clear btn  ps-0 pe-0" style={{ outline: "0", margin: "0", padding: "0", boxShadow: "0", fontSize: "16px", textDecoration: "underline", color: "blue" }}> Làm mới </button>
                </div>
              </div>
              <ProductFilter
                selectedCategories={selectedCategories}
                selectedSuppliers={selectedSuppliers}
                onCategoryCheckboxChange={handleCategoryCheckboxChange}
                onSupplierCheckboxChange={handleSupplierCheckboxChange}
                onPriceFilterChange={handlePriceFilterChange}
              />


            </div>
          </div>
          <div className="cp_full_width mx-auto grid_layout">
            <section className="sortByStrip pt-2 mb-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <div className="showing-products"> Hiển thị {products.length} sản phẩm </div>

              <div className="sort-by-last">
                <span className="sort-span">Sắp xếp theo</span>
                <div className="d-none d-lg-flex align-items-center sortBy">
                  <SelectBox />
                </div>

              </div>
            </section>
            <div className="cp_full_width">
              <div className="row new-listing" style={{ width: "100%", margin: "0 auto", minHeight: "80vh" }}>
                <div style={{
                  display: "grid",
                  columnCount: 4,
                  gap: "0px",
                  padding: "0px",
                  margin: "0%",
                  gridTemplateColumns: "auto auto auto auto"
                }}>
                  {currentProducts.map(product => (
                    <InfoProductList key={product.id} product={product} />
                  ))}

                </div>

              </div>
              <div className="row" style={{ height: '50px', alignItems: 'center', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={products.length}
                  onChange={handlePageChange}
                />


              </div>


            </div>



          </div>


        </div>
      </div>

    </Spin>

  );

}

export default Products_Listing