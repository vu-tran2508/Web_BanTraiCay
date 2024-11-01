import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';





const ByLineFilterSupplier = ({ title, List ,value, onCheckboxChange,  selectedItems = [] }) => {
  const [isOpen, setIsOpen] = useState(value);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li role="presentation" className={` ${isOpen ? 'active' : ''}`} style={{ width: '100%' }}>
      <a
        data-bs-toggle="collapse"
        aria-expanded={isOpen ? 'true' : 'false'}
        className="filter_heading w-100 my-2 d-flex justify-content-between align-items-center text-uppercase collapsed"
        style={{ color: '#000 !important', fontSize: '15px', fontWeight: '600 !important' }}
        data-bs-target="#collapse-1"
        onClick={toggleCollapse}
      >
        {title} {isOpen ? <BsChevronUp style={{ color: '#b1adad' }} /> : <BsChevronDown style={{ color: '#b1adad' }} />}
      </a>
      <div className={`collapse row ${isOpen ? 'show' : ''}`} id="collapse-1">
        <div id="filter-categories" className="tab-pane active col-12 pf-5" style={{ maxHeight: '400px', overflow: 'auto', float: 'left', overflowX: 'hidden', width: '100%' }}>
          <div style={{ paddingLeft: '3px' }} className="filter_list">
            {List.map(item => (
              <label key={item.supplierId} className="custom-checkbox custom-control">
              <div className="d-flex">
              <input
                    type="checkbox"
                    className="custom-control-input mt-1"
                    id={item.nation}
                    onChange={() => onCheckboxChange(item.supplierId)}
                    checked={selectedItems.includes(item.supplierId)}
                  />
                <label className="custom-control-label" htmlFor={item.nation}>{item.nation}</label>
              </div>
            </label>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ByLineFilterSupplier;
