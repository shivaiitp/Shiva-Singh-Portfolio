import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaBook, FaCodeBranch, FaPercent, FaCalendarAlt } from "react-icons/fa";

// --- Animation Variants moved outside the component ---
const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
    },
};

const EducationCard = ({
    title = "Title",
    College = "Not Available",
    Course = "Not Available",
    Branch = "Not Available",
    Marks = "Not Available",
    Year = "Not Available",
}) => {
    // This array is now created inside the component because it depends on props.
    // This is fine and efficient.
    const details = [
        { icon: FaUniversity, text: College, color: "text-blue-500 dark:text-blue-400" },
        { icon: FaBook, text: Course, color: "text-green-500 dark:text-green-400" },
        { icon: FaCodeBranch, text: Branch, color: "text-purple-500 dark:text-purple-400" },
        { icon: FaPercent, text: Marks, color: "text-cyan-500 dark:text-cyan-400" },
        { icon: FaCalendarAlt, text: Year, color: "text-pink-500 dark:text-pink-400" },
    ];

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md w-full text-gray-800 dark:text-white overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500" />
            <motion.h3 className="text-2xl mt-0 md:text-3xl font-bold text-center mb-2 relative z-10" variants={itemVariants}>
                {title}
                <motion.div
                    className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
            </motion.h3>
            <motion.ul className="text-left mt-6 text-sm md:text-base relative z-10 cursor-pointer">
                {details.map((item, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-3 mt-2 md:mt-4 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-500 group/item"
                    >
                        <div className={`${item.color} p-2 rounded-lg bg-gray-100/50 dark:bg-gray-700/50`}>
                            <motion.div>
                                <item.icon size={18} />
                            </motion.div>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium flex-1">
                            {item.text}
                        </span>
                    </motion.li>
                ))}
            </motion.ul>
            
        </motion.div>
    );
};

export default React.memo(EducationCard);