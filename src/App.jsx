import { Routes, Route } from "react-router-dom";
import Companies from "./components/Companies/Companies";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Teams from "./components/Team/Teams";
import Testimonial from "./components/Testimonials/Testimonials";
import DetailTeam from "./components/Team/DetailTeam";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Companies />
              <Projects />
              <Teams />
              <Testimonial />
              <Footer />
            </>
          }
        />

        {/* Halaman detail employee */}
        <Route path="/:slug" element={<DetailTeam />} />
      </Routes>
    </>
  );
};

export default App;
