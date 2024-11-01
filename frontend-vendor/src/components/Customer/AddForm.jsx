import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCustomer, addImageCustomer } from '../../redux/actions/customer-action';

const AddCustomerForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [customerDto, setCustomerDto] = useState({
        customerId: "",
        username: "",
        fullname: "",
        email: "",
        gender: "",
        password: "",
        phone: "",
        imageFile: null,
        image: null,
        dateOfBirth: "",
        registeredDate: "",
        status: ""
    });
    // 
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        // Xử lý trường input là file hoặc các trường thông tin khác
        const newValue = type === 'file' ? files[0] : value;

        setCustomerDto((prevDto) => ({
            ...prevDto,
            [name]: newValue,
        }));

        // Xóa lỗi khi người dùng bắt đầu gõ lại

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleCheckboxChange = (value) => {
        setCustomerDto((prevDto) => ({
            ...prevDto,
            gender: value,
        }));
    };
    //   
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the form
        const validationErrors = validateForm(customerDto);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Error adding customer:', customerDto);
        try {
            const customerId = await dispatch(addCustomer(customerDto));
            if (customerDto.imageFile && customerId !== null) {
                await dispatch(addImageCustomer(customerId, customerDto.imageFile));
            }            
            handleResetForm();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Ví dụ về kiểm tra, bạn cần điều chỉnh theo yêu cầu cụ thể của mình
        if (!data.username) {
            errors.username = 'Vui lòng nhập tên đăng nhập';
        }

        if (!data.fullname) {
            errors.fullname = 'Vui lòng nhập họ và tên';
        }

        if (!data.email) {
            errors.email = 'Vui lòng nhập địa chỉ email';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Địa chỉ email không hợp lệ';
        }

        if (!data.phone) {
            errors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!data.dateOfBirth) {
            errors.dateOfBirth = 'Vui lòng nhập ngày sinh';
        } else {
            const currentDate = new Date();
            const inputDate = new Date(data.dateOfBirth);

            if (inputDate >= currentDate) {
                errors.dateOfBirth = 'Ngày sinh phải ở quá khứ';
            }
            // Thêm các kiểm tra khác nếu cần
        }

        if (!data.password) {
            errors.password = 'Vui lòng nhập mật khẩu';
        } else if (data.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        return errors;
    };

    const handleResetForm = () => {
        const initialCustomerDto = {
            customerId: "",
            username: "",
            fullname: "",
            email: "",
            gender: "",
            password: "",
            phone: "",
            imageFile: null,
            image: null,
            dateOfBirth: "",
            registeredDate: "",
            status: ""
        };
        setCustomerDto(initialCustomerDto);
        setErrors({});
    };


    return (
        <>
            {/* Multi Columns Form */}
            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate="">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="col pt-4">
                            <label htmlFor="inputEmail5" className="form-label">
                                Tên 
                            </label>
                            <input
                                type="text"
                                className={`form-control form-add form-add ${errors.username ? 'is-invalid' : ''}`}

                                name="username"
                                value={customerDto.username}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}

                        </div>
                        <div className="col pt-4">
                            <label htmlFor="inputEmail5" className="form-label">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                className={`form-control form-add form-add ${errors.fullname ? 'is-invalid' : ''}`}
                                name="fullname"
                                value={customerDto.fullname}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}

                        </div>
                        <div className="col pt-4">
                            <label htmlFor="inputEmail5" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`form-control form-add form-add ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={customerDto.email}
                                onChange={handleChange}
                                required=""
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="pr">
                            {/* Hiển thị ảnh trước khi upload */}
                            {customerDto.imageFile && (
                                <img
                                    src={URL.createObjectURL(customerDto.imageFile)}
                                    alt="Preview"
                                    height="250px"
                                    width="200px"
                                />
                            )}
                        </div>
                        <label htmlFor="inputEmail5" className="form-label">
                            Image File
                        </label>{" "}
                        <br />
                        <input
                            type="file"
                            name="imageFile"
                            onChange={handleChange}
                            required=""
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className={`form-control form-add form-add ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        value={customerDto.password}
                        onChange={handleChange}
                        required=""
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {/*  */}
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                        SĐT
                    </label>
                    <input
                        type="number"
                        className={`form-control form-add form-add ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={customerDto.phone}
                        onChange={handleChange}
                        required=""
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        className={`form-control form-add form-add ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                        name="dateOfBirth"
                        value={customerDto.dateOfBirth}
                        onChange={handleChange}
                        required=""

                    />
                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}

                </div>
                <div className="col-12 " style={{ display: "flex" }}>
                    <div className="form-check form-check-inline" style={{ paddingRight: "40px" }}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="maleCheckbox"
                            checked={customerDto.gender === 'male'}
                            onChange={() => handleCheckboxChange('male')}
                            required=""
                        />
                        <label className="form-check-label" htmlFor="maleCheckbox">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline" style={{ paddingRight: "40px" }}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="femaleCheckbox"
                            checked={customerDto.gender === 'female'}
                            onChange={() => handleCheckboxChange('female')}
                            required=""
                        />
                        <label className="form-check-label" htmlFor="femaleCheckbox">
                            Female
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="differentCheckbox"
                            checked={customerDto.gender === 'different'}
                            onChange={() => handleCheckboxChange('different')}
                            required=""
                        />
                        <label className="form-check-label" htmlFor="differentCheckbox">
                            Different
                        </label>
                    </div>
                </div>

                {/* button */}
                <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4">
                    <button
                        className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md bg-transparent border focus-visible:ring-offset-2 border-gray-300 hover:enabled:border-gray-1000 focus-visible:enabled:border-gray-1000 focus-visible:ring-gray-900/30 w-full @xl:w-auto"
                        type="button"
                        onClick={handleResetForm}
                    >
                        <span>Làm mới Form</span>
                    </button>
                    <button
                        className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm h-10 rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                        type="submit">
                        <font >
                            <font >Tạo Khách hàng</font>
                        </font>
                    </button>
                </div>

            </form >
        </>

    );
};

export default AddCustomerForm;
