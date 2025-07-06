import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

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
            className="w-fit perspective-1000"
        >
            <Link
                to="Home"
                smooth={true}
                duration={500}
                className="group relative inline-block px-4 py-1.5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 transform-gpu"
            >
                {/* Main Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:shadow-green-500/40 transition-all duration-500"></div>
                
                {/* Animated Background Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                    animate={{
                        background: [
                            "linear-gradient(45deg, #10b981, #059669, #047857)",
                            "linear-gradient(90deg, #34d399, #10b981, #059669)",
                            "linear-gradient(135deg, #6ee7b7, #34d399, #10b981)",
                            "linear-gradient(45deg, #10b981, #059669, #047857)"
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                
                {/* Pulse Ring */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-green-400/0 group-hover:border-green-400/60"
                    animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10"></div>
                
                {/* Inner Highlight */}
                <div className="absolute top-1 left-1 right-1 h-1.5 bg-gradient-to-r from-white/40 to-white/20 rounded-t-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Text Content */}
                <motion.span 
                    className="relative z-10 text-white font-bold text-base sm:text-lg lg:text-xl tracking-wider drop-shadow-lg"
                    whileHover={{ 
                        textShadow: "0 0 20px rgba(255,255,255,0.8)" 
                    }}
                    transition={{ duration: 0.3 }}
                >
                    SHIVA
                </motion.span>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                            style={{
                                left: `${20 + i * 12}%`,
                                top: `${30 + (i % 2) * 40}%`,
                            }}
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [0.3, 1, 0.3],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3
                            }}
                        />
                    ))}
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/40 group-hover:border-white/70 transition-colors duration-300"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/40 group-hover:border-white/70 transition-colors duration-300"></div>
                
                {/* Reflection Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent group-hover:from-white/20 transition-all duration-500"></div>
            </Link>
        </motion.div>
    );
};

export default LogoCard;
