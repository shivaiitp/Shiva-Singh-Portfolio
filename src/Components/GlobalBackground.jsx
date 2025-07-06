import React from 'react';
import { motion } from 'framer-motion';

const GlobalBackground = ({ children, variant = "default" }) => {
  const backgroundVariants = {
    default: "bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black",
    hero: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black",
    section: "bg-white dark:bg-gray-900"
  };

  return (
    <div className={`relative w-full min-h-screen ${backgroundVariants[variant]} transition-all duration-500 overflow-hidden`}>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Static Grid Pattern - Fixed opacity for better visibility */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 dark:opacity-40" />

        {/* Enhanced Floating Code Symbols with More Variety */}
        {[
          { symbol: '{ }', color: 'text-green-500/40 dark:text-green-400/25' },
          { symbol: '</>', color: 'text-blue-500/40 dark:text-blue-400/25' },
          { symbol: '( )', color: 'text-purple-500/40 dark:text-purple-400/25' },
          { symbol: '[ ]', color: 'text-cyan-500/40 dark:text-cyan-400/25' },
          { symbol: '< >', color: 'text-pink-500/40 dark:text-pink-400/25' },
          { symbol: '/* */', color: 'text-yellow-500/40 dark:text-yellow-400/25' },
          { symbol: '=>', color: 'text-indigo-500/40 dark:text-indigo-400/25' },
          { symbol: '&&', color: 'text-red-500/40 dark:text-red-400/25' }
        ].map((item, i) => (
          <motion.div
            key={`code-${i}`}
            className={`absolute ${item.color} font-mono text-2xl md:text-4xl lg:text-5xl font-bold`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.7, 0.2],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.4, 1],
              x: [0, (Math.random() - 0.5) * 20]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlobalBackground;
