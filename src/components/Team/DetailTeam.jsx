import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";

const DetailTeam = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [employee, setEmployee] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fungsi untuk ubah full_name ke slug
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // fungsi untuk ubah slug kembali ke nama (untuk pencarian yang lebih fleksibel)
  const unSlugify = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("employees").select("*");

        if (error) {
          throw error;
        } else {
          // Cari employee dengan beberapa cara:
          let emp = null;

          // 1. Cari berdasarkan slug yang cocok persis
          emp = data.find((e) => slugify(e.full_name) === slug);

          // 2. Jika tidak ditemukan, cari berdasarkan nama yang di-unslugify
          if (!emp) {
            const searchName = unSlugify(slug);
            emp = data.find(
              (e) => e.full_name.toLowerCase() === searchName.toLowerCase()
            );
          }

          // 3. Jika masih tidak ditemukan, cari dengan pencarian parsial
          if (!emp) {
            const searchTerms = slug.split("-");
            emp = data.find((e) => {
              const fullName = e.full_name.toLowerCase();
              return searchTerms.every((term) =>
                fullName.includes(term.toLowerCase())
              );
            });
          }

          // 4. Pencarian berdasarkan kata kunci dalam nama (lebih fleksibel)
          if (!emp) {
            const searchTerms = slug.split("-");
            emp = data.find((e) => {
              const nameWords = e.full_name.toLowerCase().split(" ");
              return searchTerms.some((term) =>
                nameWords.some(
                  (word) =>
                    word.startsWith(term.toLowerCase()) ||
                    word.includes(term.toLowerCase())
                )
              );
            });
          }

          if (!emp) {
            setError("Employee not found");
          } else {
            setEmployee(emp);
          }
        }
      } catch (err) {
        console.error("Error fetching employee:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEmployee();
    }
  }, [slug]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Helper function untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function untuk hitung masa kerja
  const calculateWorkPeriod = (joinDate) => {
    if (!joinDate) return null;
    const start = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return `${years} tahun ${months} bulan`;
    } else {
      return `${months} bulan`;
    }
  };

  // SVG Icons
  const MailIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg
      className="h-5 w-5 text-blue-600 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const AcademicCapIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    </svg>
  );

  const StarIcon = () => (
    <svg
      className="h-4 w-4 text-blue-600 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg
      className="h-6 w-6"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
          <p className="text-xl text-white mt-4">{t("detail.loading")}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-pink-500">
        <div className="text-center bg-white rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            to="/team"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <ArrowLeftIcon />
            {t("detail.back")}
          </Link>
        </div>
      </div>
    );
  }

  // Employee not found
  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
        <div className="text-center bg-white rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {t("detail.employee_not_found")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("detail.employee_not_found_desc")}
          </p>
          <Link
            to="/team"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <ArrowLeftIcon />
            {t("detail.back")}
          </Link>
        </div>
      </div>
    );
  }

  const backgroundImage = "/bg_p.jpg";

  return (
    <>
      <SEO
        title={`${employee.full_name} - ${employee.position} | Indo Caris International`}
        description={`Meet ${employee.full_name}, ${employee.position
          } at Indo Caris International. ${employee.specialization
            ? employee.specialization
            : `Expert in ${employee.department} with extensive experience in digital solutions and technology consulting.`
          }`}
        keywords={`${employee.full_name}, ${employee.position}, ${employee.department}, Indo Caris International, IT Consultant Jakarta, Team Member`}
        url={`/${slug}`}
        type="profile"
      />
      <Schema
        type="person"
        data={{
          name: employee.full_name,
          jobTitle: employee.position,
          slug: slug,
          description:
            employee.specialization ||
            `${employee.position} at Indo Caris International with expertise in ${employee.department}`,
          image: employee.profile_photo_url
            ? `${import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/employees/${employee.profile_photo_url
            }`
            : "/images/default-avatar.png",
          socialLinks: [
            employee.linkedin_url,
            employee.instagram_url &&
            `https://www.instagram.com/${employee.instagram_url}`,
            employee.portfolio_url,
          ].filter(Boolean),
        }}
      />
      <div
        className={`relative font-sans antialiased mt-17 leading-normal tracking-wider min-h-screen bg-cover bg-center transition-all duration-300 ${darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        {/* Back Button & Dark Mode Toggle */}
        {/* Controls (Back + DarkMode) */}
        <div className="absolute top-6 left-0 w-full flex items-center justify-between px-6 z-10">
          {/* Back Button */}
          <Link
            to="/"
            className={`inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${darkMode
              ? "bg-gray-800 bg-opacity-80 text-white hover:bg-opacity-100"
              : "bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100"
              } backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            <ArrowLeftIcon />
            {t("detail.back")}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`focus:outline-none text-2xl hover:scale-110 transition-transform duration-300 p-3 rounded-full ${darkMode
              ? "bg-gray-800 bg-opacity-80 text-white hover:bg-opacity-100"
              : "bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100"
              } backdrop-blur-sm shadow-lg`}
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-20 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:min-h-0 gap-6 lg:gap-0 relative">
            {/* Mobile Image - Positioned to overlap with card */}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 bg-cover bg-center border-4 border-white relative overflow-hidden z-20 mt-16 -mb-23 sm:-mb-36 md:-mb-40"
              style={{
                backgroundImage: `url('${employee.profile_photo_url
                  ? `${import.meta.env.VITE_SUPABASE_URL
                  }/storage/v1/object/public/employees/${employee.profile_photo_url
                  }`
                  : "/images/default-avatar.png"
                  }')`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></div>

            {/* Main Profile Card */}
            <div
              className={`w-full lg:w-3/5 rounded-2xl lg:rounded-l-2xl lg:rounded-r-none shadow-2xl transition-all duration-300 backdrop-blur-sm overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10 ${darkMode
                ? "bg-gray-900 bg-opacity-90"
                : "bg-white bg-opacity-90"
                }`}
            >
              <div className="p-6 sm:p-8 lg:p-10 text-center lg:text-left space-y-6">
                {/* Employee Code */}
                {employee.employee_code && (
                  <div className="flex justify-center lg:justify-start">
                    <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                      ID: {employee.employee_code}
                    </span>
                  </div>
                )}

                {/* Name */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  {employee.full_name}
                </h1>

                {/* Company */}
                <p
                  className={`text-sm sm:text-base font-medium ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                  {employee.company_name}
                </p>

                {/* Divider */}
                <div className="mx-auto lg:mx-0 w-20 border-b-2 border-blue-500 opacity-30"></div>

                {/* Position & Level */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                  <div className="flex items-center">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-base sm:text-lg font-bold ml-2">
                      {employee.position}
                    </span>
                  </div>
                  {employee.job_level && (
                    <span className="text-xs sm:text-sm bg-green-100 text-green-800 px-2 py-1 rounded whitespace-nowrap">
                      {employee.job_level}
                    </span>
                  )}
                </div>

                {/* Department & Location */}
                <div
                  className={`text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                    <span className="ml-2">{employee.department}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>Jakarta, Indonesia</span>
                </div>

                {/* Join Date & Work Period */}
                {employee.join_date && (
                  <div
                    className={`text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 ${darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-blue-600" />
                      <span className="ml-2">
                        Bergabung {formatDate(employee.join_date)}
                      </span>
                    </div>
                    <div className="text-blue-600 font-medium">
                      ({calculateWorkPeriod(employee.join_date)})
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-3">
                  {employee.email_office && (
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                      <MailIcon className="w-5 h-5 text-blue-600" />
                      <a
                        href={`mailto:${employee.email_office}`}
                        className="hover:text-blue-600 transition-colors duration-300 break-all text-center sm:text-left"
                      >
                        {employee.email_office}
                      </a>
                    </div>
                  )}
                  {employee.phone_number && (
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                      <PhoneIcon className="w-5 h-5 text-blue-600" />
                      <a
                        href={`tel:${employee.phone_number}`}
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {employee.phone_number}
                      </a>
                    </div>
                  )}
                </div>

                {/* Specialization */}
                {employee.specialization && (
                  <div>
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold ml-2 text-base sm:text-lg">
                        Spesialisasi
                      </span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                      {employee.specialization}
                    </p>
                  </div>
                )}

                {/* Achievements */}
                {employee.badges && employee.badges.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center justify-center lg:justify-start text-base sm:text-lg">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="ml-2">Achievements</span>
                    </h4>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {employee.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow whitespace-nowrap"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  {employee.email_office && (
                    <a
                      href={`mailto:${employee.email_office}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      Get In Touch
                    </a>
                  )}
                  {employee.cv_url && (
                    <a
                      href={`${import.meta.env.VITE_SUPABASE_URL
                        }/storage/v1/object/public/employees/${employee.cv_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      Download CV
                    </a>
                  )}
                </div>

                {/* Social Links Section */}
                <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {employee.email_office && (
                    <a
                      href={`mailto:${employee.email_office}`}
                      className="group p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300"
                      title={`Email ${employee.full_name}`}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  )}

                  {/* {employee.phone_number && (
                    <a
                      href={`tel:${employee.phone_number}`}
                      className="group p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300"
                      title={`Call ${employee.full_name}`}
                    >
                      <svg
                        className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </a>
                  )} */}

                  {employee.linkedin_url && (
                    <a
                      href={employee.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300"
                      title={`${employee.full_name} on LinkedIn`}
                    >
                      <div className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                        <LinkedinIcon />
                      </div>
                    </a>
                  )}

                  {employee.instagram_url && (
                    <a
                      href={employee.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-700 transition-all duration-300"
                      title={`${employee.full_name} on Instagram`}
                    >
                      <div className="h-6 w-6 text-gray-500 group-hover:text-pink-600 transition-colors duration-300">
                        <InstagramIcon />
                      </div>
                    </a>
                  )}

                  {employee.portfolio_url && (
                    <a
                      href={employee.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-2 rounded-full hover:bg-purple-100 dark:hover:bg-gray-700 transition-all duration-300"
                      title={`${employee.full_name}'s Portfolio`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Side Image */}
            <div className="w-full lg:w-2/4">
              <img
                src={
                  employee.profile_photo_url
                    ? `${import.meta.env.VITE_SUPABASE_URL
                    }/storage/v1/object/public/employees/${employee.profile_photo_url
                    }`
                    : "/images/default-avatar.png"
                }
                alt={employee.full_name}
                className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block w-full h-96 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ minHeight: "500px" }}
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                }}
              />
            </div>
          </div>
        </div>
        {/* Additional Information Section */}
        {(employee.work_experience ||
          employee.education ||
          employee.address) && (
            <div className="max-w-6xl mx-auto px-4 pb-16">
              <div
                className={`rounded-lg shadow-2xl backdrop-blur-sm p-8 ${darkMode
                  ? "bg-gray-900 bg-opacity-90"
                  : "bg-white bg-opacity-90"
                  }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                  Informasi Tambahan
                </h2>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Work Experience */}
                  {employee.work_experience && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                        <BriefcaseIcon />
                        Pengalaman Kerja
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {employee.work_experience}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {employee.education && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                        <AcademicCapIcon />
                        Pendidikan
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {employee.education}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {employee.address && (
                    <div className="space-y-3 lg:col-span-2">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                        <MapPinIcon />
                        Alamat
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {employee.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        {/* Professional Documents Section */}
        {(employee.cv_url ||
          employee.portfolio_url ||
          employee.digital_signature_url) && (
            <div className="max-w-6xl mx-auto px-4 pb-16">
              <div
                className={`rounded-lg shadow-2xl backdrop-blur-sm p-8 ${darkMode
                  ? "bg-gray-900 bg-opacity-90"
                  : "bg-white bg-opacity-90"
                  }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                  Dokumen Professional
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {employee.cv_url && (
                    <div className="text-center">
                      <div
                        className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          } hover:shadow-lg transition-all duration-300`}
                      >
                        <svg
                          className="h-12 w-12 mx-auto mb-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="font-semibold mb-2">Curriculum Vitae</h3>
                        <a
                          href={`${import.meta.env.VITE_SUPABASE_URL
                            }/storage/v1/object/public/employees/${employee.cv_url
                            }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download CV
                        </a>
                      </div>
                    </div>
                  )}

                  {employee.portfolio_url && (
                    <div className="text-center">
                      <div
                        className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          } hover:shadow-lg transition-all duration-300`}
                      >
                        <svg
                          className="h-12 w-12 mx-auto mb-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <h3 className="font-semibold mb-2">Portfolio</h3>
                        <a
                          href={employee.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          <ExternalLinkIcon />
                          View Portfolio
                        </a>
                      </div>
                    </div>
                  )}

                  {employee.digital_signature_url && (
                    <div className="text-center">
                      <div
                        className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"
                          } hover:shadow-lg transition-all duration-300`}
                      >
                        <svg
                          className="h-12 w-12 mx-auto mb-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <h3 className="font-semibold mb-2">Digital Signature</h3>
                        <img
                          src={`${import.meta.env.VITE_SUPABASE_URL
                            }/storage/v1/object/public/employees/${employee.digital_signature_url
                            }`}
                          alt={`${employee.full_name} Digital Signature`}
                          className="max-h-16 mx-auto bg-white p-2 rounded border"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        {/* Personal Information Section (Sensitive - Optional) */}
        {(employee.blood_type || employee.join_date) && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div
              className={`rounded-lg shadow-2xl backdrop-blur-sm p-8 ${darkMode
                ? "bg-gray-900 bg-opacity-90"
                : "bg-white bg-opacity-90"
                }`}
            >
              <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                Informasi Personal
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {employee.blood_type && (
                  <div className="text-center">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-red-50"
                        }`}
                    >
                      <h4 className="font-semibold text-red-600 mb-1">
                        Golongan Darah
                      </h4>
                      <p className="text-2xl font-bold text-red-500">
                        {employee.blood_type}
                      </p>
                    </div>
                  </div>
                )}

                {employee.join_date && (
                  <div className="text-center">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-green-50"
                        }`}
                    >
                      <h4 className="font-semibold text-green-600 mb-1">
                        Tanggal Bergabung
                      </h4>
                      <p className="text-sm font-medium text-green-700">
                        {formatDate(employee.join_date)}
                      </p>
                    </div>
                  </div>
                )}

                {employee.nik_internal && (
                  <div className="text-center">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"
                        }`}
                    >
                      <h4 className="font-semibold text-blue-600 mb-1">
                        NIK Internal
                      </h4>
                      <p className="text-sm font-mono text-blue-700">
                        {employee.nik_internal}
                      </p>
                    </div>
                  </div>
                )}

                {calculateWorkPeriod(employee.join_date) && (
                  <div className="text-center">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-purple-50"
                        }`}
                    >
                      <h4 className="font-semibold text-purple-600 mb-1">
                        Masa Kerja
                      </h4>
                      <p className="text-sm font-medium text-purple-700">
                        {calculateWorkPeriod(employee.join_date)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR Code Section */}
        {employee.qr_code_url && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div
              className={`rounded-lg shadow-2xl backdrop-blur-sm p-8 text-center ${darkMode
                ? "bg-gray-900 bg-opacity-90"
                : "bg-white bg-opacity-90"
                }`}
            >
              <h2 className="text-2xl font-bold mb-6">QR Code Profile</h2>
              <div className="inline-block p-4 bg-white rounded-lg shadow-inner">
                <QRCode
                  value={employee.qr_code_url} // otomatis generate QR dari link
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Scan untuk melihat informasi kontak
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailTeam;
