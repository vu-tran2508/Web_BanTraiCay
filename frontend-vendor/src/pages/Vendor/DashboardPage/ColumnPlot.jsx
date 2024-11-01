import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const ColumnPlot = () => {
  const [doanhThuThang, setDoanhThuThang] = useState([]);

  useEffect(() => {
    const fetchDoanhThuThang = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/statistics/monthly-revenue');
        const data = await response.json();
        setDoanhThuThang(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu doanh thu hàng tháng:', error);
      }
    };

    fetchDoanhThuThang();
  }, []); // Mảng phụ thuộc rỗng đảm bảo rằng effect này chỉ chạy một lần khi component được mount

  // Đổi tên tháng từ tiếng Trung sang tiếng Việt
  const thangVietNamese = {
    JANUARY: 'Tháng 1',
    FEBRUARY: 'Tháng 2',
    MARCH: 'Tháng 3',
    APRIL: 'Tháng 4',
    MAY: 'Tháng 5',
    JUNE: 'Tháng 6',
    JULY: 'Tháng 7',
    AUGUST: 'Tháng 8',
    SEPTEMBER: 'Tháng 9',
    OCTOBER: 'Tháng 10',
    NOVEMBER: 'Tháng 11',
    DECEMBER: 'Tháng 12',
  };

  const mapData = Object.entries(doanhThuThang).map(([thang, giaTri]) => ({
    loai: thangVietNamese[thang],
    giaTri,
  }));

  // Sắp xếp theo tháng
  const sortedData = mapData.sort((a, b) => {
    const thangA = Object.values(thangVietNamese).indexOf(a.loai);
    const thangB = Object.values(thangVietNamese).indexOf(b.loai);
    return thangA - thangB;
  });

  // Đổi định danh tiền tệ sang VNĐ
  const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data: sortedData,
    xField: 'loai',
    yField: 'giaTri',
    seriesField: '',
    color: ({ loai }) => (loai === '10-30分' || loai === '30+分' ? paletteSemanticRed : brandColor),
    label: {
      content: (duLieuGoc) => {
        const giaTri = parseFloat(duLieuGoc.giaTri);
        return giaTri < 0.05 ? `${(giaTri * 100).toFixed(1)}%` : formatCurrency(giaTri);
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <Column {...config} />;
};

export default ColumnPlot;
