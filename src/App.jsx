import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Companies from "./components/Companies/Companies";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { ProjectsLazy, TeamsLazy, TestimonialLazy } from "./components/LazyLoad/LazyWrapper";
import DetailTeam from "./components/Team/DetailTeam";
import SEO from "./components/SEO/SEO";
import Schema from "./components/SEO/Schema";
import SkipLinks from "./components/Accessibility/SkipLinks";
import About from "./components/Pages/About";
import Services from "./components/Pages/Services";
import Contact from "./components/Pages/Contact";
import AllProjects from "./components/Projects/AllProjects";
import ProjectDetail from "./components/Projects/ProjectDetail";
import PageTracker from "./components/PageTracker";
import { Analytics } from "@vercel/analytics/react";
import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";

import usePageTracking from "./hooks/usePageTracking";
import AdminRoute from "./components/AdminRoute";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HomeEditor from "./pages/admin/sections/HomeEditor";
import ServicesEditor from "./pages/admin/sections/ServicesEditor";
import ProjectsEditor from "./pages/admin/sections/ProjectsEditor";
import AboutEditor from "./pages/admin/sections/AboutEditor";
import ContactEditor from "./pages/admin/sections/ContactEditor";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const App = () => {
  usePageTracking();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin-panel");

  return (
    <>
      <Analytics />
      <PageTracker />
      <SkipLinks />
      {!isAdmin && <Header />}
      {!isAdmin && <WhatsAppFloat />}
      <main id="main-content">
        <Routes>
          {/* Halaman utama */}
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Indo Caris International - Leading IT Consultant & Digital Solutions Jakarta"
                  description="Transform your business with Indo Caris International's expert IT consulting services."
                  keywords="IT Consultant Jakarta, Digital Solutions Jakarta, Software Development Indonesia"
                  url="/"
                />
                <Schema type="organization" />
                <Schema type="localbusiness" />
                <Schema type="service" />
                <Hero />
                <Companies />
                <ProjectsLazy />
                <TeamsLazy />
                <TestimonialLazy />
                <Footer />
              </>
            }
          />

          {/* All Projects page */}
          <Route path="/projects" element={<><AllProjects /><Footer /></>} />

          {/* Project detail page */}
          <Route path="/project/:id" element={<><ProjectDetail /><Footer /></>} />

          {/* About page */}
          <Route path="/about" element={<><About /><Footer /></>} />

          {/* Services page */}
          <Route path="/services" element={<><Services /><Footer /></>} />

          {/* Contact page */}
          <Route path="/contact" element={<><Contact /><Footer /></>} />

          {/* Halaman detail employee */}
          <Route path="/:slug" element={<DetailTeam />} />

          {/* Admin Routes */}
          <Route path="/admin-panel" element={<Navigate to="/admin-panel/dashboard" replace />} />
          <Route path="/admin-panel/auth" element={<AdminAuth />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin-panel/dashboard" element={<AdminDashboard />}>
              <Route index element={<Navigate to="/admin-panel/dashboard/home" replace />} />
              <Route path="home" element={<HomeEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="contact" element={<ContactEditor />} />
            </Route>
            <Route path="/admin-panel/analytics" element={<AdminDashboard />}>
              <Route index element={<AdminAnalytics />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
