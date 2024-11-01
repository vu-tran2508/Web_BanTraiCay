import React from 'react';
import './sectionImge.css'; // Import CSS file

const BannerSection = () => {
  return (
    <div>
      <div className="vp-cont" style={{ height: '100%', cursor: 'pointer', margin: '0' }}>
        <a className="shine" href="/products/products-listing/p/63f74932d69b9b001247317a">
          <img
            className="laz-img wah-bc"
            style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }}
            alt="banner image"
            src="https://resources.commerceup.io?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FpWVdUiFHtKGqyJxESltt%2Fresources%2Fimage-Yji4IYokU.png&amp;width=2000&amp;resourceKey=pWVdUiFHtKGqyJxESltt&amp;background=no"
          />
        </a>
      </div>
      <div className="desktopScreen w-content" style={{ display: 'grid', columnCount: 2, columnGap: '0px', background: 'url("") 0% 0% / cover rgb(255, 255, 255)', margin: '0%', padding: '1% 5% 0%', border: '0px solid rgb(224, 224, 224)', gridTemplateColumns: 'auto auto' }}>
        <div style={{ width: '683.55px' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <div style={{ background: 'rgb(255, 255, 255)', margin: '0% 4% 4% 0%', padding: '0%' }}>
              <div>
                <div className="vp-cont" style={{ height: '100%', cursor: 'pointer' }}>
                  <a className="shine" href="/products/products-listing/p/619a4c4013b0cf0011021c47">
                    <img
                      className="laz-img wah-bc"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }}
                      alt="banner image"
                      src="https://resources.commerceup.io?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FpWVdUiFHtKGqyJxESltt%2Fresources%2Fimage-Zb3rp2gvd.jpg&amp;width=1000&amp;resourceKey=pWVdUiFHtKGqyJxESltt&amp;background=no"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '683.55px' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <div style={{ background: 'rgb(255, 255, 255)', margin: '0% 4% 4% 0%', padding: '0%' }}>
              <div>
                <div className="vp-cont" style={{ height: '100%', cursor: 'pointer' }}>
                  <a className="shine" href="/products/products-listing/p/60c4a9c1752cd20012f36ba2">
                    <img
                      className="laz-img wah-bc"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }}
                      alt="banner image"
                      src="https://resources.commerceup.io?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FpWVdUiFHtKGqyJxESltt%2Fresources%2Fimage-6fX0Uniar.jpeg&amp;width=1000&amp;resourceKey=pWVdUiFHtKGqyJxESltt&amp;background=no"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="delivery-sec">
          <div className="container container-logo">
            <div className="row">
              <img src="https://prod-admin-images.s3.ap-south-1.amazonaws.com/pWVdUiFHtKGqyJxESltt/resources/image-lm3DrqrF3.gif" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerSection;
