import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const Teams = () => {
  const { t } = useTranslation();
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
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const getImageUrl = (path) => {
    if (!path) return "/images/default-avatar.png";
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/employees/${path}`;
  };

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  return (
    <section className="bg-black py-32 border-b border-white/5" id="employees">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Meet the Experts.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our team consists of industry veterans and talented engineers dedicated to your success.
          </p>
        </div>

        <Slider {...settings} className="team-slider -mx-4">
          {employees.map((emp) => (
            <div key={emp.id} className="px-4 pb-12 outline-none">
              <div className="group relative">
                <div 
                  className="aspect-square overflow-hidden rounded-2xl bg-white/5 border border-white/10 cursor-pointer mb-6"
                  onClick={() => navigate(`/${slugify(emp.full_name)}`)}
                >
                  <img
                    src={getImageUrl(emp.profile_photo_url)}
                    alt={emp.full_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                      {emp.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mt-1">
                      {emp.position}
                    </p>
                  </div>
                  {emp.linkedin_url && (
                    <a
                      href={emp.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/20 hover:text-white transition-colors mt-1"
                    >
                      <Icon icon="tabler:brand-linkedin" fontSize={24} />
                    </a>
                  )}
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
