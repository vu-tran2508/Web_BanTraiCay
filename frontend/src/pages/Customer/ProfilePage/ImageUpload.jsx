import React, { useState } from 'react';

const ImageUpload = ({ images, onImageChange }) => {
  const [image, setImage] = useState(images || ''); // Initialize with the provided image

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(file); // Notify the parent component about the image change
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  return (
    <div className="student-profile-setting-author-img upload-profile-pic">
      <img
        alt=""
        width="200"
        height="200"
        src={image ? image : `http://localhost:8080/api/home/image/${images}`}
        style={{ color: 'transparent', width: 'auto', height: 'auto', cursor: 'pointer' }}
        onClick={handleImageClick}
      />
      <input
        id="imageInput"
        className="hidden"
        accept="image/*"
        required
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
