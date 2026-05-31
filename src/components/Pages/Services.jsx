import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import useSiteContent from "../../hooks/useSiteContent";

const DEFAULTS = {
  "services.page_label": "Our Expertise",
  "services.page_title": "Solutions for the Digital Frontier.",
  "services.page_subtitle":
    "We don't just build software; we engineer competitive advantages. Explore our comprehensive suite of IT services designed to scale your business.",
  "services.service_1_title": "Custom Software Development",
  "services.service_1_desc":
    "Tailored web and mobile applications built with modern frameworks like React, Next.js, and Node.js.",
  "services.service_1_icon": "solar:code-square-bold",
  "services.service_2_title": "IT Consulting & Strategy",
  "services.service_2_desc":
    "Strategic technology roadmaps to align your IT infrastructure with your business goals.",
  "services.service_2_icon": "solar:chart-2-bold",
  "services.service_3_title": "Digital Transformation",
  "services.service_3_desc":
    "Modernize legacy systems and workflows to improve efficiency and customer experience.",
  "services.service_3_icon": "solar:refresh-circle-bold",
  "services.service_4_title": "Cloud Infrastructure",
  "services.service_4_desc":
    "Scalable cloud solutions using AWS, Azure, or GCP for maximum uptime and security.",
  "services.service_4_icon": "solar:cloud-bold",
  "services.service_5_title": "Cybersecurity Solutions",
  "services.service_5_desc":
    "Protect your digital assets with advanced security audits and implementation.",
  "services.service_5_icon": "solar:shield-keyhole-bold",
  "services.service_6_title": "Managed IT Services",
  "services.service_6_desc":
    "Ongoing support and maintenance to ensure your systems run smoothly 24/7.",
  "services.service_6_icon": "solar:settings-bold",
  "pricing.title": "Transparent Pricing.",
  "pricing.subtitle":
    "Flexible packages tailored to your business stage and requirements.",
  "pricing.starter_name": "Starter",
  "pricing.starter_price": "Rp 15jt",
  "pricing.starter_desc": "Cocok untuk startup dan MVP bisnis kecil.",
  "pricing.starter_features":
    "Single Platform (Web)|Standard UI/UX Design|Core Functionality|3 Bulan Support",
  "pricing.professional_name": "Professional",
  "pricing.professional_price": "Rp 45jt",
  "pricing.professional_desc":
    "Ideal untuk perusahaan yang sedang berkembang.",
  "pricing.professional_features":
    "Cross-platform (Web/Mobile)|Premium Custom Design|Advanced Analytics|Dedicated Project Manager|6 Bulan Support",
  "pricing.enterprise_name": "Enterprise",
  "pricing.enterprise_price": "Custom",
  "pricing.enterprise_desc":
    "Sistem kompleks untuk organisasi skala besar.",
  "pricing.enterprise_features":
    "Multi-platform Ecosystem|High-level Security Audit|AI Integration|Legacy System Migration|24/7 Priority Support",
};

const Services = () => {
  const { t } = useTranslation();
  const { content: c } = useSiteContent(["services", "pricing"], DEFAULTS);

  const v = (k) => c[k] || DEFAULTS[k] || "";

  const services = [1, 2, 3, 4, 5, 6].map((i) => ({
    icon: v(`services.service_${i}_icon`),
    title: v(`services.service_${i}_title`),
    desc: v(`services.service_${i}_desc`),
  }));

  const pricingTiers = [
    { tier: "starter", highlight: false },
    { tier: "professional", highlight: true },
    { tier: "enterprise", highlight: false },
  ].map((p) => ({
    name: v(`pricing.${p.tier}_name`),
    price: v(`pricing.${p.tier}_price`),
    desc: v(`pricing.${p.tier}_desc`),
    features: v(`pricing.${p.tier}_features`).split("|").filter(Boolean),
    highlight: p.highlight,
  }));

  return (
    <>
      <SEO
        title="Services | Indo Caris International"
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
                {v("services.page_label")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8"
            >
              {(() => {
                const parts = v("services.page_title").split(".");
                return (
                  <>
                    {parts[0]?.trim()} <br />
                    <span className="text-white/40">
                      {parts.slice(1).join(".").trim()}
                    </span>
                  </>
                );
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              {v("services.page_subtitle")}
            </motion.p>
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
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="mt-40 mb-20 text-center" id="pricing">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              {v("pricing.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {v("pricing.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((pkg, i) => (
              <div
                key={i}
                className={`p-10 rounded-[2rem] border ${
                  pkg.highlight
                    ? "border-white bg-white/5 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    : "border-white/10 bg-[#0a0a0a]"
                } flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-black mb-4">{pkg.price}</div>
                <p className="text-sm text-gray-500 mb-8">{pkg.desc}</p>
                <ul className="space-y-4 flex-1">
                  {pkg.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <Icon
                        icon="solar:check-circle-bold"
                        className="text-white text-lg"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-10 py-4 rounded-xl font-bold text-center transition-all ${
                    pkg.highlight
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 p-12 lg:p-20 bg-white rounded-[2rem] text-black flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
                Ready to transform your vision?
              </h2>
              <p className="text-lg font-medium opacity-70">
                Contact our experts today for a free consultation and let's
                discuss how we can build your next big project.
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
