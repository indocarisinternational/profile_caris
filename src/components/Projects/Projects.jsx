import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // awalnya 3

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

    // cek ukuran layar
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const getImageUrl = (path) =>
    `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/projects/${path}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Komponen card project
  const ProjectCard = ({ proj }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[380px]">
      <div className="w-full h-44 sm:h-52 overflow-hidden">
        <img
          src={getImageUrl(proj.image_url)}
          alt={proj.project_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-black mb-2 capitalize">
          {proj.project_name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
          {proj.deskripsi}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-4">
            <span className="text-xs text-gray-600">{proj.jenis_project}</span>
            <span
              className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
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
          <div className="text-[11px] text-gray-500 mt-2">
            {formatDate(proj.created_at)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h2 className="text-gray-950 text-3xl md:text-4xl font-bold mb-4 sm:mb-0">
            Our Projects.
          </h2>
          <Link
            to="/"
            className="text-blue-500 text-base md:text-lg font-medium hover:tracking-widest duration-500"
          >
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>

        {/* Desktop pakai slider */}
        {!isMobile ? (
          <Slider {...settings}>
            {projects.map((proj) => (
              <div key={proj.id} className="px-2">
                <ProjectCard proj={proj} />
              </div>
            ))}
          </Slider>
        ) : (
          // Mobile pakai grid + tombol load more
          <>
            <div className="grid grid-cols-1 gap-6">
              {projects.slice(0, visibleCount).map((proj) => (
                <ProjectCard key={proj.id} proj={proj} />
              ))}
            </div>
            {visibleCount < projects.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount(visibleCount + 5)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Lihat lainnya
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
