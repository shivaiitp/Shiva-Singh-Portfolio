import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

function ExperienceCard({ experience }) {
  const { company, role, duration, place, description, link } = experience || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileInView={{ opacity: 1}}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
      className="group relative w-full max-w-full overflow-hidden rounded-2xl p-6
                 border transition-all duration-300
                 bg-white/60 dark:bg-gray-800/60
                 backdrop-blur-md
                 border-gray-400/50 dark:border-gray-700
                 hover:border-green-500/50 dark:hover:border-green-400/70"
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-green-500 dark:bg-green-400
                   scale-y-0 group-hover:scale-y-100
                   transform-origin-center transition-transform duration-500 ease-in-out"
      />

      <div className="relative pl-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-xl font-bold text-left text-green-600 dark:text-green-400">
              {role}
            </h3>
            
            <div className="flex items-center gap-2">
              <p className="text-md text-left font-medium text-gray-800 dark:text-gray-300">
                @ {company}
              </p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label={`Visit ${company} website`}
                >
                  <FiExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors" />
                </a>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <p>{duration}</p>
            {place && <p>{place}</p>}
          </div>
        </div>

        <p className="text-justify text-gray-600 dark:text-gray-400 text-base leading-relaxed mt-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(ExperienceCard);