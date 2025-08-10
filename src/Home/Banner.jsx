import React from 'react';
import Slider from 'react-slick';
import banner1 from '../assets/banner1.webp';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
import banner4 from '../assets/banner4.jpeg';

const banners = [
  {
    title: "Your Journey into AI and Data Starts Here",
    subtitle: "Build real-world skills with expert-led courses in machine learning, analytics, and automation.",
    image: banner1
  },
  {
    title: "Shape the Future with AI Technology",
    subtitle: "Learn the skills that shape the world — AI, data analytics, and automation, all in one place.",
    image: banner2
  },
  {
    title: "Where Human Ingenuity Meets Machine Precision",
    subtitle: "Striking the perfect balance between creative thinking and cutting-edge technology—your gateway to mastering practical AI.",
    image: banner3
  },
  {
    title: "Intelligence Elevated. Futures Reimagined.",
    subtitle: "Begin your AI journey with the clarity to learn, the confidence to grow, and the creativity to lead",
    image: banner4
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div
              className="relative h-[105vh] bg-cover bg-center bg-no-repeat flex items-center justify-start px-10 lg:px-32"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black/50 z-10" />

              {/* Banner content */}
              <div className="relative z-20 text-white max-w-xl">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {banner.title}
                </h1>
                <p className="text-lg lg:text-xl font-light">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
