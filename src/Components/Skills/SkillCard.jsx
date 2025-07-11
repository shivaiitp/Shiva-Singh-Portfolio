import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

// This component is now self-contained and manages its own state.
const SkillCard = ({ skill, isDarkMode, pathColor = "#4ade80" }) => {
    // State for hover and progress is now local to each card.
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);

    // The animation logic is now inside the card.
    useEffect(() => {
        if (isHovered) {
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 2;
                if (currentProgress >= skill.level) {
                    clearInterval(interval);
                    currentProgress = skill.level;
                }
                setProgress(currentProgress);
            }, 10);
            return () => clearInterval(interval);
        } else {
            // Smoothly reset progress when not hovered.
            const timeout = setTimeout(() => {
                setProgress(0);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [isHovered, skill.level]);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer w-32 h-32 overflow-hidden"
        >
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
                <p className="text-gray-900 dark:text-white text-sm font-medium mt-2 text-center">{skill.name}</p>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                <div className="w-20 h-20">
                    <CircularProgressbar
                        value={progress}
                        text={`${progress}%`}
                        styles={buildStyles({
                            textColor: isDarkMode ? "#ffffff" : "black",
                            pathColor: pathColor,
                            trailColor: isDarkMode ? "#374151" : "#e5e7eb",
                            pathTransitionDuration: 0.15,
                        })}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;
