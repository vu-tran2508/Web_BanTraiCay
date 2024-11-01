import React, { useState } from 'react';
import { Modal, Input, List, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const DiscountCodeModal = ({ visible, onCancel }) => {
  const [searchText, setSearchText] = useState('');
  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Mã giảm giá 1', code: 'CODE1LLL', logo: 'logo1.png', expiresIn: '30/12/2023', remaining: 5, applied: false },
    { id: 2, name: 'Mã giảm giá 1', code: 'CODE1LLL', logo: 'logo1.png', expiresIn: '30/12/2023', remaining: 5, applied: false },

  ]);

  const handleSearch = (value) => {
    // Tìm kiếm mã giảm giá theo tên hoặc mã
    const filteredCodes = discounts.filter(
      (code) =>
        code.code.toLowerCase().includes(value.toLowerCase()) ||
        code.name.toLowerCase().includes(value.toLowerCase())
    );
    setDiscounts(filteredCodes);
  };
  const handleApply = (code) => {
    const updatedDiscounts = discounts.map((item) =>
      item.code === code ? { ...item, applied: !item.applied } : item
    );
    setDiscounts(updatedDiscounts);
  };

  return (
    <Modal
      title="Chọn mã giảm giá"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Input style={{ marginBottom: 20 }}
        placeholder="Tìm kiếm mã giảm giá"
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={() => handleSearch(searchText)}
      />
      <List
        dataSource={discounts}
        renderItem={(item) => (
          <List.Item style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', marginBottom: '5px', padding: 0 }}>
            <Space align="center" style={{ width: '100%', padding: '2px' }}>
              <div style={{ flex: '0 0 auto' }}>
                <img src={`https://placekitten.com/50/50?image=${item.logo}`} alt={item.name} style={{ marginRight: 16, borderRadius: '5px' }} width={"100%"} />
              </div>
              <div style={{ flex: '1 1 auto' }}>
                <strong>{item.name}</strong>
                <br />
                {item.code}
                <br />
                <p style={{ color: "red", fontSize: 10 }}>Ngày hết hạn: {item.expiresIn}  </p>
              </div>
              <div style={{ paddingLeft: 180, marginLeft: 'auto' }}>
                <Button type="primary" onClick={() => handleApply(item.code)}>
                  {item.applied ? 'Loại bỏ' : 'Áp dụng'}
                </Button>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default DiscountCodeModal;
