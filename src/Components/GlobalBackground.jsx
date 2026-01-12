import React, { useMemo } from 'react';

// --- Static Background ---
const StaticBackground = React.memo(() => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-15 z-0" />
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
            <StaticBackground />
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
};

export default React.memo(GlobalBackground);
