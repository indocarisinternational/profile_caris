import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

// Data dummy (bisa diganti dari Supabase/API)
export const TestimonialData = [
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480, // xs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <Icon
              key={`full-${i}`}
              icon="tabler:star-filled"
              className="text-yellow-500 text-lg sm:text-xl"
            />
          ))}
        {halfStars > 0 && (
          <Icon
            icon="tabler:star-half-filled"
            className="text-yellow-500 text-lg sm:text-xl"
          />
        )}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <Icon
              key={`empty-${i}`}
              icon="tabler:star-filled"
              className="text-gray-300 text-lg sm:text-xl"
            />
          ))}
      </div>
    );
  };

  return (
    <section id="testimonial" className="py-16 sm:py-20 lg:py-24 bg-gray-50/50">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Icon
              icon="tabler:message-circle-2"
              className="text-primary text-xl"
            />
            <span className="text-primary font-semibold text-sm sm:text-base">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="testimonial-slider relative">
          <Slider {...settings}>
            {TestimonialData.map((item, i) => (
              <div key={i} className="px-2 sm:px-3 lg:px-4">
                <div
                  className={`bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 my-12 sm:my-16 lg:my-20 relative transition-all duration-300 hover:shadow-2xl group ${
                    i % 2
                      ? "shadow-lg hover:shadow-blue-100"
                      : "shadow-lg hover:shadow-purple-100"
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6 sm:left-8 bg-primary rounded-full p-3 shadow-lg">
                    <Icon
                      icon="tabler:quote"
                      className="text-white text-xl sm:text-2xl"
                    />
                  </div>

                  {/* User Photo */}
                  <div className="absolute -top-6 sm:-top-8 lg:-top-10 right-6 sm:right-8">
                    <div className="relative">
                      <img
                        src={item.imgSrc}
                        alt={`${item.name} - ${item.profession}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                        <Icon
                          icon="tabler:check"
                          className="text-white text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-8 sm:pt-10 lg:pt-12">
                    {/* Rating */}
                    <div className="mb-4 sm:mb-6">
                      {renderStars(item.rating)}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 font-medium italic">
                      "{item.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="border-t border-gray-100 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 font-medium">
                        {item.profession}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Ready to join our satisfied clients?
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Start Your Project
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .testimonial-slider .slick-dots {
          bottom: -60px;
          display: flex !important;
          justify-content: center;
          gap: 12px;
        }

        .testimonial-slider .slick-dots li {
          margin: 0;
          width: 12px;
          height: 12px;
        }

        .testimonial-slider .slick-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          font-size: 0;
          transition: all 0.3s ease;
        }

        .testimonial-slider .slick-dots li button:hover {
          background: #6366f1;
          transform: scale(1.2);
        }

        .testimonial-slider .slick-dots li.slick-active button {
          background: #6366f1;
          transform: scale(1.3);
        }

        .testimonial-slider .slick-arrow {
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .testimonial-slider .slick-arrow:hover {
          background: #6366f1;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }

        .testimonial-slider .slick-prev {
          left: -60px;
        }

        .testimonial-slider .slick-next {
          right: -60px;
        }

        @media (max-width: 1024px) {
          .testimonial-slider .slick-prev {
            left: -40px;
          }
          .testimonial-slider .slick-next {
            right: -40px;
          }
        }

        @media (max-width: 768px) {
          .testimonial-slider .slick-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="slick-arrow slick-prev flex items-center justify-center"
    aria-label="Previous testimonial"
  >
    <Icon icon="tabler:chevron-left" className="text-gray-600 text-xl" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="slick-arrow slick-next flex items-center justify-center"
    aria-label="Next testimonial"
  >
    <Icon icon="tabler:chevron-right" className="text-gray-600 text-xl" />
  </button>
);

export default Testimonial;
