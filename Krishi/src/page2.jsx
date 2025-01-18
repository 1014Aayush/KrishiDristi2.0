import React from "react";
import "./Page2.css";
import Slider from "react-slick"; // React Slick carousel for service slider
import "slick-carousel/slick/slick.css"; // Carousel style imports
import "slick-carousel/slick/slick-theme.css"; // Carousel theme style imports
import plant from "./assets/images/plant.png";
import aayush from "./assets/images/aayush.jpg";

const services = [
  {
    title: "Crop Recommendation",
    image: plant, // Use imported image directly
    description: "Recommending the best crop based on real-time soil and environmental data from IoT sensors.",
  },
  {
    title: "Yield Prediction",
    image: plant,
    description: "Predicting crop yield based on real-time data from soil and environmental sensors.",
  },
  {
    title: "Temperature and Humidity Level",
    image: plant,
    description: "Monitor temperature and humidity levels in real-time using IoT sensors.",
  },
  {
    title: "Soil Data Vizualization",
    image: plant,
    description: "Visualizing soil data in real-time for better understanding and informed decision-making.",
  },
  {
    title: "User-Friendly Interface",
    image: plant,
    description: "Providing a user-friendly interface for easy access to real-time agricultural data and insights.",
  }
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
      <div  className="page2-section">
        <div className="container">
          <div id="Page2" className="section-header">
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
