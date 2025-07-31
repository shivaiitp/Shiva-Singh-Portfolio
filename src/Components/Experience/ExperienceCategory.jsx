import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

// This component renders a single category (e.g., "Internships")
function ExperienceCategory({ title, items }) {
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div className="w-full max-w-7xl" variants={itemVariants}>
      <motion.h3
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 relative"
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative z-10">{title}</span>
        <motion.div
          className="my-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.h3>
      <div className="w-full flex flex-col gap-8 items-center">
        {items.map((item, index) => (
          <ExperienceCard key={index} experience={item} />
        ))}
      </div>
    </motion.div>
  );
}

export default React.memo(ExperienceCategory);