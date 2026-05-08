import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const MobileHeaderLink = ({ item, onNavigate }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = (e) => {
    if (item.children) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      if (onNavigate) onNavigate();
    }
  };

  const isActive =
    location.pathname === item.href ||
    (item.children &&
      item.children.some((sub) => location.pathname === sub.href));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full border-b border-white/5">
        <Link
          to={item.href}
          onClick={handleToggle}
          className={`flex-1 py-6 text-3xl font-black tracking-tighter transition-colors ${
            isActive ? "text-white" : "text-white/30"
          }`}
        >
          {t(item.label)}
        </Link>
        {item.children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-6 text-white/30"
          >
            <Icon icon="tabler:chevron-down" className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {item.children && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="py-4 space-y-4 pl-6 border-l border-white/10 mt-4">
              {item.children.map((sub, index) => (
                <Link
                  key={index}
                  to={sub.href}
                  onClick={() => onNavigate && onNavigate()}
                  className="block text-xl font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest"
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

export default MobileHeaderLink;
