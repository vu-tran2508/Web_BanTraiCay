import React, { useEffect } from 'react';
import { Spin } from 'antd';
import Anh1 from '../../../assets/images/products/SP1.jpeg';
import Anh2 from '../../../assets/images/products/SP3.jpeg';
import Logo from '../../../assets/images/Logo/LogoGiamGia.png';
import MultipleCarousel from '../../../components/MultipleCarousel/MultipleCarousel';
import SliderComponent from '../../../components/Carousel/Carousel';
import ListCategoryComponent from '../../../components/ListCategory/ListCategory';
import SectionTopProduct from '../../../components/TopProduct/SectionTopProduct';
import BannerSection from '../../../components/Section/sectionImge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/actions/product-aciton';
import CategoryComponent from '../../../components/ListCategory/Category';
import LisItemCategory from '../../../components/ListCategory/LisItemCategory';

const Home = () => {
  const dispatch = useDispatch();

  const { Listproduct = [], loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };
    fetchData();
  }, [dispatch]);

  const topProducts = Listproduct.slice(0, 9);
  const firstCarouselProducts = Listproduct.slice(0, 6);
  const secondCarouselProducts = Listproduct.slice(6, 12);
  const thirdCarouselProducts = Listproduct.slice(12, 18);

  console.log("CART", cartItems);

  return (
    <div>
  
  
      
      {/* The rest of your component */}
      <SliderComponent />
      <CategoryComponent />
      <LisItemCategory />
      <MultipleCarousel products={firstCarouselProducts} />
      <MultipleCarousel products={secondCarouselProducts} />
      <MultipleCarousel products={thirdCarouselProducts} />
      <SectionTopProduct products={topProducts} />
      <BannerSection />
    </div>
  );
};

export default Home;
