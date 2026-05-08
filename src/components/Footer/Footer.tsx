import React from "react";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo/index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("nav.home"), href: "/#home-section" },
    { label: t("nav.project"), href: "/#projects" },
    { label: t("nav.teams"), href: "/#employees" },
    { label: t("nav.testimonial"), href: "/#testimonial" },
  ];

  const otherLinks = [
    { label: t("footer.about_us"), href: "/about" },
    { label: t("footer.our_team"), href: "/#employees" },
    { label: t("footer.services"), href: "/services" },
    { label: t("footer.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-black py-20 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-12">
          {/* Logo & Info */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <Logo />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Indo Caris International is a leading IT consulting firm providing high-end software development and digital transformation solutions.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/company/indo-caris-international"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Icon icon="tabler:brand-linkedin" fontSize={24} />
              </a>
              <a
                href="https://www.instagram.com/carisinternational"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Icon icon="tabler:brand-instagram" fontSize={24} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">{t("footer.links")}</h3>
            <ul className="space-y-4">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">{t("footer.other")}</h3>
            <ul className="space-y-4">
              {otherLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Icon icon="tabler:map-pin" className="text-white/40 mt-1" />
                <p className="text-gray-500 text-sm leading-relaxed">{t("footer.location")}</p>
              </div>
              <div className="flex items-center gap-4">
                <Icon icon="tabler:phone" className="text-white/40" />
                <p className="text-gray-500 text-sm">+62 8139 3139 307</p>
              </div>
              <div className="flex items-center gap-4">
                <Icon icon="tabler:mail" className="text-white/40" />
                <p className="text-gray-500 text-sm">admin@carisinternational.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Indo Caris International. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/about" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
