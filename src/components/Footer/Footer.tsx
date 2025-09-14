import React from "react";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo/index";
import { headerData } from "../Routes/index";

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-200 py-10">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* Logo & Social Media */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Logo />
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-facebook" />
              </a>
              <a href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-twitter" />
              </a>
              <a href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-instagram" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Links</h3>
            <ul>
              {headerData.map((item, index) => (
                <li
                  key={index}
                  className="mb-2 text-black/50 hover:text-primary w-fit"
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div className="col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Other</h3>
            <ul>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <a href="#">Our Team</a>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <a href="#">Career</a>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <a href="#">Services</a>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-2">
              <Icon
                icon="tabler:brand-google-maps"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">Bandung, Indonesia</h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon="tabler:phone"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">+62 8139 3139 307</h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon="tabler:folder"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">admin@caris.web.id</h5>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 lg:flex items-center justify-between">
          <h4 className="text-black/50 text-sm text-center lg:text-start font-normal">
            @2021 Company. All Rights Reserved by{" "}
            <a
              href="https://getnextjstemplates.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Indo Caris Internaional
            </a>
          </h4>
          <div className="flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start">
            <a
              href="/"
              className="text-black/50 text-sm font-normal hover:text-primary"
            >
              Privacy policy
            </a>
            <a
              href="/"
              className="text-black/50 text-sm font-normal hover:text-primary"
            >
              Terms & conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
