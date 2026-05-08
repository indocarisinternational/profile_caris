import React, { useEffect, useRef, useState } from "react";
import Logo from "../Header/Logo/index";
import { headerData } from "../Routes/index";
import HeaderLink from "./HeaderLink";
import MobileHeaderLink from "./MobileHeaderLink";
import { Icon } from "@iconify/react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const mobileMenuRef = useRef(null);

  // // Debug: log headerData
  // console.log("Header Data:", headerData);
  // console.log("Navbar Open:", navbarOpen);

  // Handle sticky navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setSticky(currentScrollY > 20);

      if (window.innerWidth >= 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        navbarOpen
      ) {
        setNavbarOpen(false);
      }
    };

    if (navbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [navbarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && navbarOpen) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navbarOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white border-b ${sticky
            ? "shadow-lg py-2 sm:py-3 lg:py-4"
            : "shadow-none py-3 sm:py-4 lg:py-6"
          } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 z-50">
              <Logo />
            </div>

            <nav
              id="navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 justify-center flex-1"
              aria-label="Main navigation"
            >
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4 justify-end flex-shrink-0">
              <LanguageSwitcher />
              <span className="text-sm xl:text-lg font-semibold text-gray-800 whitespace-nowrap">
                Indo Caris International
              </span>
            </div>

            <button
              onClick={() => {
                console.log("Mobile menu button clicked!");
                setNavbarOpen(!navbarOpen);
              }}
              className="lg:hidden p-2 rounded-lg z-50 relative bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 ${navbarOpen ? "rotate-45 translate-y-0.5" : ""
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${navbarOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${navbarOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${navbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setNavbarOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <Logo />
            <button
              onClick={() => setNavbarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Close menu"
            >
              <Icon icon="tabler:x" className="text-black text-2xl" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 bg-white overflow-y-auto">
            <div className="space-y-2">
              {headerData?.length > 0 ? (
                headerData.map((item, index) => (
                  <MobileHeaderLink
                    key={index}
                    item={item}
                    onNavigate={() => setNavbarOpen(false)}
                  />
                ))
              ) : (
                <div className="text-red-500 p-4 bg-red-100 rounded">
                  No menu items found! Check your headerData.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center font-semibold text-gray-800">
              Indo Caris International
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
