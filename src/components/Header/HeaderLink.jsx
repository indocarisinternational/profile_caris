import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const HeaderLink = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  // Check if link is active
  useEffect(() => {
    const isLinkActive =
      location.pathname === item.href ||
      (item.submenu &&
        item.submenu.some((subItem) => location.pathname === subItem.href));

    setIsActive(!!isLinkActive);
  }, [location, item.href, item.submenu]);

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        smooth
        to={item.href}
        className={`text-lg flex items-center gap-1 hover:text-black transition-colors duration-200 relative capitalize ${
          isActive
            ? "text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1.5 xl:after:-bottom-2"
            : "text-gray-600"
        }`}
      >
        <span>{item.label}</span>
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${
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
      </Link>

      {/* Desktop Submenu */}
      {submenuOpen && item.submenu && (
        <div className="absolute py-2 left-0 mt-1 w-60 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
          {item.submenu.map((subItem, index) => {
            const isSubItemActive = location.pathname === subItem.href;
            return (
              <Link
                key={index}
                to={subItem.href}
                className={`block px-4 py-3 text-base transition-colors duration-200 ${
                  isSubItemActive
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === item.submenu.length - 1 ? "rounded-b-lg" : ""
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

export default HeaderLink;
