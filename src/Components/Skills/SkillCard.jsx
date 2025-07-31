import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion, AnimatePresence, useSpring, useMotionValueEvent } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

const SkillCard = ({ skill, pathColor = "var(--skill-path-color-default)" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [displayValue, setDisplayValue] = useState(0);

    // Use a spring for smooth, natural animation instead of setInterval
    const progressSpring = useSpring(0, {
        damping: 50,
        stiffness: 300,
    });

    // Update the display value as the spring animates
    useMotionValueEvent(progressSpring, "change", (latest) => {
        setDisplayValue(Math.round(latest));
    });

    const handleMouseEnter = () => {
        setIsHovered(true);
        progressSpring.set(skill.level);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        progressSpring.set(0);
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md cursor-pointer w-32 h-32 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    <motion.div
                        key="icon"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center justify-center text-center"
                    >
                        <img src={skill.logo} alt={skill.name} className="w-14 h-14 object-contain" />
                        <p className="text-gray-900 dark:text-white text-sm font-semibold mt-2">{skill.name}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="progress"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        className="w-24 h-24"
                    >
                        <CircularProgressbar
                            value={displayValue}
                            text={`${displayValue}%`}
                            styles={buildStyles({
                                textColor: "var(--skill-text-color)",
                                pathColor: pathColor,
                                trailColor: "var(--skill-trail-color)",
                                pathTransitionDuration: 0.1, // Sync with spring for smoothness
                            })}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default React.memo(SkillCard);