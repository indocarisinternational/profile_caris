import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileHeaderLink = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace("/", "").replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Tutup menu setelah scroll
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

  const handleSubmenuClick = (e, subItem) => {
    if (subItem.href.includes("#")) {
      handleScroll(e, subItem.href);
    } else {
      if (onNavigate) onNavigate();
    }
  };

  const isActive =
    location.pathname === item.href ||
    (item.submenu &&
      item.submenu.some((subItem) => location.pathname === subItem.href));

  return (
    <div className="w-full">
      {/* Jika href mengandung #, pakai button agar tidak bentrok dengan router */}
      {item.href.includes("#") ? (
        <button
          onClick={handleToggle}
          className={`flex items-center justify-between w-full py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200 ${
            isActive
              ? "text-black bg-gray-50"
              : "text-gray-600 hover:text-black hover:bg-gray-50"
          }`}
        >
          <span className="capitalize">{item.label}</span>
          {item.submenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={`transition-transform duration-200 flex-shrink-0 ${
                submenuOpen ? "rotate-180" : ""
              }`}
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
          className={`flex items-center justify-between w-full py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200 ${
            isActive
              ? "text-black bg-gray-50"
              : "text-gray-600 hover:text-black hover:bg-gray-50"
          }`}
        >
          <span className="capitalize">{item.label}</span>
        </Link>
      )}

      {item.submenu && submenuOpen && (
        <div className="mt-1 ml-4 space-y-1 border-l pl-3 border-gray-200">
          {item.submenu.map((subItem, index) => {
            const isSubItemActive = location.pathname === subItem.href;
            return subItem.href.includes("#") ? (
              <button
                key={index}
                onClick={(e) => handleSubmenuClick(e, subItem)}
                className={`block w-full text-left py-3 px-4 rounded-lg text-base transition-colors duration-200 ${
                  isSubItemActive
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                }`}
              >
                {subItem.label}
              </button>
            ) : (
              <Link
                key={index}
                to={subItem.href}
                onClick={(e) => handleSubmenuClick(e, subItem)}
                className={`block py-3 px-4 rounded-lg text-base transition-colors duration-200 ${
                  isSubItemActive
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                }`}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
