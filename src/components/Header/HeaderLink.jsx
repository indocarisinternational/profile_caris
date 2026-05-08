import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderLink = ({ item }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isLinkActive =
      location.pathname === item.href ||
      (item.children &&
        item.children.some((sub) => location.pathname === sub.href));

    setIsActive(!!isLinkActive);
  }, [location, item.href, item.children]);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        smooth
        to={item.href}
        className={`text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 uppercase tracking-widest ${
          isActive ? "text-white" : "text-white/40 hover:text-white"
        }`}
      >
        <span>{t(item.label)}</span>
        {item.children && (
          <Icon 
            icon="tabler:chevron-down" 
            className={`transition-transform duration-300 text-[10px] ${isOpen ? "rotate-180" : ""}`} 
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 pt-4 w-64 z-50"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden py-3 backdrop-blur-xl">
              {item.children.map((sub, index) => (
                <Link
                  key={index}
                  to={sub.href}
                  className="block px-6 py-3 text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderLink;
