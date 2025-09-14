// src/components/Testimonial.jsx
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
    dotsClass: "slick-dots",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1, dots: false },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2, slidesToScroll: 1, dots: false },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: false },
      },
    ],
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <Icon
              key={`full-${i}`}
              icon="tabler:star-filled"
              className="text-yellow-500 text-xl inline-block"
            />
          ))}
        {halfStars > 0 && (
          <Icon
            icon="tabler:star-half-filled"
            className="text-yellow-500 text-xl inline-block"
          />
        )}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <Icon
              key={`empty-${i}`}
              icon="tabler:star-filled"
              className="text-gray-400 text-xl inline-block"
            />
          ))}
      </>
    );
  };

  return (
    <section id="testimonial">
      <div className="container mx-auto max-w-screen-xl px-4 mt-30 mb-30">
        <Slider {...settings}>
          {TestimonialData.map((items, i) => (
            <div key={i}>
              <div
                className={`bg-white rounded-2xl m-4 p-5 my-20 relative ${
                  i % 2
                    ? "shadow-testimonial-shadow2"
                    : "shadow-testimonial-shadow1"
                }`}
              >
                {/* Foto user */}
                <div className="absolute top-[-45px] left-5">
                  <img
                    src={items.imgSrc}
                    alt={items.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                {/* Komentar */}
                <h4 className="text-base font-normal text-darkgray my-4 mt-12">
                  {items.comment}
                </h4>

                {/* Nama & Rating */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-darkbrown pt-4 pb-2">
                      {items.name}
                    </h3>
                    <h3 className="text-sm font-normal text-lightgray pb-2">
                      {items.profession}
                    </h3>
                  </div>
                  <div className="flex">{renderStars(items.rating)}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
