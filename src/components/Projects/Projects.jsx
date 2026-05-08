import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

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

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    draggable: true,
    swipe: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const getImageUrl = (path) =>
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/${path}`;

  const ProjectCard = ({ proj }) => (
    <Link to={`/project/${proj.id}`} className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 transition-all hover:border-white/30 h-[450px] block">
      <div className="h-2/3 w-full overflow-hidden">
        <img
          src={getImageUrl(proj.image_url)}
          alt={proj.project_name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 block">
              {proj.jenis_project}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
              {proj.project_name}
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
            proj.status === "selesai" ? "border-green-500/50 text-green-500" : "border-yellow-500/50 text-yellow-500"
          }`}>
            {proj.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {proj.deskripsi}
        </p>
      </div>
      
      {/* Hover Overlay Link */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
          View Project
        </button>
      </div>
    </Link>
  );

  return (
    <section id="projects" className="py-32 bg-black border-b border-white/5">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Selected Works.
            </h2>
            <p className="text-gray-500 text-lg">
              A showcase of our recent engineering projects and digital solutions delivered to clients worldwide.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all"
          >
            {t("projects.explore")} &rarr;
          </Link>
        </div>

        {!isMobile ? (
          <Slider {...settings} className="project-slider -mx-4">
            {projects.map((proj) => (
              <div key={proj.id} className="px-4 pb-12">
                <ProjectCard proj={proj} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="space-y-6">
            {projects.slice(0, visibleCount).map((proj) => (
              <ProjectCard key={proj.id} proj={proj} />
            ))}
            {visibleCount < projects.length && (
              <button
                onClick={() => setVisibleCount(visibleCount + 5)}
                className="w-full py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
