import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostPage.css'
import bg_blog from '../../../assets/images/blog/bg_blog.webp';
import NavPost from '../../../components/Post/NavPost';
import SearchPost from '../../../components/Button/SearchPost';
import CategoriesPost from '../../../components/Post/CategoriesPost';
import RecentPost from '../../../components/Post/RecentPost';
import CartPostInfo from '../../../components/Post/CartPostInfo';
import CartInfo from '../../../components/Post/CartInfo';
import Tags from '../../../components/Post/Tags';


const Post = () => {


    return (
        <div>
            <div
                className="text-center bg--cover bg--fixed bg--cover-dark js__background "
                style={{
                    backgroundImage: `url(${bg_blog})`, position: 'relative', // Sửa ở đây để sử dụng dấu ` và thêm dấu ngoặc đơn
                }}>
                <div className="overlay"></div> {/* Lớp overlay */}
                <div className="container  bg--cover-content">
                    <h2 className="title--page">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>Tin tức</font>
                        </font>
                    </h2>
                </div>
            </div>
            <div className="container ">
                <NavPost/>
                <div className="row">
                    {/* Categories */}
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <SearchPost/>
                        <CategoriesPost/>
                        <RecentPost/>
                        <CartInfo/>
                        <Tags/>
                        

                    </div>
                    {/* Cart  */}
                    <div className="col-md-9 col-sm-8 col-xs-12 ">
                        <ul style={{ listStyle: "none" }}>
                            <CartPostInfo/>
                            <CartPostInfo/>
                            <CartPostInfo/>


                        </ul>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default Post