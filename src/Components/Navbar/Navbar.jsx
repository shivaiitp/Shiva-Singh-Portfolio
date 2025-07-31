import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import {
    RiCloseLine,
    RiMenu2Line,
    RiHome2Line,
    RiUser3Line,
    RiLightbulbLine,
    RiBriefcaseLine,
    RiStackLine,
    RiMailLine,
    RiSunLine,
    RiMoonLine
} from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import LogoCard from "./LogoCard";
import { useTheme } from "../ThemeContext";


const menuItems = [
    { name: "Home", icon: <RiHome2Line size={18} /> },
    { name: "About", icon: <RiUser3Line size={18} /> },
    { name: "Skills", icon: <RiLightbulbLine size={18} /> },
    { name: "Experience", icon: <RiBriefcaseLine size={18} /> },
    { name: "Projects", icon: <RiStackLine size={18} /> },
    { name: "Contact", icon: <RiMailLine size={18} /> },
];


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();
    const [activeSection, setActiveSection] = useState("Home");
    const [scrolled, setScrolled] = useState(false);


    // Calculate a dynamic offset based on screen size
    const scrollOffset = window.innerWidth < 768 ? -50 : -60;


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            {/* Compact Centered Navbar */}
            <div className="fixed top-4 w-full flex justify-center z-50">
                <motion.nav
                    className={`
                        transform transition-all duration-500
                        md:w-[95%] md:max-w-6xl max-w-5xl w-[90%]
                        `}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                >
                    <div className="backdrop-blur-xl rounded-2xl border transition-all duration-500 px-6 py-3
                                    bg-white/60 dark:bg-gray-900/70
                                    border-gray-400/80 dark:border-white/10
                                    text-gray-800 dark:text-white shadow-2xl shadow-gray-500/20 dark:shadow-black/20">
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <motion.div
                                className="flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogoCard />
                            </motion.div>


                            {/* Desktop Menu - Compact Pills */}
                            <motion.div
                                className="hidden lg:flex items-center gap-2 mx-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {menuItems.map((item) => (
                                    <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            to={item.name}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            offset={scrollOffset} // <-- FIX APPLIED HERE
                                            onSetActive={() => setActiveSection(item.name)}
                                            className={`
                                                relative px-4 py-2 rounded-full text-lg font-medium cursor-pointer
                                                transition-all duration-300 group overflow-hidden
                                                ${activeSection === item.name
                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400'
                                                }
                                            `}
                                        >
                                            {item.name}
                                            {activeSection === item.name && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-green-500 rounded-full -z-10"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>


                            {/* Right Controls */}
                            <div className="flex items-center gap-3">
                                {/* Dark Mode Toggle */}
                                <motion.button
                                    onClick={toggleDarkMode}
                                    className="relative p-2.5 rounded-full transition-all duration-300 group bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {darkMode ? (
                                            <motion.div
                                                key="sun"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <RiSunLine size={18} className="text-yellow-400" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="moon"
                                                initial={{ rotate: 90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <RiMoonLine size={18} className="text-gray-600" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>


                                {/* Mobile Menu Button */}
                                <motion.button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="lg:hidden p-2.5 rounded-full transition-all duration-300 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        animate={{ rotate: menuOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {menuOpen ? (
                                            <RiCloseLine size={20} />
                                        ) : (
                                            <RiMenu2Line size={20} />
                                        )}
                                    </motion.div>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            </div>


            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMenuOpen(false)}
                        />


                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="fixed top-20 left-4 right-4 mx-auto w-auto max-w-sm z-50 lg:hidden backdrop-blur-xl rounded-2xl border p-6 bg-white/95 dark:bg-black/90 border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-500/20 dark:shadow-black/20"
                        >
                            <div className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.name}
                                            smooth={true}
                                            duration={500}
                                            offset={scrollOffset} // <-- FIX APPLIED HERE
                                            className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 text-gray-800 dark:text-white"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <motion.div
                                                className="text-green-600 dark:text-green-400"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};


export default React.memo(Navbar);
