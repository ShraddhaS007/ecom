import React from "react";
import Slider from "react-slick";
import "./TestimonialSlider.css";
import { assets } from "../assets/assets";

const testimonials = [
  { name: "John Doe", photo: assets.cust, review: "Great experience and amazing service!" },
  { name: "Jane Smith", photo: assets.cust, review: "Highly recommend! Quality products." },
  { name: "Alice Brown", photo: assets.cust, review: "Prompt customer support, very satisfied." },
  { name: "Robert Wilson", photo: assets.cust, review: "Affordable prices and fast delivery." },
  { name: "Sophia Davis", photo: assets.cust, review: "Loved the user-friendly interface." },
  { name: "Liam Miller", photo: assets.cust, review: "Great range of products to choose from." },
  { name: "Emma Johnson", photo: assets.cust, review: "Quick and efficient shopping experience." },
  { name: "James White", photo: assets.cust, review: "Customer service was outstanding!" },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-heading">What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.photo} alt={testimonial.name} className="testimonial-photo" />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-review">"{testimonial.review}"</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
