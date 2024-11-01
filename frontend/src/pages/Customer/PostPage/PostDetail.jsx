import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostPage.css'
import CartPostDetail from '../../../components/Post/ContentPostDefault';
import SearchPost from '../../../components/Button/SearchPost';
import CategoriesPost from '../../../components/Post/CategoriesPost';
import RecentPost from '../../../components/Post/RecentPost';
import CartInfo from '../../../components/Post/CartInfo';
import Tags from '../../../components/Post/Tags';


const PostDetail = () => {


    return (
        <div>
            <div>

            </div>
            <div className="container ">
                <div style={{ paddingTop: 150 }}></div>
                <h2 className="article_title">We Must Put Consumers First</h2>
                <div className="cmt-author">
                    <span className="author">
                        {" "}
                        By :
                        <a href="/blogs/news/we-must-put-consumers-first">
                            Oranda-store-demo Admin
                        </a>
                    </span>
                    <span className="comment_count">
                        <a
                            href="/blogs/news/we-must-put-consumers-first/#comments"
                            className="silver"
                        >
                            0
                        </a>{" "}
                        comments
                    </span>
                </div>

                <div className="row">
                    {/* Categories */}
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <SearchPost />
                        <CategoriesPost />
                        <RecentPost />
                        <CartInfo />
                        <Tags />


                    </div>
                    {/* Cart  */}
                    <div className="col-md-9 col-sm-8 col-xs-12 ">
                        <div className="">
                        <CartPostDetail/>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default PostDetail