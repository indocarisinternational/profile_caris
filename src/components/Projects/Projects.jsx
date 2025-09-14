import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  // ambil data dari tabel Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  // setting carousel
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // helper bikin URL gambar dari bucket Supabase
  const getImageUrl = (path) => {
    if (!path) return "";
    return `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/projects/${path}`;
  };

  // helper format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="projects">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 mt-40">
        {/* Header */}
        <div className="sm:flex justify-between items-center mb-20">
          <h2 className="text-gray-950 text-4xl lg:text-5xl font-bold mb-5 sm:mb-0">
            Our Projects.
          </h2>
          <Link
            to="/"
            className="text-blue-500 text-lg font-medium hover:tracking-widest duration-500"
          >
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {projects.map((proj) => (
            <div key={proj.id} className="h-full">
              <div className="bg-white m-3 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[420px]">
                {/* FIXED HEIGHT IMAGE */}
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={getImageUrl(proj.image_url)}
                    alt={proj.project_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CARD BODY */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-black mb-2 capitalize">
                    {proj.project_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {proj.deskripsi}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center py-4 border-t border-gray-300 mt-4">
                      <span className="text-sm text-gray-600">
                        {proj.jenis_project}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          proj.status === "selesai"
                            ? "bg-green-100 text-green-700"
                            : proj.status === "proses"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      {formatDate(proj.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Projects;
