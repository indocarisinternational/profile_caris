import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSiteContent from "../../hooks/useSiteContent";

const DEFAULTS = {
  badge_text: "Transforming Ideas into Digital Reality",
  hero_title: "Consulting. Engineering. Innovation.",
  hero_subtitle:
    "We provide expert IT consulting and high-end software development to help modern businesses scale in the digital age.",
  cta_primary: "Start Your Project",
  cta_secondary: "Our Services",
  feature_1: "Fast Delivery",
  feature_2: "Secure by Design",
  feature_3: "Premium Quality",
};

const Hero = () => {
  const { t } = useTranslation();
  const { content: c } = useSiteContent("home", DEFAULTS);

  // Parse hero_title into lines for the multi-line heading
  const titleParts = (c.hero_title || DEFAULTS.hero_title).split(".");
  const mainParts = titleParts.slice(0, -1).map((p) => p.trim() + ".");
  const lastPart = titleParts[titleParts.length - 1]?.trim();

  return (
    <section
      id="home-section"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />

      {/* Radial Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-white/70">
              {c.badge_text}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-gradient">
              {mainParts.map((part, i) => (
                <span key={i}>
                  {part}
                  <br />
                </span>
              ))}
              {lastPart && (
                <span className="text-white">{lastPart}</span>
              )}
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
              {c.hero_subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="bg-white text-black px-10 py-4 rounded-full font-bold transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {c.cta_primary}
            </Link>
            <Link
              to="/services"
              className="px-10 py-4 rounded-full font-bold border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              {c.cta_secondary}
            </Link>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl"
          >
            {[
              { icon: "solar:rocket-bold", text: c.feature_1 },
              { icon: "solar:shield-check-bold", text: c.feature_2 },
              { icon: "solar:medal-star-bold", text: c.feature_3 },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 text-white/30"
              >
                <Icon icon={feature.icon} className="text-xl" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-white/30"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
