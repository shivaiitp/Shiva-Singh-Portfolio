import React from "react";
import ExperienceCard from "./ExperienceCard";
import { motion } from "framer-motion";

// --- UPDATED DATA with 'link' property ---
const experiences = [
  {
    company: "TRDDC - Tata Research Development and Design Centre",
    role: "Research Intern",
    duration: "May 2025 - July 2025",
    place: "Onsite",
    description: "Contributed to a research-driven personalization project by developing an algorithm to identify the user type and classify behavioral personas for content creation. Explored and integrated LLMs (Large Language Models) with the existing algorithm to enhance the quality and accuracy of output.",
    link: "https://www.tcs.com/what-we-do/research", // Example link added
  },
  {
    company: "Fact App",
    role: "Growth Intern",
    duration: "June 2023 - July 2023",
    place: "Remote",
    description:
      "Worked as a Growth Intern focusing on Marketing and Mentoring. Mentored 2000+ JEE aspirants, helping them secure admission into IITs. Established school partnerships through seminars to promote the Fact App and enhance awareness. Successfully secured a spot in the transformative category (TOP) on the final leaderboard.",
    // No link here, so the icon won't appear on this card.
    link: "https://factapp.in/"
  },
];

const pors = [
  {
    company: "Celesta - Techno-Management Fest of IIT Patna",
    role: "Coordinator",
    duration: "March 2024 - March 2025",
    description:
      "Worked in the sponsorship and marketing committee. Communicated with multiple firms for sponsorships and efficiently managed financial aspects during the fest.",
    link: "https://celesta.org.in/", // Example link added
  },
  {
    company: "Syahi - The Literary Club of IIT Patna",
    role: "Sub-Coordinator",
    duration: "March 2023 - March 2024",
    description: "Managed various literary events with the team.",
  },
];

export default function Experience() {
  // --- Animation Variants (for consistency) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.section
      id="Experience"
      // UPDATED: Background colors for better contrast with the cards
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center 
                 dark:text-gray-100 duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Enhanced Section Title (No changes needed here) */}
      <motion.div className="relative mb-12" variants={titleVariants}>
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        >
          Experience
        </motion.h2>
        <motion.div
          className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full"
          initial={{ width: 0, x: "-50%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 dark:bg-blue-400/20 rounded-full" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full" animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      </motion.div>

      {/* Internships Section */}
      <motion.div className="w-full max-w-7xl mb-16" variants={itemVariants}>
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">💼 Internships</span>
          <motion.div
            className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>
        {/* SIMPLIFIED: The ExperienceCard now handles its own animation */}
        <div className="w-full flex flex-col gap-8 items-center">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </motion.div>

      {/* Position of Responsibilities Section */}
      <motion.div className="w-full max-w-7xl" variants={itemVariants}>
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">🏆 Positions of Responsibility</span>
          <motion.div
            className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>
        {/* SIMPLIFIED: The ExperienceCard now handles its own animation */}
        <div className="w-full flex flex-col gap-8 items-center">
          {pors.map((por, index) => (
            <ExperienceCard key={index} experience={por} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
