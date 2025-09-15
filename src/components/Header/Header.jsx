import React, { useEffect, useRef, useState } from "react";
import Logo from "../Header/Logo/index";
import { headerData } from "../Routes/index";
import HeaderLink from "./HeaderLink";
import MobileHeaderLink from "./MobileHeaderLink";
import { Icon } from "@iconify/react";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const mobileMenuRef = useRef(null);

  // Handle sticky navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // sticky effect
      setSticky(currentScrollY > 20);

      // auto hide
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false); // scroll down → hide
      } else {
        setVisible(true); // scroll up → show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white ${
        sticky ? "shadow-lg py-4" : "shadow-none py-6"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md grid grid-cols-3 items-center px-4">
        {/* Kiri: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Tengah: Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-8 justify-center">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>

        {/* Kanan: Tulisan Indo Caris International */}
        <div className="hidden lg:flex justify-end">
          <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            Indo Caris International
          </span>
        </div>

        {/* Tombol Mobile Menu */}
        <div className="flex justify-end lg:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
          </button>
        </div>
      </div>

      {/* Overlay Mobile Menu */}
      {navbarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setNavbarOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            className="w-5 h-5 absolute top-0 right-0 mr-8 mt-8"
            aria-label="Close menu Modal"
          >
            <Icon icon="tabler:x" className="text-black text-2xl" />
          </button>
        </div>
        <nav className="flex flex-col items-center p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className="mt-4 w-full text-center font-semibold text-gray-800">
            Indo Caris International
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
