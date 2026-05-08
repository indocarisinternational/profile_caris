import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: "solar:code-square-bold",
      title: "Custom Software Development",
      desc: "Tailored web and mobile applications built with modern frameworks like React, Next.js, and Node.js.",
    },
    {
      icon: "solar:chart-2-bold",
      title: "IT Consulting & Strategy",
      desc: "Strategic technology roadmaps to align your IT infrastructure with your business goals.",
    },
    {
      icon: "solar:refresh-circle-bold",
      title: "Digital Transformation",
      desc: "Modernize legacy systems and workflows to improve efficiency and customer experience.",
    },
    {
      icon: "solar:cloud-bold",
      title: "Cloud Infrastructure",
      desc: "Scalable cloud solutions using AWS, Azure, or GCP for maximum uptime and security.",
    },
    {
      icon: "solar:shield-keyhole-bold",
      title: "Cybersecurity Solutions",
      desc: "Protect your digital assets with advanced security audits and implementation.",
    },
    {
      icon: "solar:settings-bold",
      title: "Managed IT Services",
      desc: "Ongoing support and maintenance to ensure your systems run smoothly 24/7.",
    },
  ];

  return (
    <>
      <SEO
        title={`Services | Indo Caris International`}
        description="Premium IT Consulting and Software Development services for modern businesses."
        keywords="IT Services Jakarta, Software Development Indonesia, Digital Transformation, Cloud Solutions, Mobile Development"
        url="/services"
      />
      <Schema type="service" />

      <section className="pt-40 pb-32 bg-black min-h-screen relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-10 h-[1px] bg-white/50" />
              <span className="text-sm font-semibold tracking-widest uppercase text-white/50">
                Our Expertise
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8"
            >
              Solutions for the <br />
              <span className="text-white/40">Digital Frontier.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              We don't just build software; we engineer competitive advantages. Explore our comprehensive suite of IT services designed to scale your business.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-black p-10 hover:bg-white/[0.02] transition-all group relative"
              >
                <div className="mb-8 text-white/40 group-hover:text-white transition-colors">
                  <Icon icon={service.icon} width="40" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-8 group-hover:text-gray-400 transition-colors">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-white/20 group-hover:text-white transition-all">
                  <span>Learn more</span>
                  <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 lg:p-20 bg-white rounded-[2rem] text-black flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
                Ready to transform your vision?
              </h2>
              <p className="text-lg font-medium opacity-70">
                Contact our experts today for a free consultation and let's discuss how we can build your next big project.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
