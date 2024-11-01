import React, { useState } from 'react';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import config from '../../config';


function NavItem({ title, icon, links }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const IconComponent = icon; // Lưu ý việc chuyển đổi tên thành PascalCase để sử dụng như một component

    return (
        <li>
            <a
                className={`is-parent has-arrow${isExpanded ? ' expanded' : ''}`}
                onClick={toggleExpand}
            >
                {IconComponent && <IconComponent className="iconReact" />}

                <span>{title}</span>

                {isExpanded ? <BiChevronDown className='iconChevron' /> : <BiChevronRight className='iconChevron' />}
            </a>
            <ul className={`sub-menu mm-collapse${isExpanded ? ' expanded' : ''}`}>
                {links.map((link, index) => (       
                        <li key={index}>
                        <Link to={link.to} className="side-nav-link-ref">
                            {link.title}
                        </Link>

                        </li>
                 
                ))}
            </ul>
        </li>
    );
}

export default NavItem;
