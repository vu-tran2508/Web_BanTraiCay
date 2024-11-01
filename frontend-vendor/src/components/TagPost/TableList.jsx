// Import thêm một số components cần thiết từ antd
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Pagination, Modal } from 'antd';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { fetchTags, deleteTag } from '../../redux/actions/tag-action';
import EditModal from '../common/Modal/EditModalPost';
import '../Table/TableList.css';

const TableListTag = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [pageSize, setPageSize] = useState(2); // Số items trên mỗi trang mặc định

  const dispatch = useDispatch();
  const tagsData = useSelector((state) => state.tags);
  const fetchedTags = tagsData.tags || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTags());
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async (tagId) => {
    await dispatch(deleteTag(tagId));
    dispatch(fetchTags());
  };

  const handleEditClick = (tagId) => {
    setSelectedTagId(tagId);
    setShowEditModal(true);
  };

  const columns = [
    {
      title: 'Tên TAG',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => handleEditClick(record.tag_id)}>
            <MdEdit />
          </a>
          <a href="#">
            <GrView />
          </a>
          <a href="#">
            <AiFillDelete onClick={() => showDeleteConfirm(record.tag_id, record.name)} />
          </a>
        </Space>
      ),
    },
  ];

  const onPageChange = (page, pageSize) => {
    // Handle page change if needed
  };

  // Delete confirmation modal
  const showDeleteConfirm = (tagId, tagName) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa tag "${tagName}"?`,
      onOk() {
        handleDelete(tagId);
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={fetchedTags}
        rowKey="tag_id"
        pagination={{
          total: fetchedTags.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: pageSize,
          pageSizeOptions: ['2', '5', '10', '20'], // Các tùy chọn cho số lượng items trên mỗi trang
          showSizeChanger: true,
          onChange: onPageChange,
        }}
      />

      <EditModal show={showEditModal} handleClose={() => setShowEditModal(false)} tagId={selectedTagId} />
    </div>
  );
};

export default TableListTag;
