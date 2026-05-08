import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";

const AllProjects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("projects").select("*").order('created_at', { ascending: false });
      if (!error) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const getImageUrl = (path) =>
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/${path}`;

  return (
    <>
      <SEO title="Our Projects | Indo Caris International" />
      <section className="pt-40 pb-32 bg-black min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        
        <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-8">
              All <span className="text-white/40">Projects.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              A comprehensive archive of our engineering accomplishments and digital transformations.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link to={`/project/${proj.id}`} className="block">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 mb-6">
                      <img 
                        src={getImageUrl(proj.image_url)} 
                        alt={proj.project_name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{proj.jenis_project}</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{proj.project_name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllProjects;
