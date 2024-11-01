import React from 'react';



const FormInfo = () => {


    return (
        <div className="reply-comment" id="comments">
            <h2 className="title_form">
                <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>Để lại một bình luận</font>
                </font>
            </h2>
            <form
                method="post"
                action="/blogs/news/we-must-put-consumers-first/comments#comment_form"
                id="comment_form"
                acceptCharset="UTF-8"
                className="comment-form"
                onsubmit='window.Shopify.recaptchaV3.addToken(this, "new_comment"); return false;'
            >
                <input type="hidden" name="form_type" defaultValue="new_comment" />
                <input type="hidden" name="utf8" defaultValue="✓" />
                <div className="post-form">
                    <p className="contact-name">
                        <input
                            className=""
                            name="comment[author]"
                            defaultValue=""
                            placeholder="Tên tài khoản*"
                            type="text"
                            required=""
                        />
                    </p>
                    <p className="contact-email">
                        <input
                            className=""
                            name="comment[email]"
                            defaultValue=""
                            placeholder="E-mail*"
                            type="email"
                            required=""
                        />
                    </p>
                    <p className="contact-message">
                        <textarea
                            className=""
                            name="comment[body]"
                            placeholder="Bình luận của bạn*"
                            cols={30}
                            rows={10}
                            required=""
                            defaultValue={""}
                        />
                    </p>
                    <p className="contact-submit">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>
                                <input className="shop-button" type="submit" defaultValue="Nộp" />
                            </font>
                        </font>
                    </p>
                </div>
            </form>
        </div>





    )
}

export default FormInfo