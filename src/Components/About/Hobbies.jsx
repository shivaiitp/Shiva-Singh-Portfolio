import React from 'react';
import { motion } from 'framer-motion';

const hobbiesList = [
  { text: 'Coding', icon: '💻' },
  { text: 'Gaming', icon: '🎮' },
  { text: 'Music Listening', icon: '🎵' },
  { text: 'Reading', icon: '📚' },
  { text: 'Photography', icon: '📸' },
  { text: 'Poetry Writing', icon: '✍️' },
  { text: 'Traveling', icon: '✈️' },
  { text: 'Movies', icon: '🎬' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const HobbyCard = React.memo(({ icon, text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } }}
      whileTap={{ scale: 0.95 }}
      // Reduced padding (p-3), rounded corners (rounded-xl), and shadow size
      className="flex flex-col items-center justify-center p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm cursor-pointer text-center"
    >
      {/* Reduced icon size (text-3xl) and margin (mb-2) */}
      <span className="text-3xl mb-2">{icon}</span>
      {/* Reduced text size (text-xs/sm) */}
      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
        {text}
      </h3>
    </motion.div>
  );
});

const Hobbies = () => {
  return (
    <section className="py-2">
      {/* Reduced bottom margin */}
      <div className="text-center mb-4 md:mb-6">
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Things I love to do in my free time.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        // Reduced max-width (max-w-4xl) and grid gaps (gap-3)
        className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-4"
      >
        {hobbiesList.map((hobby, index) => (
          <HobbyCard key={hobby.text} icon={hobby.icon} text={hobby.text} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default React.memo(Hobbies);