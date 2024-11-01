import React from 'react';
import { GiThreeLeaves } from "react-icons/gi";



const CategoriesPost = () => {


    return (
        <aside
            className="widget widget_categories widget--list"
            data-toggle="yes" 
        >
            <h3 className="widget-title ">Thể loại</h3>
            <div className=" widget--content" > 
                <ul>
                    <li className="current-cat" style={{display:'flex'}}>
                        <GiThreeLeaves style={{ left: "-5px",position: "absolute",color: '#94c618'}}/>
                        <a href="/blogs/news" style={{color: '#94c618',}}> News</a>
                    </li>
                    <li>
                        <a href="/blogs/spring">Spring</a>
                    </li>
                    <li>
                        <a href="/blogs/summer">Summer</a>
                    </li>
                    <li>
                        <a href="/blogs/autumn">Autumn</a>
                    </li>
                    <li>
                        <a href="/blogs/winter">Winter</a>
                    </li>
                </ul>
            </div>
        </aside>

    )
}

export default CategoriesPost