import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';


const wordTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  duration: 0.2,
};

function InteractiveText({ text, className }) {
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
      if (elementAtPoint?.dataset?.wordIndex) {
        setHoveredWordIndex(parseInt(elementAtPoint.dataset.wordIndex, 10));
      } else {
        setHoveredWordIndex(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredWordIndex(null);
  };

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ cursor: 'default' }}
    >
      {words.map((word, index) => {
        const isSpace = /^\s+$/.test(word);
        
        if (isSpace) {
          return <span key={index}>{word}</span>;
        }
        
        return (
          <motion.span
            key={index}
            data-word-index={index}
            className={`cursor-text relative z-10 inline-block px-1.5 py-0.5 rounded transition-colors duration-200 ${hoveredWordIndex === index ? 'font-bold bg-gray-200 dark:bg-white/20' : 'text-gray-800 dark:text-gray-300'}`}
            animate={{ scale: hoveredWordIndex === index ? 1.05 : 1 }}
            transition={wordTransition}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export default React.memo(InteractiveText);