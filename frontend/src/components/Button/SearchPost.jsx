import React from 'react';
import { IoSearchSharp } from "react-icons/io5";



const SearchPost = () => {

  
    return (
        <aside className=" widget_search" data-toggle="yes">

        <div className="js__tab_content widget--content">
          {/* /snippets/search-bar.liquid */}
          <form className="searchform" method="get" action="/search" role="search">
            <div className="form--common form--search">
              <input type="hidden" name="type" defaultValue="product" />
              <input className="input--common" placeholder="Search" aria-label="Search" type="text" defaultValue=""name="q"/>
              <button type="submit" className="button--icon">
                 <IoSearchSharp />
              </button>
            </div>
          </form>
        </div>
      </aside>
      
    )
}

export default SearchPost