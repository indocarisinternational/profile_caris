import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileHeaderLink = ({ item, onNavigate }) => {
  const { t } = useTranslation();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace("/", "").replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (onNavigate) {
      setTimeout(() => onNavigate(), 300);
    }
  };

  const handleToggle = (e) => {
    if (item.submenu) {
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    } else {
      if (item.href.includes("#")) {
        handleScroll(e, item.href);
      } else {
        if (onNavigate) onNavigate();
      }
    }
  };

  const isActive =
    location.pathname === item.href ||
    (item.submenu &&
      item.submenu.some((subItem) => location.pathname === subItem.href));

  return (
    <div className="w-full">
      {item.href.includes("#") ? (
        <button
          onClick={handleToggle}
          className={`flex items-center justify-between w-full py-4 text-2xl font-bold transition-colors duration-200 ${
            isActive ? "text-white" : "text-white/40 hover:text-white"
          }`}
        >
          <span className="capitalize">{t(item.label)}</span>
          {item.submenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`transition-transform duration-200 ${submenuOpen ? "rotate-180" : ""}`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </button>
      ) : (
        <Link
          to={item.href}
          onClick={handleToggle}
          className={`flex items-center justify-between w-full py-4 text-2xl font-bold transition-colors duration-200 ${
            isActive ? "text-white" : "text-white/40 hover:text-white"
          }`}
        >
          <span className="capitalize">{t(item.label)}</span>
        </Link>
      )}

      {item.submenu && submenuOpen && (
        <div className="mt-2 ml-4 space-y-4 border-l-2 border-white/10 pl-6">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.href}
              onClick={() => onNavigate && onNavigate()}
              className="block text-xl font-medium text-white/40 hover:text-white transition-colors"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
