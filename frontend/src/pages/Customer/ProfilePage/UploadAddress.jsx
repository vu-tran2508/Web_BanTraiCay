import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import ModalAddressForm from '../../../components/ModalCart/ModalAddressForm';
import './UserProfile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAddress, getAddressCustomer} from '../../../services/address';

const UploadAddress = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        code: null,
        name:null,
        city: null,
        district: null,
        ward: null,
        streetNumber: null,
    });
    const [customerId, setCustomerId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        // Lấy customerId từ localStorage khi component được render
        const storedUserData = localStorage.getItem("customer");
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData) {
            setCustomerId(parsedUserData.customerId);
        }
    }, []);

    useEffect(() => {
        // Gọi API để lấy danh sách địa chỉ khi customerId thay đổi
        if (customerId !== null) {
            fetchAddresses();
        }
    }, [customerId]);

    const fetchAddresses = async () => {
        try {
            const response = await getAddressCustomer(customerId);
            setAddresses(response || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            toast.error('Lấy danh sách địa chỉ thất bại!', { position: toast.POSITION.TOP_RIGHT });
        }
    };

    // Trong UploadAddress, thêm state để lưu địa chỉ cần chỉnh sửa
const [editingAddress, setEditingAddress] = useState(null);

// Khi người dùng nhấn nút chỉnh sửa, set giá trị cho editingAddress
const handleEditAddress = (address) => {
  setEditingAddress(address);
  showModal();
};



    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            console.log("ĐỊA CHỈ ",selectedAddress);
            // Gọi API để thêm địa chỉ, truyền customerId và địa chỉ được chọn
           const responseData = await addAddress(customerId, selectedAddress);
            console.log('Address added successfully:', responseData);
            toast.success('Thêm địa chỉ thành công!', { position: toast.POSITION.TOP_RIGHT });
            setIsModalOpen(false);
             // Sau khi thêm địa chỉ, cập nhật danh sách địa chỉ
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error('Thêm địa chỉ thất bại!', { position: toast.POSITION.TOP_RIGHT });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };





    return (
        <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-border-base sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
            <div className="flex flex-col justify-between h-full -mt-4 text-15px md:mt-0">
                <div className=" grid grid-cols-2L gap-A auto-rows-auto">
                    <label className="sr-only" id="headlessui-label" role="none">address</label>
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <div key={index} className="border-brand border-2 relative mdL rounded-md p-5 block cursor-pointer min-h-[112px] h-full group border-border-base address__box relative">
                                <h3 className="mb-2 -mt-1 font-semibold text-brand-dark" id="headlessui-label-:r2g:">
                                    {address.name || 'N/A'}
                                </h3>
                                <div className="leading-6 text-brand-muted" id="headlessui-description-:r2h:">
                                    {address.streetNumber || 'N/A'} , {address.ward || 'N/A'} , {address.district || 'N/A'},{address.city || 'N/A'}
                                </div>
                                <div className="absolute-top-right">
                                    <button className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
                                        onClick={() => handleEditAddress(address)}
                                    >
                                        <span className="sr-only">Home</span>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            version="1.2"
                                            baseProfile="tiny"
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 6.879l-3.879-3.879c-.293-.293-.678-.439-1.061-.439-.384 0-.767.146-1.06.439l-10.939 10.939c-.293.293-.558.727-.75 1.188-.192.463-.311.959-.311 1.373v4.5h4.5c.414 0 .908-.119 1.371-.311.463-.192.896-.457 1.189-.75l10.94-10.939c.293-.293.439-.678.439-1.061 0-.384-.146-.767-.439-1.06zm-15.232 8.182l8.293-8.293 1.232 1.232-8.293 8.293-1.232-1.232zm1.732 3.939h-1.5l-1-1v-1.5c0-.077.033-.305.158-.605.01-.02 2.967 2.938 2.967 2.938-.322.134-.548.167-.625.167zm1.439-.768l-1.232-1.232 8.293-8.293 1.232 1.232-8.293 8.293zm9-9l-3.172-3.172 1.293-1.293 3.17 3.172-1.291 1.293z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No addresses available.</p>
                    )}

                    <button
                        className="w-full border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
                        style={{ color: "#699c47" }}
                        onClick={showModal}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 1024 1024"
                            className="is"
                            height={18}
                            width={18}
                            xmlns="http://www.w3.org/2000/svg"
                            role="none"
                        >
                            <path
                                d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"
                                role="none"
                            />
                            <path
                                d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"
                                role="none"
                            />
                        </svg>
                        Add Address
                    </button>



                </div>



            </div>

            <Modal title="NHẬP ĐỊA CHỈ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ModalAddressForm onAddressSelect={setSelectedAddress} editingAddress={editingAddress}/>

            </Modal>

        </div>


    );
};

export default UploadAddress;
