import './App.css';

import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import WhyNirmiti from './components/WhyNirmiti';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Global ambient elements */}
      <CursorGlow />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Philosophy />
        <Services />
        <WhyNirmiti />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
