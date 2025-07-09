import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

// --- Data Setup ---
const getImage = (imageName) => `/skills/${imageName}`;

const TechSkills = [
  { name: "C++", logo: getImage("Cpp.svg"), level: 90 },
  { name: "HTML5", logo: getImage("HTML5.svg"), level: 95 },
  { name: "CSS3", logo: getImage("CSS3.svg"), level: 80 },
  { name: "JavaScript", logo: getImage("JavaScript.svg"), level: 80 },
  { name: "React", logo: getImage("React.svg"), level: 80 },
  { name: "Tailwind CSS", logo: getImage("Tailwind_CSS.svg"), level: 85 },
  { name: "Node.js", logo: getImage("Node_js.svg"), level: 50 },
  { name: "Express.js", logo: getImage("Express.svg"), level: 50 },
  { name: "MongoDB", logo: getImage("MongoDB.svg"), level: 70 },
  { name: "MySQL", logo: getImage("MySQL.svg"), level: 80 },
  { name: "Python", logo: getImage("Python.svg"), level: 70 },
  { name: "Git", logo: getImage("Git.svg"), level: 80 },
  { name: "GitHub", logo: getImage("GitHub.svg"), level: 80 },
  { name: "VsCode", logo: getImage("VScode.svg"), level: 95 },
];

const SoftSkills = [
  { name: "Communication", logo: getImage("Com.png"), level: 95 },
  { name: "Teamwork", logo: getImage("TeamWork.png"), level: 85 },
  { name: "Creativity", logo: getImage("Creativity.png"), level: 90 },
  { name: "Creative Thinking", logo: getImage("CreThi.png"), level: 85 },
  { name: "Problem Solving", logo: getImage("ProSol.png"), level: 95 },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [progress, setProgress] = useState(0);

  // FIXED: Added state and effect to detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // This function checks if the `dark` class is present on the root <html> element
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Check the theme when the component first mounts
    checkTheme();

    // Set up a MutationObserver to watch for changes to the class attribute on <html>
    // This makes the theme switching dynamic without a page reload.
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (hoveredSkill) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        if (currentProgress >= hoveredSkill.level) {
          clearInterval(interval);
          currentProgress = hoveredSkill.level;
        }
        setProgress(currentProgress);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [hoveredSkill]);

  // --- Animation Variants ---
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } };
  const titleVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } } };

  return (
    <motion.section
      id="Skills"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-900 dark:text-gray-100 duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Enhanced Section Title */}
      <motion.div className="relative mb-12" variants={titleVariants}>
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        >
          Skills
        </motion.h2>
        <motion.div className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full" initial={{ width: 0, x: "-50%" }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 dark:bg-blue-400/20 rounded-full" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full" animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      </motion.div>

      <motion.p variants={itemVariants} className="text-justify max-w-4xl text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
        I am a highly skilled and adaptable developer with a strong technical foundation and excellent interpersonal abilities. I am proficient in{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text font-bold">Data Structures and Algorithms</span>{" "}
        in C++, Object-Oriented Programming, and Database Management Systems (DBMS).
      </motion.p>

      {/* Technical Skills Section */}
      <motion.div className="w-full max-w-7xl mb-16" variants={itemVariants}>
        <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
          <span className="relative z-10">⚙️ Technical Skills</span>
          <motion.div className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400" initial={{ width: 0 }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
          {TechSkills.map((skill, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer w-32 h-32 overflow-hidden"
            >
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${hoveredSkill?.name === skill.name ? "opacity-0" : "opacity-100"}`}>
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
                <p className="text-gray-900 dark:text-white text-sm font-medium mt-2">{skill.name}</p>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${hoveredSkill?.name === skill.name ? "opacity-100" : "opacity-0"}`}>
                <div className="w-20 h-20">
                  <CircularProgressbar
                    value={hoveredSkill?.name === skill.name ? progress : 0}
                    text={`${hoveredSkill?.name === skill.name ? progress : 0}%`}
                    styles={buildStyles({
                      // FIXED: Logic now correctly uses the isDarkMode state
                      textColor: isDarkMode ? "#ffffff" : "black",
                      pathColor: "#4ade80",
                      trailColor: isDarkMode ? "#374151" : "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Soft Skills Section */}
      <motion.div className="w-full max-w-7xl" variants={itemVariants}>
        <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
          <span className="relative z-10">🤝 Soft Skills</span>
          <motion.div className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400" initial={{ width: 0 }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
          {SoftSkills.map((skill, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer w-32 h-32 overflow-hidden"
            >
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${hoveredSkill?.name === skill.name ? "opacity-0" : "opacity-100"}`}>
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
                <p className="text-gray-900 dark:text-white text-sm font-medium mt-2">{skill.name}</p>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${hoveredSkill?.name === skill.name ? "opacity-100" : "opacity-0"}`}>
                <div className="w-20 h-20">
                  <CircularProgressbar
                    value={hoveredSkill?.name === skill.name ? progress : 0}
                    text={`${hoveredSkill?.name === skill.name ? progress : 0}%`}
                    styles={buildStyles({
                      // FIXED: Logic now correctly uses the isDarkMode state
                      textColor: isDarkMode ? "#ffffff" : "black",
                      pathColor: "#facc15",
                      trailColor: isDarkMode ? "#374151" : "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}


// my comments