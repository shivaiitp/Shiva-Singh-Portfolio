import React from "react";
import { motion } from "framer-motion";
import SkillCategory from "./SkillCategory"; // Import the new component

// --- Centralized Data Setup ---
const getImage = (imageName) => `/skills/${imageName}`;

const skillsData = [
    {
        title: "Programming Languages",
        skills: [
            { name: "C++", logo: getImage("Cpp.svg"), level: 90 },
            { name: "JavaScript", logo: getImage("JavaScript.svg"), level: 80 },
            { name: "Python", logo: getImage("Python.svg"), level: 70 },
        ],
    },
    {
        title: "Development",
        skills: [
            { name: "HTML5", logo: getImage("HTML5.svg"), level: 95 },
            { name: "CSS3", logo: getImage("CSS3.svg"), level: 80 },
            { name: "React", logo: getImage("React.svg"), level: 80 },
            { name: "Tailwind CSS", logo: getImage("Tailwind_CSS.svg"), level: 85 },
            { name: "Node.js", logo: getImage("Node_js.svg"), level: 70 },
            { name: "Express.js", logo: getImage("Express.svg"), level: 70 },
        ],
    },
    {
        title: "Databases",
        skills: [
            { name: "MongoDB", logo: getImage("MongoDB.svg"), level: 80 },
            { name: "MySQL", logo: getImage("MySQL.svg"), level: 70 },
        ],
    },
    {
        title: "Machine Learning",
        pathColor: "#F97316", // Orange
        skills: [
            { name: "Scikit-learn", logo: getImage("Scikit_learn.svg"), level: 70 },
            { name: "Pandas", logo: getImage("Pandas.svg"), level: 75 },
            { name: "NumPy", logo: getImage("NumPy.svg"), level: 70 },
            { name: "Supervised", logo: getImage("Supervised.png"), level: 50 },
            { name: "Unsupervised", logo: getImage("Unsupervised.png"), level: 50 },
            { name: "Neural Networks", logo: getImage("Neural_Networks.png"), level: 40 },
        ],
    },
    {
        title: "Tools & Platforms",
        skills: [
            { name: "Git", logo: getImage("Git.svg"), level: 80 },
            { name: "GitHub", logo: getImage("GitHub.svg"), level: 80 },
            { name: "VS Code", logo: getImage("VScode.svg"), level: 95 },
        ],
    },
    {
        title: "Soft Skills",
        pathColor: "#facc15", // Yellow
        skills: [
            { name: "Communication", logo: getImage("Com.png"), level: 95 },
            { name: "Teamwork", logo: getImage("TeamWork.png"), level: 85 },
            { name: "Creativity", logo: getImage("Creativity.png"), level: 90 },
            { name: "Problem Solving", logo: getImage("ProSol.png"), level: 95 },
        ],
    },
];

// --- Animation Variants (defined once) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };
const titleVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } } };

function Skills() {
    return (
        <>
            {/* Define CSS variables for theming, avoiding prop drilling */}
            <style>{`
                :root {
                    --skill-text-color: #111827;
                    --skill-trail-color: #e5e7eb;
                    --skill-path-color-default: #4ade80;
                }
                html.dark {
                    --skill-text-color: #f9fafb;
                    --skill-trail-color: #374151;
                }
            `}</style>
            <motion.section
                id="Skills"
                className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Section Header */}
                <motion.div className="relative mb-12" variants={titleVariants}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                        Skills
                    </h2>
                    <motion.div className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" initial={{ width: 0, x: "-50%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
                </motion.div>

                {/* Introductory Text */}
                <motion.p variants={itemVariants} className="max-w-3xl text-gray-700 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">
                    I have a strong foundation in Data Structures, Algorithms, and Object-Oriented Programming, complemented by a versatile technical and interpersonal skill set.
                </motion.p>
                <motion.div variants={itemVariants} className="w-full max-w-lg p-3 mb-12 text-sm text-center text-cyan-800 dark:text-cyan-200 bg-cyan-100/50 dark:bg-cyan-900/30 border border-cyan-400/30 rounded-lg flex items-center justify-center gap-3 shadow-inner">
                    <span>💡</span>
                    <span><strong>Pro Tip:</strong> Hover over any skill to see my proficiency level.</span>
                </motion.div>

                {/* Skills Grid */}
                <motion.div className="w-full max-w-7xl space-y-12" variants={itemVariants}>
                    {skillsData.map((category) => (
                        <SkillCategory
                            key={category.title}
                            title={category.title}
                            skills={category.skills}
                            pathColor={category.pathColor}
                        />
                    ))}
                </motion.div>
            </motion.section>
        </>
    );
}

export default React.memo(Skills);