import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import side1 from '../../assets/images/even/brand.png';
import side2 from '../../assets/images/even/bran2.jpeg';
import side3 from '../../assets/images/even/bran3.jpeg';
import './Carousel.css';
const SliderComponent = () => {
  return (
    <section className="row px-4" style={{paddingBottom:'40px'}}>
    <Carousel  indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={side1}
          alt="Sunset Over the City"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={side2}
          alt="Canyon at Night"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={side3}
          alt="Cliff Above a Stormy Sea"
        />
      </Carousel.Item>
    </Carousel>
    </section>
  );
};

export default SliderComponent;
