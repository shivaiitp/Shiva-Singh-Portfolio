import React from "react";
import { motion } from "framer-motion";
import ExperienceCategory from "./ExperienceCategory"; // Import the new component

// --- Centralized and Structured Data ---
const experienceData = [
  {
    title: "💼 Internships",
    items: [
      {
        company: "Amazon",
        role: "Software Development Engineer Intern",
        duration: "Jan 2026 - June 2026",
        place: "Onsite",
        description: "Working in product relay and tech team to build scalable services for Amazon Shopping. Involved in designing, developing, and deploying high-availability services that enhance user experience and drive business growth.",
        link: "https://relay.amazon.com/",
      },

      {
        company: "TRDDC - Tata Research",
        role: "Research Intern",
        duration: "May 2025 - July 2025",
        place: "Onsite",
        description: "Contributed to a research-driven personalization project by developing an algorithm to identify the user type and classify behavioral personas for content creation. Explored and integrated LLMs (Large Language Models) with the existing algorithm to enhance the quality and accuracy of output.",
        link: "https://www.tcs.com/what-we-do/research",
      },
      {
        company: "Fact App",
        role: "Growth Intern",
        duration: "June 2023 - July 2023",
        place: "Remote",
        description: "Worked as a Growth Intern focusing on Marketing and Mentoring. Mentored 2000+ JEE aspirants, helping them secure admission into IITs. Established school partnerships through seminars to promote the Fact App and enhance awareness. Successfully secured a spot in the transformative category (TOP) on the final leaderboard.",
        link: "https://factapp.in/",
      },
    ],
  },
  {
    title: "🏆 Positions of Responsibility",
    items: [
      {
        company: "Celesta - IIT Patna",
        role: "Coordinator",
        duration: "March 2024 - March 2025",
        description: "Worked in the sponsorship and marketing committee. Communicated with multiple firms for sponsorships and efficiently managed financial aspects during the fest.",
        link: "https://celesta.iitp.ac.in/",
      },
      {
        company: "Syahi - Literary Club of IIT Patna",
        role: "Sub-Coordinator",
        duration: "March 2023 - March 2024",
        description: "Managed various literary events with the team.",
        link: "https://www.instagram.com/syahi.iitp/",
      },
    ],
  },
];

// --- Animation Variants (defined once) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const titleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
};


function Experience() {
  return (
    <>
      {/* Define CSS variables for theming to avoid prop drilling */}
      <style>{`
        :root { --shadow-color: rgba(0, 0, 0, 0.1); }
        html.dark { --shadow-color: rgba(0, 0, 0, 0.3); }
      `}</style>
      <motion.section
        id="Experience"
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section Header */}
        <motion.div className="relative mb-12" variants={titleVariants}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                Experience
            </h2>
            <motion.div className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full" initial={{ width: 0, x: "-50%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}/>
        </motion.div>

        {/* Render categories in a clean, declarative way */}
        <div className="flex flex-col gap-16">
            {experienceData.map((category) => (
                <ExperienceCategory key={category.title} title={category.title} items={category.items} />
            ))}
        </div>
      </motion.section>
    </>
  );
}

export default React.memo(Experience);