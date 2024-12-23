import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {assets} from '../assets/assets'


const Hero = () => {
    const images = [assets.h2,assets.h1,assets.h3];
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
       
  return (
    <div>
        <div style={{ width: "100%", overflow: "hidden" ,height: "auto"}}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Hero


