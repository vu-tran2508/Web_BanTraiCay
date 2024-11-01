export const formatPrice = (salePrice) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(salePrice);
  
    return formattedPrice;
  };