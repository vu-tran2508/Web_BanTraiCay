import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MultipleCarousel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../Product/ProductCard';// Import ProductCard component

export default function MultipleCarousel({ title, products }) {
  const settings = {
    dots: false,  // Ẩn chấm tròn đại diện cho các trang
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div id="product1" className="section-p1">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{title}</h2>
        <a href="#" style={{alignSelf:'flex-end'}} > All views</a>
      </div>

        <Slider {...settings} className='pro-container'>
          {products.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>

    
    </div>
  );
}