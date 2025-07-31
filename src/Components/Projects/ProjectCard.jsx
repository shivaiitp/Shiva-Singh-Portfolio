import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// --- ENHANCEMENT: New 3D variant for a unique entrance animation ---
const cardVariants = {
  hidden: { opacity: 0, rotateY: -100, x: -50 },
  visible: { 
    opacity: 1, 
    rotateY: 0, 
    x: 0,
    transition: { type: 'smooth', stiffness: 40, damping: 15, duration: 1.0 } 
  },
};

function ProjectCard({ title, description, image, tech, sourceCode, link }) {
  return (
    <motion.div
      variants={cardVariants}
      // The parent section's stagger applies to the 'visible' state
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl
                 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg
                 border border-gray-200/50 dark:border-white/10 shadow-lg"
      style={{ transformStyle: "preserve-3d" }} // Enable 3D transforms
    >
      {/* ========== IMAGE SECTION ========== */}
      <div className="relative h-52 w-full overflow-hidden cursor-pointer">
        {/* --- OPTIMIZATION: Using group-hover for cleaner, state-less animation --- */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 ease-in-out
                     group-hover:scale-110 group-hover:blur-sm"
        />
        <div
          className="absolute inset-0 flex items-center justify-center p-4
                     bg-black/70 opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 ease-in-out"
        >
          <p className="text-center text-sm text-gray-200 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* ========== CONTENT SECTION ========== */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xl font-bold text-left text-gray-900 dark:text-white">
          {title}
        </h3>

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

        <div className="mt-auto pt-4 flex justify-end items-center gap-4">
          {sourceCode && (
            <motion.a
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Source Code"
              whileHover={{ scale: 1.15, color: '#22d3ee' }}
              className="text-gray-500 dark:text-gray-400"
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
              whileHover={{ scale: 1.15, color: '#22d3ee' }}
              className="text-gray-500 dark:text-gray-400"
            >
              <FiExternalLink size={22} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(ProjectCard);