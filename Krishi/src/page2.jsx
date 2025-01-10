import React from "react";
import "./Page2.css";
import Slider from "react-slick"; // React Slick carousel for service slider
import "slick-carousel/slick/slick.css"; // Carousel style imports
import "slick-carousel/slick/slick-theme.css"; // Carousel theme style imports
import a from "./assets/images/a.png";
import aayush from "./assets/images/aayush.jpg";

const services = [
  {
    title: "Web Development",
    image: a, // Use imported image directly
    description: "Build modern and responsive websites.",
  },
  {
    title: "Graphic Design",
    image: aayush,
    description: "Creative design solutions for branding.",
  },
  {
    title: "SEO Optimization",
    image: aayush,
    description: "Improve visibility and search ranking.",
  },
  {
    title: "App Development",
    image: aayush,
    description: "Custom mobile and desktop applications.",
  },
  {
    title: "Digital Marketing",
    image: aayush,
    description: "Grow your audience through targeted campaigns.",
  },
  {
    title: "Content Writing",
    image: aayush,
    description: "Engaging content to capture your audience.",
  },
];

function Page2() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 5000, // Auto-slide every 7 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <>
      <div className="page2-section">
        <div className="container">
          <div className="section-header">
            <p className="section-title">Our Services</p>
          </div>

          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index}>
                <div className="card">
                  <div className="card-image">
                    <img
                      src={service.image} // Directly use the imported image
                      alt={service.title}
                      className="service-image"
                    />
                  </div>
                  <div className="card-content">
                    <h1 className="card-title">{service.title}</h1>
                    <p className="card-description">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Page2;
