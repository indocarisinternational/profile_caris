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
    <footer className="bg-sky-200 py-12">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Grid Utama */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Logo & Sosmed */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Logo />
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/indo-caris-international"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black text-2xl transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Icon icon="tabler:brand-linkedin" />
              </a>
              <a
                href="https://www.instagram.com/carisinternational"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-black text-2xl transition-colors duration-200"
                aria-label="Instagram"
              >
                <Icon icon="tabler:brand-instagram" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-black">{t("footer.links")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
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
            <h3 className="mb-4 text-lg font-semibold text-black">{t("footer.other")}</h3>
            <ul className="space-y-2">
              {otherLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="text-black/60 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Icon
                icon="tabler:brand-google-maps"
                className="text-primary text-2xl"
              />
              <p className="text-black/70">{t("footer.location")}</p>
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
            {t("footer.copyright")}{" "}
            <a href="/" className="hover:text-primary font-medium">
              Indo Caris International
            </a>
          </p>
          <div className="flex gap-6">
            <Link
              to="/about"
              className="text-black/60 text-sm hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/about"
              className="text-black/60 text-sm hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

