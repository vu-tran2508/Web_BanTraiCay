import React from 'react';
import './Listcategory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cate  from '../../assets/images/LogoCategory/Cate.webp'
import hinh1 from '../../assets/images/LogoCategory/diet-foods.webp';
import hinh2 from '../../assets/images/LogoCategory/fresh-vegetables.webp';
import hinh4 from '../../assets/images/LogoCategory/green-vegetables.webp';
import hinh5 from '../../assets/images/LogoCategory/grocery-items.webp';

// Import các hình ảnh khác cần thiết



const CategoryComponent = () => {
    return (
        <div className="heightFull mb-12">
        <div className="grid grid-cols-1 grid-cols-4 gap-5L">
          <a
            className="group flex"
            href="/en/bundles/spring-cleaning-for-home-appliance"
          >
            <div
              className="relative flex items-center w-full overflow-hidden"
              style={{ backgroundColor: "rgb(255, 238, 214)" }}
            >
              <div className="flex images_category">
                <img
                  alt="Spring cleaning for home appliance"
                  loading="lazy"
                  width={180}
                  height={150}
                  decoding="async"
                  data-nimg={1}
                  className="object-cover mx-auto transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
                  src={hinh1}
                  style={{ color: "transparent", width: "auto" }}
                />
              </div>
              <div className="conten_cate">
                <h2 className="text-brand-dark text-base h2_cate">
                Thực phẩm và trái cây
                </h2>
                <p className="text-sm leading-6 p_cate">
                trái cây tười xanh sạch và được nhập mỗi ngày
                </p>
              </div>
            </div>
          </a>
          <a
            className="group flex"
            href="/en/bundles/your-pet-choice-for-fresh-healthy-food"
          >
            <div
              className="relative flex items-center w-full overflow-hidden"
              style={{ backgroundColor: "rgb(217, 236, 210)" }}
            >
              <div className="flex images_category">
                <img
                  alt="Your pet choice for fresh healthy food"
                  loading="lazy"
                  width={180}
                  height={150}
                  decoding="async"
                  data-nimg={1}
                  className="object-cover mx-auto transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
                  src={hinh2}
                  style={{ color: "transparent", width: "auto" }}
                />
              </div>
              <div className="conten_cate">
                <h2 className="text-brand-dark text-base h2_cate">
                Rau quả
                </h2>
                <p className="text-sm leading-6 p_cate">
                Rau quả chất lượng cao được nhập khẩu.
                </p>
              </div>
            </div>
          </a>
          <a
            className="group flex"
            href="/en/bundles/washing-item-with-discount-product"
          >
            <div
              className="relative flex items-center w-full overflow-hidden"
              style={{ backgroundColor: "rgb(219, 229, 239)" }}
            >
              <div className="flex images_category">
                <img
                  alt="Washing item with discount product"
                  loading="lazy"
                  width={180}
                  height={150}
                  decoding="async"
                  data-nimg={1}
                  className="object-cover mx-auto transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
                  src={hinh4}
                  style={{ color: "transparent", width: "auto" }}
                />
              </div>
              <div className="conten_cate">
                <h2 className="text-brand-dark text-base h2_cate">
                 Các thức phẩm chất lượng cao
                </h2>
                <p className="text-sm leading-6 p_cate">
                  Được nhập khẩu từ các quốc gia nổi tiếng .
                </p>
              </div>
            </div>
          </a>
          <a
            className="group flex"
            href="/en/bundles/fresh-quality-meat-item-with-discount"
          >
            <div
              className="relative flex items-center w-full overflow-hidden"
              style={{ backgroundColor: "rgb(239, 216, 212)" }}
            >
              <div className="flex images_category">
                <img
                  alt="Fresh quality meat item with discount"
                  loading="lazy"
                  width={180}
                  height={150}
                  decoding="async"
                  data-nimg={1}
                  className="object-cover mx-auto transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
                 src={hinh5}
                  style={{ color: "transparent", width: "auto" }}
                />
              </div>
              <div className="conten_cate">
                <h2 className="text-brand-dark text-base h2_cate">
                Thực phẩm và trái cây
                </h2>
                <p className="text-sm leading-6 p_cate">
                Được nhập khẩu từ các quốc gia nổi tiếng .
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>      

    );
};

export default CategoryComponent;
