"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";

const Teams = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("id, full_name, position, profile_photo_url, linkedin_url");

      if (error) {
        console.error("Error fetching employees:", error.message);
      } else {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1280, // layar lg
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024, // layar md
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640, // layar sm (mobile)
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const getImageUrl = (path) => {
    if (!path) return "/images/default-avatar.png";
    return `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/employees/${path}`;
  };

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  return (
    <section style={{ backgroundColor: "#d5effa" }} id="employees">
      <div className="container mx-auto max-w-screen-xl px-4 relative mt-40 pt-10">
        <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center md:text-left">
          Meet with our <br /> Teams.
        </h2>

        <Slider {...settings}>
          {employees.map((emp) => (
            <div key={emp.id} className="px-2">
              <div className="py-10 text-center">
                <div className="relative">
                  <img
                    src={getImageUrl(emp.profile_photo_url)}
                    alt={emp.full_name}
                    width={280}
                    height={280}
                    className="inline-block m-auto w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] object-cover rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform"
                    onClick={() => navigate(`/${slugify(emp.full_name)}`)}
                  />
                  {emp.linkedin_url && (
                    <a
                      href={emp.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-6 bottom-6 bg-white rounded-full p-3 hover:scale-110 transition-transform shadow-md"
                    >
                      {/* LinkedIn Icon */}
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.063 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                          fill="#0077B5"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="mt-6 px-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                    {emp.full_name}
                  </h3>
                  <h4 className="text-sm md:text-base text-gray-600 mt-1 opacity-70 line-clamp-1">
                    {emp.position}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Teams;
