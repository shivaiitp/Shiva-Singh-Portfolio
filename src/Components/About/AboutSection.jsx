import React from "react";
import EducationCard from "./EducationCard";
import TechnicalProfileCard from "./TechnicalProfileCard";
import InteractiveText from "./InteractiveText";
import Hobbies from "./Hobbies"; // Add this import
import { motion } from "framer-motion";

const introText = `I'm a passionate developer who loves creating seamless and interactive web experiences. 
With expertise in React, Tailwind, and backend technologies, I build scalable and user-friendly 
applications that focus on performance and intuitive design. My goal is to craft digital solutions 
that not only meet user expectations but exceed them, ensuring smooth functionality and a visually appealing interface.

I thrive on tackling complex challenges and transforming ideas into reality through clean, efficient code. 
Beyond development, I enjoy collaborating with like-minded professionals, exchanging knowledge, and staying 
updated with the latest industry trends. My commitment to continuous learning drives me to explore 
emerging technologies, refine my skills, and push the boundaries of what's possible in modern web development.`;

const technicalProfiles = [
  {
    platform: "leetcode",
    username: "shivu_iitp",
    profileLink: "https://leetcode.com/shivu_iitp",
    fallbackStats: {
      totalSolved: 466,
      rating: 1934,
    },
  },
  {
    platform: "codeforces",
    username: "shiva_iitp22",
    profileLink: "https://codeforces.com/profile/shiva_iitp22",
    fallbackStats: {
      totalSolved: 212,
      rating: 1438,
    },
  },
  {
    platform: "geeksforgeeks",
    username: "shivaigz33",
    profileLink: "https://auth.geeksforgeeks.org/user/shivaigz33/",
    fallbackStats: {
      totalSolved: 222,
      rating: "652",
    },
  },
];

const educationData = [
  {
    title: "Graduation",
    College: "Indian Institute of Technology Patna",
    Course: "Bachelor's of Technology",
    Branch: "Electrical and Electronics Engineering",
    Marks: <span>CGPA: 7.61 (Till 5<sup>th</sup> Sem)</span>,
    Year: "Duration: 2022 - 2026",
  },
  {
    title: "Senior Secondary",
    College: "Rajasthan Board of Secondary Education",
    Course: "Physics, Chemistry and Mathematics",
    Branch: "Marks: 484/500",
    Marks: "Percentage: 96.80 %",
    Year: "Duration: 2020 - 2021",
  },
  {
    title: "Secondary Education",
    College: "Rajasthan Board of Secondary Education",
    Course: "Science and Mathematics",
    Branch: "Marks: 526/600",
    Marks: "Percentage: 87.67 %",
    Year: "Duration: 2019 - 2020",
  },
];

const languages = [
  { name: "English", level: "Full Proficiency" },
  { name: "Hindi", level: "Native" },
];

function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.section
      id="About"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-900 dark:text-gray-100 duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Enhanced Section Title */}
      <motion.div
        className="relative mb-12"
        variants={titleVariants}
      >
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%"
          }}
        >
          About Me
        </motion.h2>

        {/* Animated Underline */}
        <motion.div
          className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full"
          initial={{ width: 0, x: "-50%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Enhanced Introduction with Interactive Text - NO HOVER ZOOM */}
      <motion.div
        className="max-w-6xl mb-16"
        variants={itemVariants}
      >
        <motion.div
          className="text-justify text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-xl relative overflow-hidden"
        // REMOVED whileHover scale effect
        >
          {/* Full Opacity Background with Subtle Pattern */}
          <div className="absolute inset-0 bg-white dark:bg-gray-800" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />

          {/* Interactive Text with Mouse-Following Circle */}
          <InteractiveText
            text={introText}
            className="relative z-10"
          />

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500/30 dark:bg-blue-400/30 rounded-full" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-500/30 dark:bg-purple-400/30 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Enhanced Technical Profiles Section */}
      <motion.div
        className="w-full max-w-7xl mb-16"
        variants={itemVariants}
      >
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">🚀 Technical Profiles</span>
          <motion.div
            className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {technicalProfiles.map((profile, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileTap={{ scale: 0.98 }}
              className="transform-gpu"
            >
              <TechnicalProfileCard {...profile} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Educational Background Section */}
      <motion.div
        className="w-full max-w-7xl mb-16"
        variants={itemVariants}
      >
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">🎓 Education </span>
          <motion.div
            className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            viewport={{ once: true }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="transform-gpu"
            >
              <EducationCard {...edu} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Hobbies Section */}
      <motion.div
        className="w-full max-w-7xl mb-16"
        variants={itemVariants}
      >
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">🎨 Hobbies & Interests</span>
          <motion.div
            className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            viewport={{ once: true }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>

        <motion.div
          variants={cardVariants}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
        >

          <Hobbies />
        </motion.div>
      </motion.div>

      {/* Enhanced Language Section */}
      <motion.div
        className="w-full max-w-7xl"
        variants={itemVariants}
      >
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">🌍 Languages</span>
          <motion.div
            className="my-1 bottom-0  left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            viewport={{ once: true }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-6 lg:gap-8 max-w-2xl">
            {languages.map((lang, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className=" cursor-pointer relative group overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 px-6 py-8 rounded-2xl shadow-lg text-center transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <motion.h4
                    className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                    animate={{
                      color: ["#2563eb", "#7c3aed", "#06b6d4", "#2563eb"]
                    }}

                  >
                    {lang.name}
                  </motion.h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {lang.level}
                  </p>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500/30 dark:bg-blue-400/30 rounded-full group-hover:scale-150 transition-transform duration-300" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500/30 dark:bg-purple-400/30 rounded-full group-hover:scale-150 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-blue-400/20 dark:bg-blue-300/10' :
                i % 3 === 1 ? 'bg-purple-400/20 dark:bg-purple-300/10' :
                  'bg-cyan-400/20 dark:bg-cyan-300/10'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default About;
