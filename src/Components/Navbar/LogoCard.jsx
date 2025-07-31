import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

// By wrapping the component in React.memo, we ensure it only renders once
// because it does not depend on any props that would cause it to update.
const LogoCard = () => {
    return (
        <motion.div
            whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
            }}
            className="w-fit"
            style={{ perspective: '1000px' }} // Added for proper 3D rotation
        >
            <Link
                to="Home"
                smooth={true}
                duration={500}
                className="group relative inline-block px-4 py-1.5 rounded-2xl cursor-pointer overflow-hidden"
            >
                {/* Main Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:shadow-green-500/40 transition-shadow duration-500"></div>
                
                {/* Animated Background Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Text Content */}
                <span className="relative z-10 text-white font-bold text-base sm:text-lg lg:text-xl tracking-wider drop-shadow-lg">
                    SHIVA
                </span>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                            style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 2) * 40}%` }}
                            animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
                            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        />
                    ))}
                </div>
            </Link>
        </motion.div>
    );
};

export default React.memo(LogoCard);