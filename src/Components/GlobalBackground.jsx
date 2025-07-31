import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Animated Background ---
const MemoizedAnimatedBackground = React.memo(() => {
    const fixedElements = useMemo(() => [
        { id: 'fixed-1', symbol: '{ }', className: "absolute top-[15%] right-[5%] text-5xl text-green-600/30 dark:text-green-400/15 hidden sm:block", duration: 20 },
        { id: 'fixed-2', symbol: '[]', className: "absolute top-[15%] left-[5%] text-5xl text-cyan-600/30 dark:text-cyan-400/15 hidden md:block", duration: 35 },
        { id: 'fixed-3', symbol: '</>', className: "absolute bottom-[35%] right-[15%] text-4xl text-blue-600/30 dark:text-blue-400/15 hidden sm:block", duration: 25 },
        { id: 'fixed-4', symbol: '( )', className: "absolute top-[55%] left-[2%] text-5xl text-purple-600/30 dark:text-purple-400/15 hidden sm:block", duration: 30 },
        { id: 'fixed-5', symbol: '&&', className: "absolute bottom-[15%] left-[12%] text-3xl text-red-600/30 dark:text-red-400/15 hidden sm:block", duration: 28 },
        { id: 'fixed-6', symbol: '!= ', className: "absolute top-[40%] right-[10%] text-4xl text-pink-600/30 dark:text-pink-400/15 hidden md:block", duration: 32 },
        { id: 'fixed-6', symbol: '## ', className: "absolute top-[40%] left-[10%] text-4xl text-pink-600/30 dark:text-pink-400/15 hidden md:block", duration: 32 },
        { id: 'fixed-7', symbol: '%%', className: "absolute bottom-[37%] left-[15%] text-4xl text-yellow-600/30 dark:text-yellow-400/15 hidden lg:block", duration: 29 },
        { id: 'fixed-9', symbol: '//', className: "absolute bottom-[5%] left-[5%] text-4xl text-cyan-600/30 dark:text-cyan-400/15 hidden sm:block", duration: 33 },
        { id: 'fixed-11', symbol: '<=', className: "absolute bottom-[10%] right-[25%] text-3xl text-indigo-600/30 dark:text-indigo-400/15 hidden sm:block", duration: 31 },
        { id: 'fixed-12', symbol: '^^', className: "absolute bottom-[4%] right-[10%] text-5xl text-teal-600/30 dark:text-teal-400/15 hidden sm:block", duration: 30 }
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-15 z-0" />
            {fixedElements.map((element) => (
                <motion.div
                    key={element.id}
                    className={`${element.className} font-mono z-10`}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: element.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {element.symbol}
                </motion.div>
            ))}
        </div>
    );
});

// --- Global Background Wrapper ---
const GlobalBackground = ({ children, variant = "default" }) => {
    const backgroundClass = useMemo(() => {
        const variants = {
            default: "bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black",
            hero: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black",
            section: "bg-white dark:bg-gray-900"
        };
        return variants[variant] || variants.default;
    }, [variant]);

    return (
        <div className={`relative w-full min-h-screen ${backgroundClass} transition-colors duration-300 overflow-hidden`}>
            <MemoizedAnimatedBackground />
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
};

export default React.memo(GlobalBackground);
