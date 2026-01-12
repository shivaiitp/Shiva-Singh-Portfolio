import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

// --- Project Data (No changes needed) ---
const projects = [
    {
        title: "Bhav Book",
        description: "Bhav Book is a modern web app for tracking daily emotions with a clean, responsive UI. A user can enter their emotions and about their day, and the app generates a summary and provides insights over time using AI. It also suggests what to do next to overcome negative emotions.",
        image: "/Project/Bhav-Book.png",
        tech: ["React", "Node", "Express", "Tailwind CSS", "Framer-Motion", "Firebase","MongoDB", "Gemini AI"],
        sourceCode: "https://github.com/shivaiitp/Bhav-Book-App",
        link: "https://bhav-book.vercel.app/",
    },
    {
        title: "Job Portal",
        description: "A full-stack web app connecting employers and job seekers, built with the MERN stack and featuring role-based authentication.",
        image: "/Project/job-portal.png",
        tech: ["React", "Express", "MongoDB", "Tailwind CSS", "Redux", "JWT"],
        sourceCode: "https://github.com/shivaiitp/Job-Portal",
        link: "https://job-portal-oc1k.onrender.com/",
    },
    {
        title: "Flight Ticket Booking System",
        description: "A comprehensive console-based airline reservation system in C, demonstrating file handling and data structures.",
        image: "/Project/flight-booking.jpg",
        tech: ["C", "File Handling", "Data Structures", "Algorithms"],
        sourceCode: "https://github.com/shivaiitp/Flight-TIcket-Booking-system",
    }
];

// --- Animation Variants (No changes needed) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const titleVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } } };

function Projects() {
  return (
    <motion.section
      id="Projects"
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Title */}
      <motion.div className="relative mb-12" variants={titleVariants}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
          Projects
        </h2>
        <motion.div className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" initial={{ width: 0, x: "-50%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
      </motion.div>

      {/* Main Content Area */}
      <motion.div className="w-full max-w-7xl" variants={containerVariants}>
        <motion.h3
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative z-10">💻 Development Projects</span>
        <motion.div
          className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
            {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
            ))}
        </motion.div>
      </motion.div>
      <h3 className="mt-8 text-xl dark:text-white">Find More on <a href="https://github.com/shivaiitp" target="_blank" className="text-blue-700 dark:text-blue-700" rel="noopener noreferrer">GitHub</a></h3>
    </motion.section>
  );
}

export default React.memo(Projects);