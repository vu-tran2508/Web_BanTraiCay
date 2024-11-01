// PriceFilter.jsx
import React, { useState } from 'react';

const PriceFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const handlePriceFilterChange = () => {
    onFilterChange(minPrice, maxPrice);
  };

  return (

    <div style={{ backgroundColor: ' rgb(255, 255, 255)' }}>
      <div className="filter_heading">PHẠM VI GIÁ</div>
      <div className="price-filter d-flex no-gutters w-100 align-items-center justify-content-between">
        <input
          type="number"
          placeholder=""
          className="form-control ng-valid ng-dirty ng-touched"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <p className="mb-0">TO</p>
        <input
          type="number"
          className="form-control"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <p className="mb-0" style={{ cursor: "pointer" }} onClick={handlePriceFilterChange}>
          GO
        </p>
      </div>
    </div>
    
  );
};

export default PriceFilter;
