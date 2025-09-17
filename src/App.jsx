import { Routes, Route } from "react-router-dom";
import Companies from "./components/Companies/Companies";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { ProjectsLazy, TeamsLazy, TestimonialLazy } from "./components/LazyLoad/LazyWrapper";
import DetailTeam from "./components/Team/DetailTeam";
import SEO from "./components/SEO/SEO";
import Schema from "./components/SEO/Schema";
import SkipLinks from "./components/Accessibility/SkipLinks";

const App = () => {
  return (
    <>
      <SkipLinks />
      <Header />
      <main id="main-content">
        <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
              <SEO 
                title="Indo Caris International - Leading IT Consultant & Digital Solutions Jakarta"
                description="Transform your business with Indo Caris International's expert IT consulting services. We deliver scalable digital solutions, innovative software development, and comprehensive technology strategies for companies across Jakarta and Indonesia."
                keywords="IT Consultant Jakarta, Jasa IT Support Indonesia, Digital Solutions Jakarta, Software Development Indonesia, Technology Consultant Jakarta, IT Services Indonesia, Digital Transformation Jakarta"
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

        {/* Halaman detail employee */}
        <Route path="/:slug" element={<DetailTeam />} />
      </Routes>
      </main>
    </>
  );
};

export default App;
