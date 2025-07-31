import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // This function runs only once on initial render, which is already efficient.
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ||
                (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        // Default to dark mode in non-browser environments (e.g., SSR)
        return true;
    });

    useEffect(() => {
        // This side effect correctly runs only when `darkMode` changes.
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    // The toggle function is wrapped in useCallback to prevent unnecessary re-renders.
    const toggleDarkMode = useCallback(() => {
        setDarkMode(prevMode => !prevMode);
    }, []);

    const value = useMemo(() => ({
        darkMode,
        toggleDarkMode,
    }), [darkMode, toggleDarkMode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};