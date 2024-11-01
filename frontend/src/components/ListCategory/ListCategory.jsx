import React from 'react';
import './Listcategory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import categoryImage1 from '../../assets/images/LogoCategory/Anh1.gif';
import categoryImage2 from '../../assets/images/LogoCategory/Anh2.gif';
import categoryImage3 from '../../assets/images/LogoCategory/Anh3.gif';
import categoryImage4 from '../../assets/images/LogoCategory/Anh4.gif';
import categoryImage5 from '../../assets/images/LogoCategory/Anh5.gif';
import categoryImage6 from '../../assets/images/LogoCategory/Anh6.gif';
// Import các hình ảnh khác cần thiết

const categories = [
    { name: 'Category 1', image: categoryImage1 },
    { name: 'Category 2', image: categoryImage2 },
    { name: 'Category 2', image: categoryImage3 },
    { name: 'Category 2', image: categoryImage4 },
    { name: 'Category 2', image: categoryImage5 },
    { name: 'Category 2', image: categoryImage6 },

    // Thêm các đối tượng danh mục khác nếu cần
];

const ListCategoryComponent = () => {
    return (
        <section id="categories" className="container-fluid">
            <div className="categoriegrit">
                <div className="gridContainer">

                    {categories.map((category, index) => (
                        <div key={index} className='cart_caregory'>
                            <div className="vp-cont">
                                <a href=""> <img src={category.image} alt={category.name} /> </a>
                            </div>

                        </div>


                    ))}
                </div>

            </div>
        </section>

    );
};

export default ListCategoryComponent;
