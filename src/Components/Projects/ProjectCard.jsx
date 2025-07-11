import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// Define animation variants for a cleaner component structure
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
};

function ProjectCard({ title, description, image, tech, sourceCode, link }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl
                 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg
                 border border-gray-200/50 dark:border-white/10 shadow-lg"
    >
      {/* =================================== */}
      {/* ========== IMAGE SECTION ========== */}
      {/* =================================== */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-52 w-full overflow-hidden cursor-pointer"
      >
        {/* The Project Image with Zoom & Blur Effect */}
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          animate={{
            scale: isHovered ? 1.15 : 1,
            filter: isHovered ? 'blur(4px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {/* The Description Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 flex items-center justify-center bg-black/70 p-4"
            >
              <p className="text-center text-sm text-gray-200 leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =================================== */}
      {/* ========== CONTENT SECTION ========== */}
      {/* =================================== */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-left text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Tech Stack */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((techItem) => (
            <span
              key={techItem}
              className="inline-block bg-cyan-100/80 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Links (Pushed to the bottom) */}
        <div className="mt-auto pt-4 flex justify-end items-center gap-4">
          {sourceCode && (
            <motion.a
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Source Code"
              whileHover={{ scale: 1.1, color: '#22d3ee' }} // cyan-400
              className="text-gray-500 dark:text-gray-400 transition-colors"
            >
              <FiGithub size={22} />
            </motion.a>
          )}
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              whileHover={{ scale: 1.1, color: '#22d3ee' }} // cyan-400
              className="text-gray-500 dark:text-gray-400 transition-colors"
            >
              <FiExternalLink size={22} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
