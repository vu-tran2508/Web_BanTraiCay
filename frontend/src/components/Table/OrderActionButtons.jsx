import React, { useState } from 'react';
import { Button, Space, Modal, Input } from 'antd';
import { AiOutlineClose, AiOutlineMessage, AiOutlineUndo, AiOutlineReload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderActionButtons = ({ status, onCancel, onContactSeller, onReturn, onReorder,onconfirmOrder }) => {
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);
    // Thêm state để theo dõi trạng thái của Modal xác nhận đơn hàng
const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [content, setContactContent] = useState('');
    const [cancelReason, setCancelReason] = useState('');
    const showCancelModal = () => {
        setIsCancelModalVisible(true);
    };

    const showContactModal = () => {
        setIsContactModalVisible(true);
    };

    const handleCancel = () => {
        // Thực hiện logic khi hủy đơn hàng và truyền lý do hủy
        if(!cancelReason){
            toast.error('Vui lòng nhập lý do hủy đơn hàng.', { position: toast.POSITION.TOP_RIGHT });
            return;
        }else{
            onCancel(cancelReason);
            // Đặt giá trị lý do về rỗng sau khi xác nhận hủy
            setCancelReason('');
            setIsCancelModalVisible(false);

        }
    
    };

    const handleContactSeller = () => {
        // Hiển thị modal để nhập nội dung liên hệ
        setIsContactModalVisible(true);
    };

    const handleContactModalOk = () => {
        // Gọi hàm callback và truyền nội dung từ textarea
        onContactSeller(content);
        // Đặt giá trị textarea về rỗng sau khi gửi liên hệ
        setContactContent('');
        // Đóng modal
        setIsContactModalVisible(false);
    };

    const handleContactModalCancel = () => {
        // Đặt giá trị textarea về rỗng khi hủy
        setContactContent('');
        setIsContactModalVisible(false);
    };
// xác nhận đơn hàng 
const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
};

const handleConfirmModalOk = () => {
    // Gọi hàm xác nhận đơn hàng và đóng modal sau khi xác nhận
    onconfirmOrder();
    setIsConfirmModalVisible(false);
};

const handleConfirmModalCancel = () => {
    // Đóng modal nếu người dùng hủy xác nhận
    setIsConfirmModalVisible(false);
};



    const renderButtons = () => {
        switch (status) {
            case 'WAITING':
                return (
                    <Space>
                        <Button type="dashed" icon={<AiOutlineClose />} onClick={showCancelModal}>
                            Hủy đơn hàng
                        </Button>
                        <Button type="default" icon={<AiOutlineMessage />} onClick={showContactModal}>
                            Liên hệ người bán
                        </Button>
                    </Space>
                );
            case 'CONFIRMED':
                return (
                    <Button type="default" icon={<AiOutlineMessage />} onClick={showContactModal}>
                        Liên hệ người bán
                    </Button>
                );
            case 'SHIPPED':
                return (
                    <Space>
                    <Button type="primary" icon={<AiOutlineReload />} onClick={showConfirmModal}>
                        Đã Nhận Hàng
                    </Button>
                    <Button type="danger" icon={<AiOutlineUndo />} onClick={showContactModal}>
                        Liên hệ người bán
                    </Button>
                    <Modal
                        title="Xác nhận đã nhận hàng"
                        visible={isConfirmModalVisible}
                        onOk={handleConfirmModalOk}
                        onCancel={handleConfirmModalCancel}
                    >
                        <p>Bạn có chắc chắn đã nhận được hàng?</p>
                    </Modal>
                </Space>
                );
            case 'COMPLETED':
                return (
                    <Space>
                        <Button type="danger" icon={<AiOutlineUndo />} onClick={onReturn}>
                            Trả hàng
                        </Button>
                        <Button type="primary" icon={<AiOutlineReload />} onClick={onReorder}>
                            Mua lại
                        </Button>
                    </Space>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {renderButtons()}
            <Modal
                title="Xác nhận hủy đơn hàng"
                visible={isCancelModalVisible}
                onOk={handleCancel}
                onCancel={() => setIsCancelModalVisible(false)}
            >
                <p>Bạn có chắc chắn muốn hủy đơn hàng?</p>
                {/* Thêm Input để nhập lý do */}
                <Input
                    placeholder="Nhập lý do hủy đơn hàng"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                />
            </Modal>
            <Modal
                title="Liên hệ người bán"
                visible={isContactModalVisible}
                onCancel={handleContactModalCancel}
                onOk={handleContactModalOk}
            >
                <p>Nội dung liên hệ:</p>
                {/* Thêm các trường nhập nội dung liên hệ hoặc sử dụng TextArea của Ant Design */}
                {/* Ví dụ: */}
                <Input.TextArea value={content}
                    onChange={(e) => setContactContent(e.target.value)} />
            </Modal>
        </div>
    );
};

export default OrderActionButtons;
