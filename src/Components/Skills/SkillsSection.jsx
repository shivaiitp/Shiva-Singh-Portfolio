import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SkillCard from "./SkillCard"; // The new component is imported here

// --- Data Setup ---
const getImage = (imageName) => `/skills/${imageName}`;

const ProgrammingLanguages = [
  { name: "C++", logo: getImage("Cpp.svg"), level: 90 },
  { name: "JavaScript", logo: getImage("JavaScript.svg"), level: 80 },
  { name: "Python", logo: getImage("Python.svg"), level: 70 },
];

const DevelopmentSkills = [
  { name: "HTML5", logo: getImage("HTML5.svg"), level: 95 },
  { name: "CSS3", logo: getImage("CSS3.svg"), level: 80 },
  { name: "React", logo: getImage("React.svg"), level: 80 },
  { name: "Tailwind CSS", logo: getImage("Tailwind_CSS.svg"), level: 85 },
  { name: "Node.js", logo: getImage("Node_js.svg"), level: 50 },
  { name: "Express.js", logo: getImage("Express.svg"), level: 50 },
  
];

const DatabaseSkills = [
  { name: "MongoDB", logo: getImage("MongoDB.svg"), level: 70 },
  { name: "MySQL", logo: getImage("MySQL.svg"), level: 80 },
]

const MachineLearningSkills = [
  { name: "Scikit-learn", logo: getImage("Scikit_learn.svg"), level: 70 },
  { name: "Pandas", logo: getImage("Pandas.svg"), level: 75 },
  { name: "NumPy", logo: getImage("NumPy.svg"), level: 70 },
  { name: "Supervised Learning", logo: getImage("Supervised.png"), level: 50 },
  { name: "Unsupervised Learning", logo: getImage("Unsupervised.png"), level: 50 },
  { name: "Neural Networks", logo: getImage("Neural_Networks.png"), level: 40 },
];

const ToolsAndPlatforms = [
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
  // The parent component no longer needs to manage hover or progress state.
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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
      </motion.div>

      <motion.p variants={itemVariants} className="text-justify max-w-4xl text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        I am a highly skilled and adaptable developer with a strong technical foundation and excellent interpersonal abilities. I am proficient in{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text font-bold">Data Structures and Algorithms</span>, OOP, and DBMS.
      </motion.p>
      
      <motion.div variants={itemVariants} className="w-full max-w-4xl p-3 mb-12 text-sm text-center text-cyan-800 dark:text-cyan-200 bg-cyan-100/50 dark:bg-cyan-900/30 border border-cyan-400/30 rounded-lg flex items-center justify-center gap-3 shadow-inner">
        <span className="text-lg">💡</span>
        <span><strong>Pro Tip:</strong> Hover over any skill to see my proficiency level.</span>
      </motion.div>

      {/* Technical Skills Section */}
      <motion.div className="w-full max-w-7xl mb-16" variants={itemVariants}>
        <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
          <span className="relative z-10">⚙️ Technical Skills</span>
          <motion.div className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400" initial={{ width: 0 }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.h3>

        <div className="space-y-12">
            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl p-8 pt-10">
                <span className="absolute -top-3.5 left-6 bg-gray-100 dark:bg-gray-900 px-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Programming Languages
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
                    {ProgrammingLanguages.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} />)}
                </div>
            </div>

            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl p-8 pt-10">
                <span className="absolute -top-3.5 left-6 bg-gray-100 dark:bg-gray-900 px-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Development
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
                    {DevelopmentSkills.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} />)}
                </div>
            </div>
            
            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl p-8 pt-10">
                <span className="absolute -top-3.5 left-6 bg-gray-100 dark:bg-gray-900 px-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Databases
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
                    {DatabaseSkills.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} />)}
                </div>
            </div>
            
            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl p-8 pt-10">
                <span className="absolute -top-3.5 left-6 bg-gray-100 dark:bg-gray-900 px-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Machine Learning
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
                    {MachineLearningSkills.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} pathColor="#F97316" />)}
                </div>
            </div>

            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl p-8 pt-10">
                <span className="absolute -top-3.5 left-6 bg-gray-100 dark:bg-gray-900 px-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Tools & Platforms
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
                    {ToolsAndPlatforms.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} />)}
                </div>
            </div>
        </div>
      </motion.div>

      {/* Soft Skills Section */}
      <motion.div className="w-full max-w-7xl" variants={itemVariants}>
        <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
          <span className="relative z-10">🤝 Soft Skills</span>
          <motion.div className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400" initial={{ width: 0 }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
          {SoftSkills.map((skill) => <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} pathColor="#facc15" />)}
        </div>
      </motion.div>
    </motion.section>
  );
}
