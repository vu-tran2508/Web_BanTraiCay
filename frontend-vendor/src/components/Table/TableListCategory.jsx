import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { Table, Space, Pagination, Modal } from 'antd';
import CategoryService from '../../services/CategoryService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch }from 'react-icons/bs';
import FormCategory from '../Category/FormAdd';
import FormEdit from '../Category/FormEdit';
const TableListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Set your desired page size
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  const [isModalVisible, setVisible] = useState(false);

  const showModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setVisible(true);

  };

  const handleCancel = () => {
    setVisible(false);
  };


    const [isModalAdd, setIsModalAdd] = useState(false);

    const showModalAdd = () => {
      loadCategory();
      setIsModalAdd(true);
    };
  
    const handleCancelAdd = () => {
      loadCategory();
      setIsModalAdd(false);
    };

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const response = await CategoryService.getAll();
      console.log('Danh sách các danh mục:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await CategoryService.remove(categoryId);
      loadCategory();
      hideDeleteModal();
      toast.success('Xóa Danh Mục Thành Công', { position: toast.POSITION.TOP_RIGHT });
      hideDeleteModal();
    } catch (error) {
      toast.error('Danh mục chứa sản phẩm không thể xóa.', { position: toast.POSITION.TOP_RIGHT });
      hideDeleteModal();
    }
  };
  const showDeleteModal = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'Tên Danh Mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Số Sản Phẩm',
      dataIndex: 'productCount',
      key: 'productCount',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => showModal(record.categoryId)}>
            <MdEdit />
          </a>
          <a href="#">
            <GrView />
          </a>
          <a href="#" onClick={() => showDeleteModal(record.categoryId, record.name)}>
            <AiFillDelete />
          </a>
        </Space>
      ),
    },
  ];

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  return (
    <div>

      <div className="card">
        <div className="card-body">
          <div className="table-filter mb-4 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="input-group rounded">
                <label htmlFor="" className="searchLabel">
                  <BsSearch />
                  <input type="search" className="form-search rounded" placeholder="Tìm kiếm bằng bất cứ thứ gì..." aria-label="Search" aria-describedby="search-addon" />
                </label>

              </div>

            </div>
            <div className="ms-4 flex flex-shrink-0 items-center">
              <button
                className="rizzui-button inline-flex font-medium items-center justify-center  transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent "
                type="button" onClick={showModalAdd}

              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 256 256"
                  className="me-1.5 h-[18px] w-[18px]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z" />
                </svg>
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>Thêm Danh Mục</font>
                </font>
              </button>




            </div>
          </div>
          {/* Phần Table  */}
          <Table
            columns={columns}
            dataSource={categories}
            pagination={{
              total: categories.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: pageSize,
              pageSizeOptions: ['3', '5', '10', '20'], // Các tùy chọn cho số lượng items trên mỗi trang
              showSizeChanger: true,
              onChange: onPageChange,
            }}
            rowKey="categoryId"
          />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Xác nhận xóa"
        visible={deleteModalVisible}
        onOk={() => deleteCategory(selectedCategoryId)}
        onCancel={hideDeleteModal}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục " <strong style={{ color: 'red' }}>{selectedCategoryName} </strong>"?</p>
      </Modal>

      <FormEdit visible={isModalVisible} onClose={handleCancel} categoryId={selectedCategoryId} load={loadCategory} />
      <FormCategory visible={isModalAdd} onClose={handleCancelAdd} load={loadCategory}/>


    </div>
  );
};

export default TableListCategory;
