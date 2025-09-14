import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderLink = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation(); // Dapatkan path sekarang
  const [isActive, setIsActive] = useState(false);

  // Cek apakah link aktif
  useEffect(() => {
    const isLinkActive =
      location.pathname === item.href ||
      (item.submenu &&
        item.submenu.some((subItem) => location.pathname === subItem.href));

    setIsActive(!!isLinkActive); // pastikan boolean
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
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.href}
        className={`text-lg flex hover:text-black capitalized relative ${
          isActive
            ? "text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1"
            : "text-grey"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
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

      {submenuOpen && (
        <div className="absolute py-2 left-0 mt-0.5 w-60 bg-white shadow-lg rounded-lg">
          {item.submenu?.map((subItem, index) => {
            const isSubItemActive = location.pathname === subItem.href;
            return (
              <Link
                key={index}
                to={subItem.href}
                className={`block px-4 py-2 ${
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

export default HeaderLink;
