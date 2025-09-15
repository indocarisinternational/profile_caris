import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const DetailTeam = () => {
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
          <p className="text-xl text-white mt-4">Loading employee detail...</p>
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
            Back to Team
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
            Employee Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The employee you're looking for doesn't exist.
          </p>
          <Link
            to="/team"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <ArrowLeftIcon />
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const backgroundImage =
    "https://source.unsplash.com/1920x1080/?office,business,professional";

  return (
    <div
      className={`font-sans antialiased leading-normal tracking-wider bg-cover min-h-screen transition-all duration-300 ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/team"
          className={`inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 bg-opacity-80 text-white hover:bg-opacity-100"
              : "bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100"
          } backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
        >
          <ArrowLeftIcon />
          Back to Team
        </Link>
      </div>

      <div className="max-w-6xl flex items-center min-h-screen flex-wrap mx-auto py-16 px-4">
        {/* Main Profile Card */}
        <div
          className={`w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl mx-6 lg:mx-0 transition-all duration-300 backdrop-blur-sm ${
            darkMode ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"
          }`}
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Mobile Image */}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center border-4 border-white"
              style={{
                backgroundImage: `url('${
                  employee.profile_photo_url
                    ? `${
                        import.meta.env.VITE_SUPABASE_URL
                      }/storage/v1/object/public/employees/${
                        employee.profile_photo_url
                      }`
                    : "/images/default-avatar.png"
                }')`,
              }}
            ></div>

            {/* Employee Code Badge */}
            {employee.employee_code && (
              <div className="flex justify-center lg:justify-start mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  ID: {employee.employee_code}
                </span>
              </div>
            )}

            {/* Name */}
            <h1 className="text-4xl font-bold pt-4 lg:pt-0 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {employee.full_name}
            </h1>

            {/* Company */}
            <p
              className={`text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {employee.company_name}
            </p>

            {/* Divider */}
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>

            {/* Position & Level */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-center lg:justify-start">
                <BriefcaseIcon />
                <span className="text-lg font-bold">
                  {employee.position}
                  {employee.job_level && (
                    <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {employee.job_level}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Department & Location */}
            <div
              className={`pt-2 text-sm flex items-center justify-center lg:justify-start ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <MapPinIcon />
              {employee.department} • Jakarta, Indonesia
            </div>

            {/* Join Date & Work Period */}
            {employee.join_date && (
              <div
                className={`pt-2 text-sm flex items-center justify-center lg:justify-start ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <CalendarIcon />
                <span>
                  Bergabung {formatDate(employee.join_date)}
                  <span className="ml-2 text-blue-600 font-medium">
                    ({calculateWorkPeriod(employee.join_date)})
                  </span>
                </span>
              </div>
            )}

            {/* Contact Information */}
            <div className="pt-6 space-y-3">
              {employee.email_office && (
                <div className="flex items-center justify-center lg:justify-start text-sm">
                  <MailIcon />
                  <a
                    href={`mailto:${employee.email_office}`}
                    className="hover:text-blue-600 transition-colors duration-300 break-all"
                  >
                    {employee.email_office}
                  </a>
                </div>
              )}

              {employee.phone_number && (
                <div className="flex items-center justify-center lg:justify-start text-sm">
                  <PhoneIcon />
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
              <div className="pt-6">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <StarIcon />
                  <span className="font-semibold">Spesialisasi</span>
                </div>
                <p className="text-sm leading-relaxed pl-6">
                  {employee.specialization}
                </p>
              </div>
            )}

            {/* Badges */}
            {employee.badges && employee.badges.length > 0 && (
              <div className="pt-6">
                <h4 className="font-semibold mb-3 flex items-center justify-center lg:justify-start">
                  <StarIcon />
                  Achievements
                </h4>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {employee.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-8 pb-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              {employee.email_office && (
                <a
                  href={`mailto:${employee.email_office}`}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Get In Touch
                </a>
              )}

              {employee.cv_url && (
                <a
                  href={`${
                    import.meta.env.VITE_SUPABASE_URL
                  }/storage/v1/object/public/employees/${employee.cv_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center"
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

              {employee.phone_number && (
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
              )}

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
                  href={`https://www.instagram.com/${employee.instagram_url}`}
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
        <div className="w-full lg:w-2/5">
          <img
            src={
              employee.profile_photo_url
                ? `${
                    import.meta.env.VITE_SUPABASE_URL
                  }/storage/v1/object/public/employees/${
                    employee.profile_photo_url
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

        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleDarkMode}
            className={`focus:outline-none text-2xl hover:scale-110 transition-transform duration-300 p-3 rounded-full ${
              darkMode
                ? "bg-gray-800 bg-opacity-80 hover:bg-opacity-100"
                : "bg-white bg-opacity-80 hover:bg-opacity-100"
            } backdrop-blur-sm shadow-lg`}
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTeam;
