
import { Link } from 'react-router-dom';
import config from '../../config';
import { Dropdown, Menu, Space } from 'antd';
import { FaSortDown } from 'react-icons/fa'; // Add this import statement
import SubMenu from 'antd/es/menu/SubMenu';
import { AiOutlineDown } from "react-icons/ai";
const MenuHeaderComponent = () => {
  const menu = (
    <Menu>
      <Menu.ItemGroup title="Hoa Quả">
        <Menu.Item key="1">Trái cây nhiệt đới & kỳ lạ</Menu.Item>
        <Menu.Item key="2">cam quýt</Menu.Item>
        <Menu.Item key="3">Quả hạch</Menu.Item>
        <Menu.Item key="4">Táo</Menu.Item>
        <Menu.Item key="5">chuối</Menu.Item>
        <Menu.Item key="6">Quả nho</Menu.Item>
        <Menu.Item key="7">Latin</Menu.Item>
        <Menu.Item key="8">dưa</Menu.Item>
        <Menu.Item key="9">Xoài</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const ABOUT = (
    <Menu>
      <Menu.ItemGroup title="VỀ CHÚNG TÔI">
        <Menu.Item key="1">Lịch Sử Phát Triển</Menu.Item>
        <Menu.Item key="2">
          <Link to={config.routes.AboutUs}>Giới Thiệu</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const gioqua = (
    <Menu>
      <Menu.ItemGroup title="GIỎ QUÀ">
        <SubMenu key="gifts" title="Giỏ quà tết">
          <Menu.Item key="tet1">Menu 1111111111111111111111</Menu.Item>
          <Menu.Item key="tet2">Menu 2</Menu.Item>
          <Menu.Item key="tet3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="sinhs" title="Giỏ quà giảng sinh">
          <Menu.Item key="sinh1">Menu 1</Menu.Item>
          <Menu.Item key="sinh2">Menu 2</Menu.Item>
          <Menu.Item key="sinh3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="quas" title="Giỏ quà 14/2">
          <Menu.Item key="qu1">Menu 1</Menu.Item>
          <Menu.Item key="qu2">Menu 2</Menu.Item>
          <Menu.Item key="qu3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="yeus" title="Giỏ quà người yêu cũ">
          <Menu.Item key="y1">Menu 1</Menu.Item>
          <Menu.Item key="y2">Menu 2</Menu.Item>
          <Menu.Item key="y3">Menu 3</Menu.Item>

        </SubMenu>


      </Menu.ItemGroup>
    </Menu>
  );

  const NuocEp = (
    <Menu>
      <Menu.ItemGroup title="GIỎ QUÀ">
        <SubMenu key="gifts" title="Giỏ quà tết">
          <Menu.Item key="tet1">Menu 1111111111111111111111</Menu.Item>
          <Menu.Item key="tet2">Menu 2</Menu.Item>
          <Menu.Item key="tet3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="sinhs" title="Giỏ quà giảng sinh">
          <Menu.Item key="sinh1">Menu 1</Menu.Item>
          <Menu.Item key="sinh2">Menu 2</Menu.Item>
          <Menu.Item key="sinh3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="quas" title="Giỏ quà 14/2">
          <Menu.Item key="qu1">Menu 1</Menu.Item>
          <Menu.Item key="qu2">Menu 2</Menu.Item>
          <Menu.Item key="qu3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="yeus" title="Giỏ quà người yêu cũ">
          <Menu.Item key="y1">Menu 1</Menu.Item>
          <Menu.Item key="y2">Menu 2</Menu.Item>
          <Menu.Item key="y3">Menu 3</Menu.Item>

        </SubMenu>


      </Menu.ItemGroup>
    </Menu>
  );
  const Post = (
    <Menu>
      <Menu.ItemGroup title="Bài Viết">
        <SubMenu key="gifts" title="Bài Viết Mua Xuần">
          <Menu.Item key="tet1">Menu 1111111111111111111111</Menu.Item>
          <Menu.Item key="tet2">Menu 2</Menu.Item>
          <Menu.Item key="tet3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="sinhs" title="Bài Viết Mua đông">
          <Menu.Item key="sinh1">Menu 1</Menu.Item>
          <Menu.Item key="sinh2">Menu 2</Menu.Item>
          <Menu.Item key="sinh3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="quas" title="Bài Viết Mua Thu">
          <Menu.Item key="qu1">Menu 1</Menu.Item>
          <Menu.Item key="qu2">Menu 2</Menu.Item>
          <Menu.Item key="qu3">Menu 3</Menu.Item>

        </SubMenu>
        <SubMenu key="yeus" title="Bài Viết Mua Hạ">
          <Menu.Item key="y1">Menu 1</Menu.Item>
          <Menu.Item key="y2">Menu 2</Menu.Item>
          <Menu.Item key="y3">Menu 3</Menu.Item>

        </SubMenu>


      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="menu-header">
      <div className="navbar navbar-light navbar-static-top navbar-expand-md">
        <div className="navbar-collapse">
          <ul>
            <li>TRANG CHỦ</li>
            {/* <li className="nav-item dropdown">
                                    <Dropdown overlay={menu} placement="bottomLeft">
                                        <a className="nav-link" style={{ color: '#4d4d4d' }}>
                                            HOA QUẢ <AiOutlineDown className='fa-caret-down' />
                                        </a>
                                    </Dropdown>
                                </li> */}
            <Link to={config.routes.products_list}>
              <li> CỬA HÀNG</li>
            </Link>

            {/* 
                                <li className="nav-item dropdown">
                                    <Dropdown overlay={NuocEp} placement="bottomLeft">
                                        <a className="nav-link" style={{ color: '#4d4d4d' }}>
                                        NƯỚC ÉP &CẮT LÁT <AiOutlineDown className='fa-caret-down' />
                                        </a>
                                    </Dropdown>
                                </li> */}


            <li className="nav-item dropdown">
              <Dropdown overlay={gioqua} placement="bottomLeft">
                <a className="nav-link" style={{ color: '#4d4d4d' }}>
                  GIỎ QUÀ <AiOutlineDown className='fa-caret-down' />
                </a>
              </Dropdown>
            </li>
            <Link to={config.routes.Post}>

              <li className="nav-item dropdown">
                <Dropdown overlay={Post} placement="bottomLeft">
                  <a className="nav-link" style={{ color: '#4d4d4d' }}>
                    BÀI VIẾT <AiOutlineDown className='fa-caret-down' />
                  </a>
                </Dropdown>
              </li>
            </Link>
            <Link to={config.routes.Contact}>
              <li> LIÊN HỆ</li>
            </Link>
            <li> CHÍNH SÁCH </li>


            <li className="nav-item dropdown">
              <Dropdown overlay={ABOUT} placement="bottomLeft">
                <a className="nav-link" style={{ color: '#4d4d4d' }}>
                  CHÚNG TÔI<AiOutlineDown className='fa-caret-down' />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default MenuHeaderComponent;
