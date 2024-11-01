import React, { useState, useEffect } from 'react';
import { fetchCityData } from '../../services/address';

const ModalAddressForm = ({onAddressSelect }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [streetNumber, setStreetNumber] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCityData();
                setCities(data);
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const selectedCityData = cities.find(city => city.code === parseInt(selectedCity));

            if (selectedCityData) {
                setDistricts(selectedCityData.districts || []);
                setSelectedDistrict(null);
                setWards([]);
            } else {
                console.error(`City with code ${selectedCity} not found in the cities array.`);
            }
        }
    }, [selectedCity, cities]);

    useEffect(() => {
        if (selectedDistrict) {
            const selectedDistrictData = districts.find(district => district.code === parseInt(selectedDistrict));
            setWards(selectedDistrictData?.wards || []);
        }
    }, [selectedDistrict, districts]);

    useEffect(() => {
        if (selectedCity && selectedDistrict && selectedWard) {
            // Tìm đối tượng thành phố từ mã thành phố
            const selectedCityData = cities.find(city => city.code === parseInt(selectedCity));

            // Tìm đối tượng quận/huyện từ mã quận/huyện
            const selectedDistrictData = selectedCityData?.districts.find(district => district.code === parseInt(selectedDistrict));
            // Tìm đối tượng phường/xã từ mã phường/xã
            const selectedWardData = selectedDistrictData?.wards.find(ward => ward.code === parseInt(selectedWard));
            // Kiểm tra xem có thành phố, quận/huyện, và phường/xã tương ứng không
            if (selectedCityData && selectedDistrictData && selectedWardData) {
                const streetNumber = document.getElementById("street-number").value;
                const name = document.getElementById("name-number").value;
                const selectedAddress = {
                    code: selectedCityData.code,
                    city: selectedCityData.name,
                    district: selectedDistrictData.name,
                    ward: selectedWardData.name,
                    streetNumber: streetNumber,
                    name: name,
                };
                // Gọi hàm callback được truyền từ DeliveryInformation
                onAddressSelect(selectedAddress);
            }
        }
    }, [selectedCity, selectedDistrict, selectedWard, cities, onAddressSelect]);


 

    return (
        <div className="checkoutPage" style={{padding:10}}>

            <div className="section-content">
                <div className="fieldset">
                    <div className="order-checkout__loading radio-wrapper content-box-row content-box-row-padding content-box-row-secondary ">
                    <div className="field field-required  mt-4" >
                            <div className="field-input-wrapper">
                                <label className="field-label">Tên Địa chỉ</label>
                                <input
                                    placeholder="Tên Địa chỉ"
                                    className="field-input"
                                    size={30}
                                    type="text"
                                    id="name-number"  // Thêm id vào đây

                                />
                            </div>
                        </div>
                       
                       
                        <div className="field field-required  ">
                            <div className="field-input-wrapper">
                                <label className="field-label">Địa chỉ</label>
                                <input
                                    placeholder="Địa chỉ"
                                    className="field-input"
                                    size={30}
                                    type="text"
                                    id="street-number"  // Thêm id vào đây

                                />
                            </div>
                        </div>
                        <div className="field field-show-floating-label field-required field-third ">
                            <div className="field-input-wrapper field-input-wrapper-select">
                                <label
                                    className="field-label"
                                    htmlFor="customer_shipping_province"
                                >
                                    {" "}
                                    Tỉnh / thành{" "}
                                </label>
                                <select
                                    className="field-input"
                                    onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity || ''}
                                >
                                    <option
                                        data-code="null"
                                        value="null"
                                        selected=""
                                    >
                                        Chọn tỉnh / thành{" "}
                                    </option>
                                    {cities.map(city => (
                                        <option key={city.code} value={city.code}>{city.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className="field field-show-floating-label field-required field-third ">
                            <div className="field-input-wrapper field-input-wrapper-select">
                                <label className="field-label">
                                    Quận / huyện
                                </label>
                                <select
                                    className="field-input"
                                    onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict || ''}
                                >
                                    <option
                                        data-code="null"
                                        value="null"
                                        selected=""
                                    >
                                        Chọn quận / huyện
                                    </option>
                                    {districts.map(district => (
                                        <option key={district.code} value={district.code}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="field field-show-floating-label field-required  field-third  ">
                            <div className="field-input-wrapper field-input-wrapper-select">
                                <label className="field-label">
                                    Phường / xã
                                </label>
                                <select
                                    className="field-input"
                                    onChange={(e) => setSelectedWard(e.target.value)}
                                    value={selectedWard || ''}

                                >
                                    <option
                                        data-code="null"
                                        value="null"
                                        selected=""
                                    >
                                        Chọn phường / xã
                                    </option>
                                    {wards.map(ward => (
                                        <option key={ward.code} value={ward.code}>{ward.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>


                </div>
            </div>


        </div>
    );
};

export default ModalAddressForm;
