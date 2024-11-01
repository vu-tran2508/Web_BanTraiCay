import React from 'react';
import './Listcategory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cate  from '../../assets/images/LogoCategory/Cate.webp';
import hinh1 from '../../assets/images/LogoCategory/diet-foods.webp';
import hinh2 from '../../assets/images/LogoCategory/fresh-vegetables.webp';
import hinh3 from '../../assets/images/LogoCategory/fruits-items.webp';
import hinh4 from '../../assets/images/LogoCategory/green-vegetables.webp';
import hinh5 from '../../assets/images/LogoCategory/grocery-items.webp';
import hinh6 from '../../assets/images/LogoCategory/healthy-foods.png';
import hinh7 from '../../assets/images/LogoCategory/quality-milk.webp';
import hinh8 from '../../assets/images/LogoCategory/diet-nutrition.webp';
import hinh9 from '../../assets/images/LogoCategory/cold-drinks.png';
import hinh10 from '../../assets/images/LogoCategory/grocery-items.webp';
import hinh11 from '../../assets/images/LogoCategory/healthy-foods.png';
import hinh12 from '../../assets/images/LogoCategory/quality-milk.webp';
import hinh13 from '../../assets/images/LogoCategory/diet-nutrition.webp';
import hinh14 from '../../assets/images/LogoCategory/cold-drinks.png';
import hinh15 from '../../assets/images/LogoCategory/diet-nutrition.webp';
import hinh16 from '../../assets/images/LogoCategory/cold-drinks.png';
// Import các hình ảnh khác cần thiết



const LisItemCategory = () => {

    const categories = [
        { name: 'Mặt hàng trái cây', href: '/search?category=fresh-vegetables', image: hinh1 },
        { name: 'Rau sạch', href: '/search?category=fresh-vegetables', image: hinh2 },
        { name: 'Dinh dưỡng ăn kiêng', href: '/search?category=fresh-vegetables', image: hinh3 },
        { name: 'Nước ép trái cây', href: '/search?category=fresh-vegetables', image: hinh14 },
        { name: 'Rau sạch', href: '/search?category=fresh-vegetables', image: hinh4 },
        { name: 'Các mặt hàng gia vị', href: '/search?category=fresh-vegetables', image: hinh5 },
        { name: 'Đồ ăn nhanh', href: '/search?category=fresh-vegetables', image: hinh15 },
        { name: 'Sữa từ trái cây', href: '/search?category=fresh-vegetables', image: hinh7 },
        // { name: 'Dinh dưỡng ăn kiêng', href: '/search?category=fresh-vegetables', image: hinh8 },
        // { name: 'Đồ ăn nhanh', href: '/search?category=fresh-vegetables', image: hinh9 },
        // { name: 'Rau sạch', href: '/search?category=fresh-vegetables', image: hinh10 },
        // { name: 'Các loại thực phẩm lành mạnh', href: '/search?category=fresh-vegetables', image: hinh11 },
        // { name: 'Đồ ăn nhanh', href: '/search?category=fresh-vegetables', image: hinh12 },
        // { name: 'Dinh dưỡng ăn kiêng', href: '/search?category=fresh-vegetables', image: hinh13 },
        // { name: 'Nước ép trái cây', href: '/search?category=fresh-vegetables', image: hinh14 },
        // { name: 'Dinh dưỡng ăn kiêng', href: '/search?category=fresh-vegetables', image: hinh15 },
        
        // Thêm các danh mục khác nếu cần
      ];

      
    return (
        <div className="">  
        <div className="heightFull mb-12 LisItemCategory">
  <div className="text-center pb-2 title_category_2">
    <h2 className="text-brand-dark text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope 3xl:text-[25px] 3xl:leading-9">
            Bạn thích gọi món gì
    </h2>
    <p className="text-brand-muted text-sm leading-7 lg:text-15px xl:text-base pb-0.5 mt-1.5 lg:mt-2.5 xl:mt-3">
      <font style={{ verticalAlign: "inherit" }}>
        <font style={{ verticalAlign: "inherit" }}>
          Ở đây hãy đặt món ăn yêu thích của bạn từ các danh mục khác nhau
        </font>
      </font>
    </p>
  </div>
  <div className="block justify-center flex-wrap ItemCategory_ct">
      {categories.map((category, index) => (
        <a
          key={index}
          className="group block w-full text-center shrink-0 item_category mb-12"
          href={category.href}
        >
          <div className="flex mx-auto rounded-full overflow-hidden bg-fill-thumbnail item_category_image">
            <div className="flex shrink-0 transition-all duration-700 w-full h-full transform scale-100 category_image_5">
              <img
                alt={category.name}
                loading="lazy"
                width={178}
                height={178}
                decoding="async"
                data-nimg={1}
                className="object-cover rounded-full aspect-square"
                src={category.image}
                style={{ color: 'transparent' }}
              />
            </div>
          </div>
          <h3 className="text-sm text_cate truncate">
            <font style={{ verticalAlign: 'inherit' }}>
              <font style={{ verticalAlign: 'inherit' }}>{category.name}</font>
            </font>
          </h3>
        </a>
      ))}
    </div>

       </div>


       <div className="text-center pb-2 title_category_2">
    <h2 className="text-brand-dark text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope 3xl:text-[25px] 3xl:leading-9">
      Cửa hàng  ,các sản phẩm nổi bật nhất
    </h2>
    <p className="text-brand-muted text-sm leading-7 lg:text-15px xl:text-base pb-0.5 mt-1.5 lg:mt-2.5 xl:mt-3">
      <font style={{ verticalAlign: "inherit" }}>
        <font style={{ verticalAlign: "inherit" }}>
        Chúng tôi cung cấp các mặt hàng tươi và chất lượng tốt nhất gần vị trí của bạn
        </font>
      </font>
    </p>
  </div>


       </div>

          

    );
};

export default LisItemCategory;
