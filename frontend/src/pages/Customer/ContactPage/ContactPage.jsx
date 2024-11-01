import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactPage.css'

import brand from '../../../assets/images/even/banner.jpg';
import icon1 from '../../../assets/images/blog/icon1.png';
import icon2 from '../../../assets/images/blog/icon2.png';
import icon3 from '../../../assets/images/blog/icon3.png';
import contact from '../../../assets/images/blog/contact-right.png';
const ContactPage = () => {


    return (
        <div className='ContactPage'>
            <section
                className="page-banner text-white py-165 rpy-130"
                style={{ backgroundImage: `url(${brand})` }}
            >
                <div className="container">
                    <div className="banner-inner">
                        <h1
                            className="page-title wow fadeInUp delay-0-2s"
                            style={{ visibility: "visible" }}
                        >
                            Liên hệ chúng tôi
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol
                                className="breadcrumb justify-content-center wow fadeInUp delay-0-4s"
                                style={{ visibility: "visible" }}
                            >
                                <li className="breadcrumb-item">
                                    <a href="/">Trang chủ </a>
                                </li>
                                <li className="breadcrumb-item active">Liên hệ chúng tôi</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className='section'>
                <div className="container">
                    <div className="contact-title">
                        <span>Liên lạc</span>
                        <h3>Cần tư vấn?</h3>
                    </div>
                    <div className="row">
                        <div className="contact-form">
                            <div className="local-form">
                                <div className="icon">
                                    <img src={icon1} alt="icon" />
                                </div>
                                <div className="content">
                                    <h4>Location</h4>
                                    <span>57 Main Street, 2nd Block 3rd Floor, New York</span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <div className="email-form">
                                <div className="icon">
                                    <img src={icon2} alt="icon" />
                                </div>
                                <div className="content">
                                    <h4>Email Us</h4>
                                    <a href="">organicfarm@mail.net</a>
                                    <br />
                                    <a href="">support@info.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <div className="phone-form">
                                <div className="icon">
                                    <img src={icon3} alt="icon" />
                                </div>
                                <div className="content">
                                    <h4>Phone Us</h4>
                                    <a href="">+000 (111) 345 678</a>
                                    <br />
                                    <a href="">+012 (345) 678 99</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <form action="">
                                <div className="section-title">
                                    <span>Liên hệ với chúng tôi</span>
                                    <h3>Gửi tin nhắn cho chúng tôi</h3>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                className="form-control"
                                                placeholder="Full Name"
                                                data-error="Please enter your name"
                                                defaultValue=""
                                            />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type=""
                                                name=""
                                                id=""
                                                className="form-control"
                                                placeholder="Phone Number"
                                                data-error="Please enter your phone"
                                                defaultValue=""
                                            />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name=""
                                                id=""
                                                className="form-control"
                                                placeholder="Email"
                                                data-error="Please enter your email"
                                                defaultValue=""
                                            />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                id=""
                                                cols={60}
                                                rows={4}
                                                className="form-group"
                                                placeholder="Write Message"
                                                data-error="Please enter your message"
                                                defaultValue={""}
                                            />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-0">
                                            <button type="submit" className="theme-btn style-two">
                                                Send Message <i className="fas fa-angle-double-right" />
                                            </button>
                                            <div className="hidden" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <div
                                className="contact-right-image wow fadeInRight delay-0-4s"
                                style={{ visibility: "visible" }}
                            >
                                <img src={contact} alt="Contact From" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ContactPage