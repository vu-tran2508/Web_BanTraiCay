import React, { useState, useRef,useEffect  } from 'react';
import { CSSTransition } from 'react-transition-group';
import Anh from '../../assets/images/Logo/EUS.jpeg';
import Phap from '../../assets/images/Logo/Phap.jpeg';
import VietNam from '../../assets/images/Logo/VietName.png';
import './Dropdown.css';

const MenuLanguage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuRef]); 

  const handleMenuClick = () => {
    setDropdownOpen(false);
  };

  const menuItemsLanguage = [
    { image: VietNam, content: 'Việt Nam' },
    { image: Anh, content: 'English' },
    { image: Phap, content: 'Spanish' },
  ];

  return (
    <div className="btn-group">
      <button
        className="btn btn-md btn-white header-item"
        type="button"
        onClick={handleDropdownToggle}
      >
        <img
          className=""
          alt="Header Language"
          height={16}
          src={menuItemsLanguage[0].image}
        />
      </button>
      <CSSTransition
        in={isDropdownOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
        nodeRef={menuRef} // Thêm ref vào CSSTransition
      >
        <ul
          className="dropdown-menu"
          role="menu"
          style={{
            top: 70,
            left: "0px",
            width: "max-content",
            display: isDropdownOpen ? 'block' : 'none',
          }}
          ref={menuRef} // Thêm ref vào phần tử ul
        >
          {menuItemsLanguage.map((item, index) => (
            <li key={index} role="presentation">
              <button
                className="dropdown-item active text-undefined"
                type="button"
                onClick={handleMenuClick} // Thêm xử lý khi chọn một mục trong menu
              >
                <img
                  src={item.image}
                  alt="user-image"
                  className="me-1"
                  height={12}
                />
                <span className="align-middle">{item.content}</span>
              </button>
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default MenuLanguage;
