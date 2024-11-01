import React from 'react';

const SelectBox = () => {
  return (
    <select className="select_sort" style={{ color: 'black', fontWeight: 500, border: 0 }}>
      <option value="" disabled="" defaultValue="option1">Sắp xếp theo</option>
      <option value="1: ">Liên quan</option>
      <option value="2: recent">Hàng mới nhất</option>
      <option value="3: price_desc">Giá: Cao đến thấp</option>
      <option value="4: price_asc">Giá: Thấp đến cao</option>
      <option value="5: name_desc">Tên: Z đến A</option>
      <option value="6: name_asc">Tên: A đến Z</option>
      <option value="7: most_selling">Phổ biến nhất</option>
    </select>
  );  
};

export default SelectBox;
