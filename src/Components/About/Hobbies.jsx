import React from 'react';
import { motion } from 'framer-motion';

// --- Constants moved outside the component definitions ---
const hobbiesList = [
  { text: 'Coding', icon: '💻' },
  { text: 'Gaming', icon: '🎮' },
  { text: 'Music Listening', icon: '🎵' },
  { text: 'Reading', icon: '📚' },
  { text: 'Photography', icon: '📸' },
  { text: 'Poetry Writing', icon: '✍️' },
  { text: 'Traveling', icon: '✈️' },
  { text: 'Cinephile', icon: '🎬' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};


const HobbyCard = React.memo(({ icon, text, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 ,transition: { type: "spring", stiffness: 300, damping: 15 } }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg cursor-pointer text-center"
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-md md:text-lg font-semibold text-gray-800 dark:text-white">
        {text}
      </h3>
    </motion.div>
  );
});

const Hobbies = () => {
  return (
    <section>
      <div className="text-center mb-8 md:mb-10">
        <p className="mb-0 md:mb-4 text-lg text-gray-600 dark:text-gray-300">
          Things I love to do in my free time.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {hobbiesList.map((hobby, index) => (
          <HobbyCard key={hobby.text} icon={hobby.icon} text={hobby.text} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default React.memo(Hobbies);