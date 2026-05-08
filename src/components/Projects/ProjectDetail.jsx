import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error("Error fetching project:", error.message);
      } else {
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const getImageUrl = (path) =>
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/${path}`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-4xl font-bold mb-8">Project Not Found.</h2>
      <Link to="/" className="text-accent font-bold uppercase tracking-widest text-sm">Back Home</Link>
    </div>
  );

  return (
    <>
      <SEO title={`${project.project_name} | Indo Caris International`} />
      <div className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        
        <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 font-bold text-sm uppercase tracking-widest">
            <Icon icon="solar:arrow-left-linear" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img 
                src={getImageUrl(project.image_url)} 
                alt={project.project_name}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <div className="space-y-12">
              <div>
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs block mb-4">
                  {project.jenis_project}
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">
                  {project.project_name}
                </h1>
                <div className="flex gap-4">
                   <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase border ${
                     project.status === "selesai" ? "border-green-500/50 text-green-500" : "border-yellow-500/50 text-yellow-500"
                   }`}>
                     {project.status}
                   </span>
                </div>
              </div>

              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <h3 className="text-white font-bold text-xl">Project Overview</h3>
                <p>{project.deskripsi}</p>
              </div>

              <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-1">Completion Date</span>
                  <span className="text-white font-medium">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-1">Client Type</span>
                  <span className="text-white font-medium">Enterprise</span>
                </div>
              </div>

              <div className="pt-12">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
                  Inquire Similar Project
                  <Icon icon="solar:arrow-right-bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
