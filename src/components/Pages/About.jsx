import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import useSiteContent from "../../hooks/useSiteContent";

const DEFAULTS = {
  page_title: "Who We Are.",
  page_description: "Indo Caris International is a technology-first consulting firm. We bridge the gap between complex engineering and business impact, helping organizations navigate the digital future with confidence.",
  mission_title: "Our Mission",
  mission_text: "To empower businesses through cutting-edge technology, delivering scalable and innovative digital solutions that drive sustainable growth.",
  vision_title: "Our Vision",
  vision_text: "To be the most trusted global partner for digital transformation, recognized for our engineering excellence and strategic insight.",
  value_1_title: "Innovation", value_1_text: "We constantly push boundaries to find better ways.",
  value_2_title: "Excellence", value_2_text: "We strive for perfection in every line of code.",
  value_3_title: "Integrity", value_3_text: "We build trust through transparency and honesty.",
  value_4_title: "Collaboration", value_4_text: "We work as an extension of your own team.",
};

const VALUE_ICONS = ["solar:lightbulb-bolt-bold","solar:medal-star-bold","solar:shield-check-bold","solar:users-group-two-rounded-bold"];

const About = () => {
  const { t } = useTranslation();
  const { content: c } = useSiteContent("about", DEFAULTS);
  const v = (k) => c[k] || DEFAULTS[k] || "";

  return (
    <>
      <SEO title="About | Indo Caris International" description="Learn more about Indo Caris International." keywords="About Indo Caris, IT Consultant Jakarta" url="/about" />
      <Schema type="organization" />
      <section className="pt-40 pb-32 bg-black min-h-screen relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-32">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-extrabold tracking-tight mb-12">
              {v("page_title").split(".")[0]} <span className="text-white/40">{v("page_title").split(".").slice(1).join(".").trim()}</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">{v("page_description")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden mb-32">
            <div className="bg-black p-12 lg:p-20">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10"><Icon icon="solar:target-bold" className="text-2xl text-white" /></div>
              <h2 className="text-3xl font-bold mb-6">{v("mission_title")}</h2>
              <p className="text-gray-500 text-lg leading-relaxed">{v("mission_text")}</p>
            </div>
            <div className="bg-black p-12 lg:p-20">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10"><Icon icon="solar:eye-bold" className="text-2xl text-white" /></div>
              <h2 className="text-3xl font-bold mb-6">{v("vision_title")}</h2>
              <p className="text-gray-500 text-lg leading-relaxed">{v("vision_text")}</p>
            </div>
          </div>
          <div className="mb-40">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 text-center mb-20">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map((i, idx) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 transition-colors group-hover:border-white/20 group-hover:bg-white/10">
                    <Icon icon={VALUE_ICONS[idx]} className="text-2xl text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{v(`value_${i}_title`)}</h3>
                  <p className="text-gray-500 text-sm">{v(`value_${i}_text`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center py-24 px-12 bg-white rounded-[3rem] text-black">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">Let's build something <br /> extraordinary.</h2>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Start Your Journey <Icon icon="solar:arrow-right-bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
