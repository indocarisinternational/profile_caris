import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const DetailTeam = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const unSlugify = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("employees").select("*");

        if (error) {
          throw error;
        } else {
          let emp = data.find((e) => slugify(e.full_name) === slug);

          if (!emp) {
            const searchName = unSlugify(slug);
            emp = data.find(
              (e) => e.full_name.toLowerCase() === searchName.toLowerCase()
            );
          }

          if (!emp) {
            setError("Employee not found");
          } else {
            setEmployee(emp);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEmployee();
  }, [slug]);

  const getImageUrl = (path) => {
    if (!path) return "/images/default-avatar.png";
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/employees/${path}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <h2 className="text-4xl font-bold mb-8">Not Found.</h2>
        <Link to="/" className="text-accent font-bold uppercase tracking-widest text-sm">Return Home &rarr;</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${employee.full_name} | Indo Caris International`}
        description={employee.specialization || `${employee.position} at Indo Caris International.`}
        url={`/${slug}`}
        type="profile"
      />
      <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden pb-20">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        
        {/* Header Navigation */}
        <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10 flex justify-between items-center">
          <Link to="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
            <Icon icon="solar:arrow-left-linear" />
            Back
          </Link>
          <div className="text-white/20 font-black tracking-tighter">CARIS</div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full lg:w-2/5 aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-white/5"
            >
              <img 
                src={getImageUrl(employee.profile_photo_url)} 
                alt={employee.full_name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Right: Info */}
            <div className="flex-1 space-y-12">
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-accent font-bold uppercase tracking-[0.3em] text-xs block mb-4"
                >
                  {employee.position}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tighter"
                >
                  {employee.full_name}
                </motion.h1>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6 text-gray-400 text-lg leading-relaxed"
              >
                <p>{employee.specialization || "Professional expert at Indo Caris International dedicated to engineering excellence and client success."}</p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-1">Department</span>
                    <span className="text-white font-medium">{employee.department}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-1">Location</span>
                    <span className="text-white font-medium">Jakarta, ID</span>
                  </div>
                </div>
              </motion.div>

              {/* Socials & Contact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-8"
              >
                {employee.linkedin_url && (
                  <a href={employee.linkedin_url} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 font-bold text-sm">
                    <Icon icon="tabler:brand-linkedin" fontSize={20} />
                    LinkedIn
                  </a>
                )}
                {employee.email_office && (
                  <a href={`mailto:${employee.email_office}`} className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all flex items-center gap-2 font-bold text-sm">
                    <Icon icon="tabler:mail" fontSize={20} />
                    Email
                  </a>
                )}
              </motion.div>
            </div>
          </div>

          {/* Additional Sections */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-32 grid md:grid-cols-2 gap-12"
          >
            {employee.work_experience && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-l-2 border-accent pl-4">Experience</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">{employee.work_experience}</p>
              </div>
            )}
            {employee.education && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-l-2 border-accent pl-4">Education</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">{employee.education}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DetailTeam;
