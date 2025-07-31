import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './Components/ThemeContext';
import GlobalBackground from './Components/GlobalBackground';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
// Using React.lazy to dynamically import components for code-splitting.
// These components will not be included in the initial JavaScript bundle.
const About = lazy(() => import('./Components/About/AboutSection'));
const Skills = lazy(() => import('./Components/Skills/SkillsSection'));
const Experience = lazy(() => import('./Components/Experience/ExperienceSection'));
const Projects = lazy(() => import('./Components/Projects/ProjectsSection'));
const ContactSection = lazy(() => import('./Components/Contact/ContactSection'));
const Footer = lazy(() => import('./Components/Footer'));

// A simple fallback component to show while other components are loading.
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <GlobalBackground variant="default">
        <div className="App">
          <Navbar />
          <Home />
          {/* Suspense will show the fallback UI until the requested component has loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <ContactSection />
            <Footer />
          </Suspense>
        </div>
      </GlobalBackground>
    </ThemeProvider>
  );
}

export default React.memo(App);