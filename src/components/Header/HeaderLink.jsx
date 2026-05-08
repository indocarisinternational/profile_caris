import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

const HeaderLink = ({ item }) => {
  const { t } = useTranslation();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isLinkActive =
      location.pathname === item.href ||
      (item.submenu &&
        item.submenu.some((subItem) => location.pathname === subItem.href));

    setIsActive(!!isLinkActive);
  }, [location, item.href, item.submenu]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <Link
        smooth
        to={item.href}
        className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
          isActive ? "text-white" : "text-white/60 hover:text-white"
        }`}
      >
        <span>{t(item.label)}</span>
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
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
      </Link>

      {submenuOpen && item.submenu && (
        <div className="absolute top-full left-0 pt-4 w-48 z-50">
          <div className="bg-black border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1">
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                to={subItem.href}
                className="block px-4 py-2 text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
