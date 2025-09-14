import Companies from "./components/Companies/Companies";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Teams from "./components/Teams";
import Testimonial from "./components/Testimonials/Testimonials";

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <Companies />
      <Projects />
      <Teams />
      <Testimonial />
      <Footer />
    </>
  );
};

export default App;
