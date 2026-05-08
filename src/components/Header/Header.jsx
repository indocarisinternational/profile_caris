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

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 border-b border-white/10 ${
          sticky ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 z-50">
              <Logo />
            </div>

            <nav
              id="navigation"
              className="hidden lg:flex items-center gap-8 justify-center flex-1"
              aria-label="Main navigation"
            >
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6 justify-end flex-shrink-0">
              <LanguageSwitcher />
              <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Contact Us
              </button>
            </div>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="lg:hidden p-2 rounded-lg z-50 relative"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    navbarOpen ? "rotate-45 translate-y-0.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
                    navbarOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 bg-black z-50 transform transition-transform duration-500 ease-in-out ${
          navbarOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-12">
            <Logo />
            <button
              onClick={() => setNavbarOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <Icon icon="tabler:x" className="text-white text-3xl" />
            </button>
          </div>

          <nav className="flex-1 space-y-6">
            {headerData.map((item, index) => (
              <MobileHeaderLink
                key={index}
                item={item}
                onNavigate={() => setNavbarOpen(false)}
              />
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10">
            <LanguageSwitcher />
            <div className="mt-6 text-center font-medium text-white/50">
              Indo Caris International
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
