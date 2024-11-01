import React, { useEffect, useState } from 'react';
import ShopByLineFilter from './ShopByLineFilter';
import ByLineFilterSupplier from './ByLineFilterSupplier';
import SupplierService from '../../services/SupplierService';
import CategoryService from '../../services/CategoryService';
import PriceFilter from './PriceFilter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductFilter  = ({
  selectedCategories,
  selectedSuppliers,
  onCategoryCheckboxChange,
  onSupplierCheckboxChange,
  onPriceFilterChange
}) => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const CategoriesData = await CategoryService.getAll();
        setCategories(CategoriesData.data);
        console.log(CategoriesData.data);
      } catch (error) {

        console.error('Error loading Categories:', error);
        toast.error('Lỗi khi tải thông tin Loại Sản Phẩm !', { position: toast.POSITION.TOP_RIGHT });
      }
    };
    const fetchSuppliers = async () => {
      try {
        const SuppliersData = await SupplierService.getAll();
        setSuppliers(SuppliersData.data);
        console.log(SuppliersData.data);
      } catch (error) {

        console.error('Error loading Categories:', error);
        toast.error('Lỗi khi tải thông tin Nhà sản xuất !', { position: toast.POSITION.TOP_RIGHT });
      }
    };
    fetchSuppliers();

    fetchCategories();
  }, []);


   
      const LineList = [
        { categoryId: 1, name: "30571071113" },
        { categoryId: 2, name: "Chiquita" },
        { categoryId: 3, name: "Sebastiano" },
        { categoryId: 4, name: "Vegetable Souk Fruits" },
        { categoryId: 5, name: "Vegetable Souk Vegetables" },
        { categoryId: 6, name: "Zespri" }
      ];


  return (
    <ul style={{ borderTop: "1px solid #d7d7d7" }} className="nav_filterT2">
        <ShopByLineFilter title ="Loại"
        onCheckboxChange={onCategoryCheckboxChange}
        selectedItems={selectedCategories}
        List={categories} value={1}/>
        <ShopByLineFilter title="SHOP BY LINE" List={LineList} value={0}/>
        
        <ByLineFilterSupplier title ="Nhà Cùng cấp" List ={suppliers} 
        onCheckboxChange={onSupplierCheckboxChange}
        selectedItems={selectedSuppliers}
        value={1}/>

        <PriceFilter onFilterChange={onPriceFilterChange} />
    </ul>

  );
  
};

export default ProductFilter ;
