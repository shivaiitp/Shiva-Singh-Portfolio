import React from "react";
import ProjectCard from "./ProjectCard"; // This now imports the enhanced card
import { motion } from "framer-motion";

// --- Project Data with Corrected Paths ---
const projects = [
    {
        title: "Bhav Book",
        description: "Bhav Book is a modern web app for tracking daily emotions with a clean, responsive UI. A user can enter their emotions and about their day, and the app generates a summary and provides insights over time using AI. It also suggests what to do next to overcome negative emotions.",
        image: "/Project/Bhav-Book.png", // Corrected Path
        tech: ["React", "Node", "Express", "Tailwind CSS","HTML", "JavaScript", "Framer-Motion", "Firebase","MongoDB", "Gemini AI"],
        sourceCode: "https://github.com/shivaiitp/Bhav-Book-App",
        link: "https://bhav-book.vercel.app/",
    },

    {
        title: "Job Portal",
        description: "A full-stack web app connecting employers and job seekers, built with the MERN stack and featuring role-based authentication.",
        image: "/Project/job-portal.png", // Corrected Path
        tech: ["React", "Express", "MongoDB","JavaScript","HTML", "Tailwind CSS", "Redux", "JWT"],
        sourceCode: "https://github.com/shivaiitp/Job-Portal",
        link: "https://job-portal-oc1k.onrender.com/",
    },
    {
        title: "Flight Ticket Booking System",
        description: "A comprehensive console-based airline reservation system in C, demonstrating file handling and data structures.",
        image: "/Project/flight-booking.jpg", // Corrected Path
        tech: ["C", "File Handling", "Data Structures", "Algorithms"],
        sourceCode: "https://github.com/shivaiitp/Flight-TIcket-Booking-system",
    }
];

export default function Projects() {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } };
  const titleVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } } };

  return (
    <motion.section
      id="Projects"
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16
                 text-gray-900 dark:text-gray-100 duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section Title */}
      <motion.div className="relative mb-12" variants={titleVariants}>
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        >
          Projects
        </motion.h2>
        <motion.div className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full" initial={{ width: 0, x: "-50%" }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.3 }} />
      </motion.div>

      {/* Main Content Area */}
      <motion.div className="w-full max-w-7xl" variants={itemVariants}>
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="relative z-10">💻 Development Projects</span>
          <motion.div className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400" initial={{ width: 0 }} viewport={{ once: true}} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.h3>

        {/* Responsive Grid for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
