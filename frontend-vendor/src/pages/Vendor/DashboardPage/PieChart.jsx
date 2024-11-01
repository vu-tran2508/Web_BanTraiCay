import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const PieChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/statistics/top-selling-categories');
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching top selling categories:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  const mapData = categoryData.map(([category, value]) => ({
    type: category,
    value,
  }));

  const config = {
    appendPadding: 10,
    data: mapData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return <Pie {...config} />;
};

export default PieChart;
