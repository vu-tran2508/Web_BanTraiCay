import React, { useState, useRef, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CKEditorComponent from '../CKEditor/CKEditor';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { fetchCategories } from '../../redux/actions/category-action';
import { fetchSuppliers } from '../../redux/actions/supplier-action';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, addImageProduct } from '../../redux/actions/product-action';
import { toast } from 'react-toastify';
import { Spin } from 'antd'; // Import Spin from Ant Design
const AddProductForm = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const categories = useSelector((state) => state.category.categories);
    const suppliers = useSelector((state) => state.supplier.getAll);
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({
        productId: '',
        name: '',
        hotEndDate: '',
        categoryId: '',
        status: '',
        supplierId: '',
        unit: '',
        quantity: '',
        description: '',
        importPrice: '',
        salePrice: '',
        discount: '',
        discountType: '',
        metaTitle: '',
        metaKeywords: '',
        metaDescription: '',
    });
    const [selectedImages, setSelectedImages] = useState([]);


    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSuppliers());
    }, [dispatch]);



    const handleFileChange = (event) => {
        const files = event.target.files;
        const selectedImagesArray = Array.from(files);
        console.log("Selected Images:", selectedImagesArray);
        setSelectedImages((prevImages) => [...prevImages, ...selectedImagesArray]);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        // Xử lý trường input là file hoặc các trường thông tin khác
        const newValue = type === 'file' ? files[0] : value;

        setProduct((prevDto) => ({
            ...prevDto,
            [name]: newValue,
        }));

        // Xóa lỗi khi người dùng bắt đầu gõ lại
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleImageDelete = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };


    const Rest = () => {
        setProduct({
            name: '',
            hotEndDate: '',
            categoryId: '',
            status: '',
            supplierId: '',
            unit: '',
            quantity: '',
            description: '',
            imageFile: [],
            importPrice: '',
            salePrice: '',
            discount: '',
            discountType: '',
            metaTitle: '',
            metaKeywords: '',
            metaDescription: '',
        });
        setSelectedImages([]);

    };
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleSubmitProduct = async (event) => {
           setloading(true)
        event.preventDefault();
        
        // Validate the form
        const validationErrors = validateForm(product);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Vui lòng Nhập lại dữ liệu!', { position: toast.POSITION.TOP_RIGHT });
            setloading(false) 
            return;
        }
    
        if (!hasSelectedImages) {
            toast.error('Vui lòng chọn hình ảnh sản phẩm!', { position: toast.POSITION.TOP_RIGHT });
            setloading(false) 
            return;
        }
    
        try {
            const productId = await dispatch(addProduct(product));
            setloading(false) 
            console.log('Thêm sản phẩm thành công, ID:', productId);
            await dispatch(addImageProduct(productId, selectedImages));
            Rest();
        } catch (error) {
            setloading(false) 
            console.error('Lỗi khi thêm sản phẩm:', error);
        } finally {
            // Reset form or perform any other necessary actions
            
        }
        console.log("FORM",product)
    };
    const hasSelectedImages = selectedImages.length > 0;
    const validateForm = () => {
        const errors = {};
        if (!product.name) {
            errors.name = 'Vui lòng nhập tên sản phẩm';
        }

        if (!product.metaKeywords) {
            errors.metaKeywords = 'Vui lòng nhập metaKey words';
        }

        if (!product.metaTitle) {
            errors.metaTitle = 'Vui lòng nhập meta Title';
        }

        if (!product.metaDescription) {
            errors.metaDescription = 'Vui lòng nhập meta Description';
        }

        if (!product.hotEndDate) {
            errors.hotEndDate = 'Vui lòng nhập ngày hết hạn hot';
        } else {
            const currentDate = new Date();
            const inputDate = new Date(product.hotEndDate);

            if (inputDate <= currentDate) {
                errors.hotEndDate = 'Ngày hết hạn hot phải ở tương lai';
            }
        }

        if (!product.status) {
            errors.status = 'Vui lòng chọn trạng thái';
        }
        if (!product.categoryId) {
            errors.categoryId = 'Vui lòng chọn Loại sản phẩm';
        }

        if (!product.supplierId) {
            errors.supplierId = 'Vui lòng chọn nhà sản xuất';
        }

        if (!product.unit) {
            errors.unit = 'Vui lòng chọn đơn vị sản phẩm';
        }

        if (!product.quantity || isNaN(product.quantity) || product.quantity <= 0) {
            errors.quantity = 'Vui lòng nhập số lượng sản phẩm hợp lệ';
        }

        if (!product.importPrice || isNaN(product.importPrice) || product.importPrice <= 0) {
            errors.importPrice = 'Vui lòng nhập giá nhập hợp lệ';
        }

        if (!product.salePrice || isNaN(product.salePrice) || product.salePrice <= 0) {
            errors.salePrice = 'Vui lòng nhập giá bán hợp lệ';
        }

        if (!product.discount || isNaN(product.discount) || product.discount < 0 || product.discount > 100) {
            errors.discount = 'Vui lòng nhập giảm giá hợp lệ';
        }

        if (!product.discountType) {
            errors.discountType = 'Vui lòng chọn đơn vị giảm giá';
        }

        
        return errors;
    };



    return (
        <Spin spinning={loading} size="large" tip="Loading...">
        <form action=""  >
            <div className="row">
                {/* Nội dung grid */}
                <div className="col-span-full col-sm-4">
                    <h4 className="text-base font-medium">Bản tóm tắt</h4>
                    <p className="mt-2">
                        Chỉnh sửa mô tả sản phẩm của bạn và thông tin cần thiết từ đây
                    </p>
                </div>
                <div className="col-sm-8">

                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Tiêu đề</span>
                                <input type="text"
                                    name='name'
                                    value={product.name}
                                    onChange={handleChange}
                                    className={`form-control form-add ${errors.name ? 'is-invalid' : ''}`}

                                    placeholder="Tiêu đề sản phẩm" />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Hot(Ngày Kết Thúc)</span>
                                <input type="date" className={`form-control form-add ${errors.hotEndDate ? 'is-invalid' : ''}`}

                                    value={product.hotEndDate}
                                    name='hotEndDate'
                                    onChange={handleChange}
                                    placeholder="Mã sản phẩm" />
                                {errors.hotEndDate && <div className="invalid-feedback">{errors.hotEndDate}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Loại sản phẩm</span>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name='categoryId'
                                    value={product.categoryId}
                                    onChange={handleChange}
                                    className={`form-control form-add ${errors.categoryId ? 'is-invalid' : ''}`}
                                    displayEmpty >
                                    <MenuItem value="" disabled>
                                        Lựa chọn
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <div className="form-outline">
                                    <span className='form-label'>Trang Thái</span>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        name='status'
                                        value={product.status}
                                        onChange={handleChange}
                                        label="Age"
                                        className={`form-control form-add ${errors.status ? 'is-invalid' : ''}`}

                                        displayEmpty >
                                        <MenuItem value="" disabled>
                                            Lựa chọn
                                        </MenuItem>
                                        <MenuItem value={1}>Hàng Mới</MenuItem>
                                        <MenuItem value={2}>Sắp ra mắt</MenuItem>
                                        <MenuItem value={3}>Chỉ có sẵn ngoại tuyến.</MenuItem>
                                    </Select>
                                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Nhà sản xuất</span>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name='supplierId'
                                    value={product.supplierId}
                                    onChange={handleChange}
                                    className={`form-control form-add ${errors.supplierId ? 'is-invalid' : ''}`}

                                    displayEmpty >
                                    <MenuItem value="" disabled>
                                        Lựa chọn
                                    </MenuItem>
                                    {suppliers.map((supplier) => (
                                        <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
                                            {supplier.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.supplierId && <div className="invalid-feedback">{errors.supplierId}</div>}

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Đơn vị sản phẩm</span>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name='unit'
                                    value={product.unit}
                                    onChange={handleChange}
                                    label="Age"
                                    className={`form-control form-add ${errors.unit ? 'is-invalid' : ''}`}

                                    displayEmpty >
                                    <MenuItem value="" disabled>
                                        Lựa chọn
                                    </MenuItem>
                                    <MenuItem value="GOI">Gói</MenuItem>
                                    <MenuItem value="KG">KG</MenuItem>
                                    <MenuItem value="CAI">Cái</MenuItem>
                                    <MenuItem value="HOP">Hộp</MenuItem>
                                </Select>
                                {errors.unit && <div className="invalid-feedback">{errors.unit}</div>}

                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Số Lương</span>
                                <input type="number" className={`form-control form-add ${errors.quantity ? 'is-invalid' : ''}`}

                                    name='quantity'
                                    value={product.quantity}
                                    onChange={handleChange}
                                    placeholder="Số Lương sản phẩm" />
                                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}

                            </div>
                        </div>
                     
                    </div>
                    <div className="row mb-4">
                        <div className="form-outline mb-4">
                            <span className='form-label'>Mô tả sản Phẩm</span>
                            <CKEditorComponent
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>


                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="boder-top"></div>
                <div className="col-span-full col-sm-4" style={{ paddingTop: '10px' }}>
                    <h4 className="text-base font-medium">Tải lên hình ảnh sản phẩm mới</h4>
                    <p className="mt-2">
                        Tải lên thư viện hình ảnh sản phẩm của bạn tại đây
                    </p>
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        {hasSelectedImages ? (
                            // Nếu đã chọn ảnh, hiển thị phần này
                            <div className="rounded-md border">
                                <div className="flex cursor-pointer items-center px-6  transition-all duration-300 justify-center">
                                    <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white">
                                        <button
                                            className="rizzui-button inline-flex font-medium items-center justify-center  duration-200 px-4 py-2 text-sm  rounded-md bg-transparent "
                                            type="">
                                            <font >
                                                <font >Clear files</font>
                                            </font>
                                        </button>
                                        <input
                                            className="rizzui-button inline-flex font-medium items-center justify-center  duration-200 px-4 py-2 text-sm  rounded-md border border-transparent"
                                            type="file"
                                            accept="application/pdf,image/*,video/*"
                                            multiple
                                            tabIndex={-1}
                                            onChange={handleFileChange} >
                                        </input>
                                    </div>
                                </div>
                                <div className="row" style={{ display: "flex" }}>
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="col-ms-3 col-image" style={{ position: "relative" }}>
                                            <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
                                            <button onClick={() => handleImageDelete(index)}
                                                style={{ position: "absolute", top: "5px", right: "5px", background: "transparent", border: "none" }}> Xóa
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-md border" onClick={handleUploadClick} >
                                <div className="flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300 justify-center">
                                    <input
                                        ref={fileInputRef}
                                        accept="application/pdf,image/*,video/*"
                                        tabIndex={-1}
                                        type="file"
                                        multiple
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />

                                    <FaCloudUploadAlt style={{ fontSize: "30px" }} />

                                    <div className="text-base font-medium">
                                        <font style={{ verticalAlign: "inherit" }}>

                                            <font style={{ verticalAlign: "inherit" }}>Thả hoặc chọn tập tin</font>
                                        </font>
                                    </div>
                                </div>


                            </div>


                        )}
                    </div>

                </div>

            </div>
            <div className="row mt-4" >
                <div className="boder-top"></div>
                <div className="col-span-full col-sm-4" style={{ paddingTop: '10px' }}>
                    <h4 className="text-base font-medium">Định giá</h4>
                    <p className="mt-2">
                        Thêm giá sản phẩm của bạn ở đây
                    </p>
                </div>
                <div className="col-sm-8">
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Giá Nhập</span>
                                <input type="number" className={`form-control form-add ${errors.importPrice ? 'is-invalid' : ''}`}

                                    name='importPrice'
                                    value={product.importPrice}
                                    onChange={handleChange}
                                    placeholder="Nhập Giá nhập" />
                                {errors.importPrice && <div className="invalid-feedback">{errors.importPrice}</div>}

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Giá Bán</span>
                                <input type="number" className={`form-control form-add ${errors.salePrice ? 'is-invalid' : ''}`}

                                    name='salePrice'
                                    value={product.salePrice}
                                    onChange={handleChange}
                                    placeholder="Nhập Giá Bán" />
                                {errors.salePrice && <div className="invalid-feedback">{errors.salePrice}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Giảm Giá</span>
                                <input type="number" className={`form-control form-add ${errors.discount ? 'is-invalid' : ''}`}

                                    name='discount'
                                    value={product.discount}
                                    onChange={handleChange}
                                    placeholder="Nhập Nhập Giám Giá" />
                                {errors.discount && <div className="invalid-feedback">{errors.discount}</div>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Đơn Ví Giám</span>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name='discountType'
                                    value={product.discountType}
                                    onChange={handleChange}
                                    label="Age"
                                    className={`form-control form-add ${errors.name ? 'is-invalid' : ''}`}


                                    displayEmpty

                                >
                                    <MenuItem value="" disabled>
                                        Chọn Giám Giá Theo
                                    </MenuItem>
                                    <MenuItem value={1}>% Phần trăm</MenuItem>
                                    <MenuItem value={2}>Đơn Vị VND</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div className="row mt-4" >
                <div className="boder-top"></div>
                <div className="col-span-full col-sm-4" style={{ paddingTop: '10px' }}>
                    <h4 className="text-base font-medium">Metadata</h4>
                    <p className="mt-2">
                        Điền đầy đủ thông tin bên dưới
                    </p>
                </div>
                <div className="col-sm-8">
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Tiêu đề meta</span>
                                <input type="text" className={`form-control form-add ${errors.metaTitle ? 'is-invalid' : ''}`}

                                    name='metaTitle'
                                    value={product.metaTitle}
                                    onChange={handleChange}
                                    placeholder="Nhập tiêu đề Meta của bạn" />
                                {errors.metaTitle && <div className="invalid-feedback">{errors.metaTitle}</div>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Từ khóa meta</span>
                                <input type="text" className={`form-control form-add ${errors.metaKeywords ? 'is-invalid' : ''}`}

                                    name='metaKeywords'
                                    value={product.metaKeywords}
                                    onChange={handleChange}
                                    placeholder="Nhập Từ Khóa Meta của bạn" />
                                {errors.metaKeywords && <div className="invalid-feedback">{errors.metaKeywords}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <span className='form-label'>Mô tả Meta</span>
                                <textarea className={`form-control ${errors.metaDescription ? 'is-invalid' : ''}`} id="metadescription"
                                    name='metaDescription'
                                    value={product.metaDescription}
                                    onChange={handleChange}
                                    rows="4" placeholder="Nhập mô tả Meta của bạn" ></textarea>
                                {errors.metaDescription && <div className="invalid-feedback">{errors.metaDescription}</div>}
                            </div>
                        </div>

                    </div>


                </div>

            </div>
            {/* button */}
            <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4">
                <button
                    className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 w-full @xl:w-auto"
                    type="button"

                >
                    <font >
                        <font >Làm Mới form</font>
                    </font>
                </button>
                <button
                    className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                    type="submit"
                    onClick={handleSubmitProduct}
                >
                    <font >
                        <font >Tạo sản phẩm</font>
                    </font>
                </button>
            </div>

        </form>
        </Spin>
    );
};

export default AddProductForm;
