import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function InteractiveText({ text, className }) {
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      // Find the word element under the cursor
      const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
      if (elementAtPoint && elementAtPoint.dataset && elementAtPoint.dataset.wordIndex) {
        setHoveredWordIndex(parseInt(elementAtPoint.dataset.wordIndex));
      } else {
        setHoveredWordIndex(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredWordIndex(null);
  };

  // Split text into words and spaces
  const words = text.split(/(\s+)/);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ cursor: 'default' }}
    >
      {words.map((word, index) => {
        // Check if word is whitespace
        const isSpace = /^\s+$/.test(word);
        
        if (isSpace) {
          return <span key={index}>{word}</span>;
        }
        
        return (
          <motion.span
            key={index}
            data-word-index={index}
            className={`cursor-text relative z-10 inline-block px-1.5 py-0.5 rounded transition-colors duration-200 ${hoveredWordIndex === index ? 'font-bold bg-gray-200 dark:bg-white/20' : 'text-gray-800 dark:text-gray-300'}`}
            animate={{
              scale: hoveredWordIndex === index ? 1.05 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.2
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export default InteractiveText;
