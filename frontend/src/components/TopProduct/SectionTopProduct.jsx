import React from "react";
import InfoProductTop from "../Product/InfoProductTop";
import './SectionTopProduct.css';

const SectionTopProduct = ({ products }) => {
  const renderProductSection = (title, startIdx, endIdx) => (
    <div className="col-md-4 px-3">
      <div className="main-cont-white-bg">
        <div className="header5">
          <h5>{title}</h5>
          <a href="#">View All</a>
        </div>
        {products
          .slice(startIdx, endIdx)
          .map((product, index) => (
            <InfoProductTop key={index} product={product} />
          ))}
      </div>
    </div>
  );

  return (
    <section id="gridTop">
      {renderProductSection("Top Rated", 0, 3)}
      {renderProductSection("Best Selling", 3, 6)}
      {renderProductSection("On Sale", 6, 9)}
      {/* Add more sections as needed */}
    </section>
  );
};

export default SectionTopProduct;
