import React from 'react';
import { motion } from 'framer-motion';
// We'll use a clean icon from the popular 'react-icons' library
import { FiExternalLink } from 'react-icons/fi';

function ExperienceCard({ experience }) {
  // Destructure with a default empty object to prevent errors
  // NEW: Added 'link' to the destructuring
  const { company, role, duration, place, description, link } = experience || {};

  return (
    <motion.div
      // initial={{ y: 20, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      // transition={{ duration: 0.8, delay: 0.2 }}
      // transition={{ stiffness: 100, damping: 20 }}
      className="group relative w-full overflow-hidden rounded-2xl p-6
                 border transition-all duration-300
                 bg-white/50 dark:bg-gray-900
                 backdrop-blur-md
                 border-gray-200 dark:border-gray-800
                 hover:border-green-500/50 dark:hover:border-green-400/70"
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-green-500 dark:bg-green-400
                   scale-y-0 group-hover:scale-y-100
                   transform-origin-center
                   transition-transform duration-500 ease-in-out"
      />

      <div className="relative pl-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-xl font-bold text-left text-green-600 dark:text-green-400">
              {role}
            </h3>
            
            {/* --- NEW: Container for Company Name and Link Icon --- */}
            <div className="flex items-center gap-2">
              <p className="text-md text-left font-medium text-gray-800 dark:text-gray-300">
                @ {company}
              </p>
              {/* This link icon only renders if a 'link' prop exists */}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevents card animations from interfering
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

export default ExperienceCard;
