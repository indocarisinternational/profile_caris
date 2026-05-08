import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={`About | Indo Caris International`}
        description="Learn more about Indo Caris International, our mission, vision, and values in the IT industry."
        keywords="About Indo Caris International, IT Consultant Jakarta, Digital Solutions Indonesia, Company Profile"
        url="/about"
      />
      <Schema type="organization" />

      <section className="pt-40 pb-32 bg-black min-h-screen relative overflow-hidden text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-32">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-extrabold tracking-tight mb-12"
            >
              Who We <span className="text-white/40">Are.</span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">
              Indo Caris International is a technology-first consulting firm. We bridge the gap between complex engineering and business impact, helping organizations navigate the digital future with confidence.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden mb-32">
            <div className="bg-black p-12 lg:p-20">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <Icon icon="solar:target-bold" className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                To empower businesses through cutting-edge technology, delivering scalable and innovative digital solutions that drive sustainable growth.
              </p>
            </div>

            <div className="bg-black p-12 lg:p-20">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <Icon icon="solar:eye-bold" className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                To be the most trusted global partner for digital transformation, recognized for our engineering excellence and strategic insight.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-40">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 text-center mb-20">
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "solar:lightbulb-bolt-bold", title: "Innovation", text: "We constantly push boundaries to find better ways." },
                { icon: "solar:medal-star-bold", title: "Excellence", text: "We strive for perfection in every line of code." },
                { icon: "solar:shield-check-bold", title: "Integrity", text: "We build trust through transparency and honesty." },
                { icon: "solar:users-group-two-rounded-bold", title: "Collaboration", text: "We work as an extension of your own team." },
              ].map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 transition-colors group-hover:border-white/20 group-hover:bg-white/10">
                    <Icon icon={value.icon} className="text-2xl text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center py-24 px-12 bg-white rounded-[3rem] text-black">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
              Let's build something <br /> extraordinary.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              Start Your Journey
              <Icon icon="solar:arrow-right-bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
