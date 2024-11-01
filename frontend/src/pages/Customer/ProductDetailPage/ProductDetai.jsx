import React, { useEffect, useState } from 'react';
import './ProductDetai.css';
import { FaRegHeart, FaShoppingBasket, FaFacebookF, FaWhatsapp, FaRegStar } from 'react-icons/fa';
import { Tabs, Form, Input, Button, Rate, Row, Col, notification, Empty,Spin } from 'antd';
import { FaCircle } from "react-icons/fa6";
import { fetchProductDetail } from '../../../redux/actions/product-aciton';
import { useParams } from "react-router-dom";
import ProductCommentService from '../../../services/ProductCommentService';
import { formatPrice } from '../../../redux/actions/cart-action';
import { toast } from 'react-toastify';
const { TabPane } = Tabs;
const { TextArea } = Input;

const ProductDetail = () => {
  const [form] = Form.useForm();
  const { productId } = useParams();
    const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueRate, setValueRate] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProductDetail(productId);
        setProductDetail(result);
        if (result && result.images.length > 0) {
          setSelectedImage(result.images[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle error
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productComments = await ProductCommentService.getProductCommentsByProduct(productId);
        setComments(productComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("customer");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      form.setFieldsValue({
        customerId: parsedUserData.customerId || "",
        username: parsedUserData.username || "",
        fullname: parsedUserData.fullname || "",
        email: parsedUserData.email || "",
      });
    }
  }, [form]);


  if (!productDetail) {
    return <p>Loading...</p>;
  }

  const { images } = productDetail;
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const desc = ['kinh khủng', 'xấu', 'Bình thường', 'Tốt', 'tuyệt vời'];
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const commentRequest = {
        customerId: values.customerId,
        starRating: values.rating,
        fullname: values.fullname,
        detail: values.message,
        email: values.email,
        productId: productId,
      };
      console.log("THÔNG TIN", commentRequest);

      await ProductCommentService.addProductComment(commentRequest);

      notification.success({
        message: 'Đã gửi bình luận thành công!',
      });
      // Fetch the updated list of comments after adding a new comment
      const updatedComments = await ProductCommentService.getProductCommentsByProduct(productId);
      setComments(updatedComments);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Lỗi khi bình luận sản phẩm !', { position: toast.POSITION.TOP_RIGHT });
      console.error('Error submitting comment:', error);
    }
  };
  const productDescription = productDetail.product.description;

  return (
    <Spin spinning={loading} size="large" tip="Loading...">
    <main style={{ backgroundColor: "rgb(255, 255, 255)", minHeight: "100vh" }}>
      <div className="pdp-t3">
        <div className="container-fluid ">
          <div className="row top-container-padding">
            <div className="imgContainer col-lg-7">
              <app-product-model style={{ width: "100%" }}>
                <div
                  className="d-flex imageModel"
                  style={{ flexDirection: "column" }}
                >
                  {/* Hiển thị ảnh đầu tiên trong mảng */}
                  <div className="imgCont">
                    <div className="ngxImageZoomContainer" style={{ width: 535, height: 535 }}>
                      <img
                        className="ngxImageZoomThumbnail"
                        src={`http://localhost:8080/api/home/image/${selectedImage}`}
                        alt={`Product Image`}
                      />
                    </div>
                  </div>

                  {/* Hiển thị danh sách các ảnh */}
                  <div className="d-flex flex-wrap thumbanial-cntnr">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbImg me-1 ${image === selectedImage ? 'active' : ''}`}
                        onClick={() => handleImageClick(image)}
                      >
                        <img
                          style={{ objectPosition: 'contain' }}
                          src={`http://localhost:8080/api/home/image/${image}`}
                          alt={`Product Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </app-product-model>
            </div>
            <div className="mainContent col-lg-5 mt-4 mt-lg-0">
              <div className="country">
                <h4> {productDetail.product.supplier.nation} </h4>
              </div>
              <div className="d-flex">
                <div className="pdp-heart">
                  <h1>{productDetail.product.name}</h1>
                </div>
                <div className="ms-auto">
                  <div className="brandImg shadow-sm">
                    <img
                      alt="Chiquita"
                      src="https://resources.commerceup.io?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FpWVdUiFHtKGqyJxESltt%2Fbanner%2Fimage-9UpH3fpH1.jpg&width=1000&resourceKey=pWVdUiFHtKGqyJxESltt&background=no"
                    />
                  </div>
                </div>
              </div>
              <div className="d-none d-lg-flex align-items-center flex-wrap in-stock-cntnr">
                <h4 className="sku-code"> Mã: #0{productDetail.product.productId} </h4>
                <div className="d-flex flex-wrap align-items-center t3-reviewCount me-5">
                  <div className="reviewStars me-2 me-xl-2">
                    <div>
                      <span className="fa-regular fa-star">
                        <FaRegStar />
                      </span>
                      <span className="fa-regular fa-star">
                        <FaRegStar />
                      </span>
                      <span className="fa-regular fa-star">
                        <FaRegStar />
                      </span>
                      <span className="fa-regular fa-star">
                        <FaRegStar />
                      </span>
                      <span className="fa-regular fa-star">
                        <FaRegStar />
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4
                      className="ms-auto"
                      style={{
                        fontWeight: 400,
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        fontSize: 17,
                        marginBottom: 0
                      }}
                    >

                      <FaCircle className="fa-solid fa-circle"
                        style={{ fontSize: 10, color: "#2dc327" }} />
                      &nbsp; Trong kho{" "}
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="approx-div"
                style={{ color: "#919191", fontSize: 15 }}
              >
                <p>
                  <strong style={{ color: "#000" }}>Notes</strong> Khoảng 1 kg mỗi
                  gói
                </p>
              </div>
              <div className="pdp-t3-pricing d-flex space-between-align align-items-baseline">
                <div>
                  <div className="d-flex align-items-center">
                    <span
                      className="t3-mainPrice me-3"
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#40b87b",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {" "}
                      {formatPrice(productDetail.product.salePrice)}{" "}
                      <span
                        style={{
                          fontSize: 18,
                          color: "#acacac!important",
                          fontWeight: 700
                        }}
                      >
                        &nbsp;/&nbsp;{productDetail.product.unit}{" "}
                      </span>
                    </span>
                  </div>
                </div>
                <div />
              </div>
              <div className="you-saave-sec">
                <h4 className="mb-1 mt-2">
                  <span>(Đã bao gồm VAT)</span>
                </h4>
              </div>
              <div />
              <div
                className="mt-4 y-3 px-2 px-lg-3"
                style={{ background: "#f7f7f7", borderRadius: 6, maxWidth: 500 }}
              >
                <div
                  className="delivery-label align-items-center p-2"
                  style={{ background: "#f7f7f7" }}
                >
                  <div
                    className="w-100 d-flex justify-content-between delivery-area"
                    style={{ cursor: "pointer" }}
                  >
                    <p className="flex-wrap m-0">
                      Giao hàng đến: <strong> Đà Nẵng </strong>
                    </p>
                    <span>
                      <i
                        className="fa-solid fa-chevron-right m-1"
                        style={{ color: "rgb(115, 183, 125)" }}
                      />
                    </span>
                  </div>
                  <div className="w-100 d-flex align-items-center">
                    <div style={{ width: "80%" }}>
                      <div className="w-100">
                        <div
                          className="d-flex flex-column"
                          style={{ fontSize: 12 }}
                        >
                          <div>
                            {" "}
                            Đặt hàng trong <span className="ms-1"> 1 phút</span> và nhận giao hàng bằng
                          </div>

                          <div>
                            <p className="flex-wrap m-0">
                              <strong> Hôm nay , ngày 31 tháng 10</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-center align-items-end"
                      style={{ width: "35%" }}
                    >
                      <img
                        style={{ width: "100%", height: 34, objectFit: "contain" }}
                        src="https://prod-admin-images.s3.ap-south-1.amazonaws.com/pWVdUiFHtKGqyJxESltt/resources/image-KNe-Fb3KX.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pdp-t3-cart d-flex align-items-center">
                <div className="hear-box-btn">
                  <button className="t3-cart" >

                    <FaShoppingBasket className='fa-shopping' />
                    Add to Bag
                  </button>
                  <button className="t3-wishlist d-flex align-items-center justify-content-center wishlis-mobile-btn">
                    <div />
                    <div className="wish-desktop">

                      <FaRegHeart />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pdp-t3-share d-flex justify-content-lg-start mt-4 align-items-center">
          <h4 className="share-friends-pd">Chia sẻ với bạn bè</h4>
          <div className="socica-icon-wrap">
            <FaFacebookF className="fa-brands fa-facebook-f sb-icon"
              style={{
                color: "#000!important",
                backgroundColor: "transparent!important",
                border: "none !important",
                fontSize: 24,
                margin: 20

              }} />
            <FaWhatsapp className="fa-brands fa-whatsapp"
              style={{
                color: "#000!important",
                backgroundColor: "transparent!important",
                border: "none !important",
                fontSize: 24
              }} />
          </div>
        </div>
      </div>

      <div className="w-full comment-Tabs">
        <div className="form-mains">
          <div className="form-details">
            <div className="form">
              <div className="tab-content">

                <Tabs defaultActiveKey="1" type="card">
                  <TabPane tab="Product Details" key="1">
                    {/* Nội dung của tab Product Details */}
                    <div className="tab-pane fade show active">
                      <div className="form-detail">
                        <div className="content">

                          <div dangerouslySetInnerHTML={{ __html: productDescription }} />

                        </div>
                        {/* <div className="table-detail">
                          <h3>Nutrition Facts</h3>
                          <div className="border rounded border-border-four">
                            <table className="table-bordered">
                              <thead>
                                <tr className="border-b border-border-four">
                                  <th className="th1">
                                    Amount per serving <br />
                                    <span className="">Calories</span>
                                  </th>
                                  <th className="px-4 py-3 text-end fs-1">70</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="font-normal border-b border-border-four last:border-b-0">
                                  <td className="px-4 py-3 lg:px-5 xl:px-6 ">Total Fat 5g</td>
                                  <td className="w-24 px-4 py-3 text-end">6%</td>
                                </tr>
                                <tr className="font-normal border-b border-border-four last:border-b-0">
                                  <td className="px-4 py-3 lg:px-5 xl:px-6 ">Cholesterol 185mg</td>
                                  <td className="w-24 px-4 py-3 text-end">62%</td>
                                </tr>
                                <tr className="font-normal border-b border-border-four last:border-b-0">
                                  <td className="px-4 py-3 lg:px-5 xl:px-6    ">Sodium 70mg</td>
                                  <td className="w-24 px-4 py-3 text-end">49%</td>
                                </tr>
                                <tr className="font-normal border-b border-border-four last:border-b-0">
                                  <td className="px-4 py-3 lg:px-5 xl:px-6 ">
                                    Total Carbohydrate 0g
                                  </td>
                                  <td className="w-24 px-4 py-3 text-end">18%</td>
                                </tr>
                                <tr className="font-normal border-b border-border-four last:border-b-0">
                                  <td className="px-4 py-3 lg:px-5 xl:px-6 ">Protein 6g</td>
                                  <td className="w-25 px-4 py-3 text-end">35%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Review Rating" key="2">
                    {/* Nội dung của tab Review Rating */}
                    <div className="tab-pane fade show active">
                      <div className="comment row">
                        <div className="limitHeight pt-2 col-7">
                          <div className="scroll-container">
                            {comments.length > 0 ? (
                              comments.map((comment) => (
                                <div key={comment.commentId} className="comment-card row">
                                  <div className="image col-2">
                                    {/* Thêm logic để hiển thị hình ảnh người bình luận */}
                                    <img src={`http://localhost:8080/api/home/image/${comment.customer.image}`} alt={comment.customer.image} />
                                  </div>
                                  <div className="content-comment col-10">
                                    <div className="star">
                                      <Rate value={comment.starRating} disabled />
                                    </div>
                                    <h3>{comment.customer.fullname}</h3>
                                    <p>{comment.detail}</p>
                                    <p className="font-monospace lh-1 " style={{ color: 'rgb(64, 184, 123)' }}>
                                      Ngày: {comment.createDate}
                                    </p>
                                    <div className="author">
                                      By <span>{comment.customer.fullname}</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <Empty description="Không có bình luận" />
                            )}
                          </div>
                        </div>
                        <div className="evaluate col-5">
                          <h3 className="text-brand-dark fs-6 text-15px mb-2">Viết đánh giá của bạn</h3>
                          <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px">
                            Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu*
                          </p>
                          <Form form={form} onFinish={handleSubmit}>
                            <div className="evaluate-form">
                              <Form.Item
                                label="customerId *"
                                name="customerId"
                                rules={[{ required: true, message: 'Please enter your name!' }]}
                                style={{ display: 'none' }}
                              >
                                <Input placeholder="Enter your name" />
                              </Form.Item>

                              <div className="review">
                                <Form.Item
                                  label="Đánh giá của bạn *"
                                  name="rating"
                                  rules={[{ required: true, message: 'Please rate your experience!' }]}
                                >
                                  <Rate tooltips={desc} />
                  
                                </Form.Item>
                              </div>
                              <Form.Item
                                label="Name *"
                                name="fullname"
                                rules={[{ required: true, message: 'Please enter your name!' }]}
                              >
                                <Input placeholder="Enter your name" />
                              </Form.Item>
                              <Form.Item
                                label="Message *"
                                name="message"
                                rules={[{ required: true, message: 'Please enter your message!' }]}
                              >
                                <TextArea placeholder="Enter your message" maxLength={250} rows={3} />
                              </Form.Item>

                              <Form.Item
                                label="Email *"
                                name="email"
                                rules={[
                                  { required: true, message: 'Please enter your email!' },
                                  { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                              >
                                <Input placeholder="Enter your email" />
                              </Form.Item>
                              <div className="pt-3" style={{ height: '3rem' }}>
                                <Button
                                  className="btn btn-success"
                                  style={{ height: 56, width: 126, fontSize: '1.25rem', fontWeight: 600 }}
                                  type="primary"
                                  htmlType="submit"
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>



                  </TabPane>
                </Tabs>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </Spin>
  );
};

export default ProductDetail;
