import React from 'react';
import { ThemeProvider } from './Components/ThemeContext';
import GlobalBackground from './Components/GlobalBackground'; // Add this import
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from "./Components/About/AboutSection";
import ContactSection from "./Components/Contact/ContactSection";
import Experience from "./Components/Experience/ExperienceSection";
import Footer from "./Components/Footer";
import Projects from "./Components/Projects/ProjectsSection";
import Skills from "./Components/Skills/SkillsSection";

function App() {
  return (
    <ThemeProvider>
      <GlobalBackground variant="default">
        <div className="App">
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <ContactSection />
          <Footer />
        </div>
      </GlobalBackground>
    </ThemeProvider>
  );
}

export default App;
