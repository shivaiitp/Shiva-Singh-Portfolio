import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

function ProjectCard({ title, description, image, tech, sourceCode, link }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipVariants = {
    flipped: { rotateY: 180 },
    unflipped: { rotateY: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      // --- UPDATED: Reduced height for a more compact card ---
      className="relative h-[400px] w-full cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-d' }}
        variants={flipVariants}
        animate={isFlipped ? 'flipped' : 'unflipped'}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* =================================== */}
        {/* ========== FRONT OF CARD ========== */}
        {/* =================================== */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute flex h-full w-full flex-col overflow-hidden rounded-2xl
                     bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl
                     border border-gray-200 dark:border-white/10 shadow-lg"
        >
          <div
            className="pointer-events-none absolute -inset-px"
            style={{
              background: `radial-gradient(600px circle at 50% 150%, rgba(0, 255, 255, 0.15), transparent 40%)`,
            }}
          />
          {/* Image container remains the same size */}
          {image && (
            <div className="w-full h-60 overflow-hidden">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
          )}
          {/* --- UPDATED: Reduced padding from p-6 to p-4 --- */}
          <div className="flex flex-col flex-grow p-4">
            <h3 className="text-xl font-bold text-left text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tech.slice(0, 4).map((techItem, index) => (
                <span key={index} className="inline-block bg-cyan-100/80 dark:bg-cyan-400/10 text-cyan-800 dark:text-cyan-300 text-xs font-semibold px-2 py-1 rounded-full">
                  {techItem}
                </span>
              ))}
            </div>
          </div>
          {/* --- UPDATED: Reduced padding from p-6 to p-4 --- */}
          <div className="mt-auto p-4 pt-0 flex justify-end items-center gap-4">
            {sourceCode && (
              <a href={sourceCode} target="_blank" rel="noopener noreferrer" aria-label="Source Code" className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <FiGithub size={22} />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <FiExternalLink size={22} />
              </a>
            )}
          </div>
        </div>

        {/* =================================== */}
        {/* ========== BACK OF CARD =========== */}
        {/* =================================== */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl
                     bg-white dark:bg-gray-900
                     border border-gray-200 dark:border-cyan-400/30
                     p-4" // --- UPDATED: Reduced padding to p-4 ---
        >
          <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-4">About This Project</h4>
          <div className="text-center text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {description}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
    