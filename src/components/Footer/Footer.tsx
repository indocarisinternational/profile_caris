import React from "react";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo/index";
import { headerData } from "../Routes/index";

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-200 py-12">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Grid Utama */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Logo & Sosmed */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Logo />
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-primary text-black text-2xl">
                <Icon icon="tabler:brand-facebook" />
              </a>
              <a href="#" className="hover:text-primary text-black text-2xl">
                <Icon icon="tabler:brand-twitter" />
              </a>
              <a href="#" className="hover:text-primary text-black text-2xl">
                <Icon icon="tabler:brand-instagram" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-black">Links</h3>
            <ul className="space-y-2">
              {headerData.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-black/60 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-black">Other</h3>
            <ul className="space-y-2">
              {["About Us", "Our Team", "Career", "Services", "Contact"].map(
                (text, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-black/60 hover:text-primary transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Icon
                icon="tabler:brand-google-maps"
                className="text-primary text-2xl"
              />
              <p className="text-black/70">Bandung, Indonesia</p>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="tabler:phone" className="text-primary text-2xl" />
              <p className="text-black/70">+62 8139 3139 307</p>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="tabler:mail" className="text-primary text-2xl" />
              <p className="text-black/70">admin@carisinternational.com</p>
            </div>
          </div>
        </div>

        {/* Bawah */}
        <div className="mt-10 border-t border-black/10 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-black/60 text-sm text-center lg:text-left">
            © 2021 Company. All Rights Reserved by{" "}
            <a href="#" className="hover:text-primary font-medium">
              Indo Caris International
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="/"
              className="text-black/60 text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="text-black/60 text-sm hover:text-primary transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
