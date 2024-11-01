import React from 'react';

const Checkbox = ({ id, label }) => {
  return (
    <label className="custom-checkbox custom-control">
      <div className="d-flex">
        <input type="checkbox" className="custom-control-input mt-1" id={id} />
        <label className="custom-control-label" htmlFor={id}>{label}</label>
      </div>
    </label>
  );
};

export default Checkbox;
