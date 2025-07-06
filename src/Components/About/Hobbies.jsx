import React from 'react';
import { motion } from 'framer-motion';

// The list of hobbies remains the same
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

/**
 * A single card for displaying a hobby.
 * It now includes a continuous floating animation.
 */
const HobbyCard = ({ icon, text, index }) => { // Accept index to vary animations
  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    // The 'visible' state now includes the infinite animation
    visible: { 
      opacity: 1, 
      y: [0, -8, 0], // Keyframes for the up-and-down float
      transition: { 
        // Initial spring-in transition
        type: 'spring', 
        stiffness: 100,
        // Specific transition for the 'y' property to make it loop
        y: {
          duration: 2.5 + (index % 4) * 0.4, // Each card floats at a slightly different speed
          repeat: Infinity,
          repeatType: 'mirror', // Makes the animation smooth (up -> down -> up)
          ease: 'easeInOut',
          delay: 0.5 + index * 0.1 // Stagger the start of the floating animation
        }
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      // The hover effect will override the floating 'y' animation temporarily
      whileHover={{ scale: 1.05, y: -10, transition: { type: "spring", stiffness: 300, damping: 15 } }}
      whileTap={{ scale: 0.95 }}
      className="
        flex flex-col items-center justify-center 
        p-6 bg-white/50 dark:bg-gray-800/50 
        backdrop-blur-sm border border-gray-200 dark:border-gray-700 
        rounded-2xl shadow-lg cursor-pointer
        text-center"
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className=" text-md md:text-lg font-semibold text-gray-800 dark:text-white">
        {text}
      </h3>
    </motion.div>
  );
};

/**
 * The main Hobbies section component.
 */
const Hobbies = () => {
  // Container variant to orchestrate the staggering animation of children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-2 px-4">
      
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
            Things I love to do in my free time.
          </p>
        </div>
        {/* Responsive Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {hobbiesList.map((hobby, index) => ( // Pass the index to each card
            <HobbyCard key={hobby.text} icon={hobby.icon} text={hobby.text} index={index} />
          ))}
        </motion.div>
    
    </section>
  );
};

export default Hobbies;
