import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard';

const SkillCategory = ({ title, skills, pathColor }) => {
    return (
        <motion.div
            // The 'y' property has been removed to create a fade-in effect.
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            // The transition is updated for a smooth fade.
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.6 }}
            className="relative border border-gray-300 dark:border-gray-700 rounded-xl p-8 pt-10"
        >
            <span className="absolute -top-4 left-6 bg-white dark:bg-gray-900 px-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                {title}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12 justify-center">
                {skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} pathColor={pathColor} />
                ))}
            </div>
        </motion.div>
    );
};

export default React.memo(SkillCategory);