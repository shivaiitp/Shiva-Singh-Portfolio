import React from 'react';
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaTwitter,
    FaFacebook,
} from 'react-icons/fa';
import { RiHeartFill } from '@remixicon/react';

const Footer = () => {
    // Data remains the same
    const socialLinks = [
        { name: 'GitHub', icon: FaGithub, url: 'https://github.com/shivaiitp', color: 'hover:text-gray-400 dark:hover:text-white' },
        { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/shiva-singh-421152167/', color: 'hover:text-blue-500' },
        { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/shivu_iitp/', color: 'hover:text-pink-500' },
        { name: 'Twitter', icon: FaTwitter, url: 'https://x.com/_Shiva_iitp', color: 'hover:text-sky-400' },
        { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/shivaiitp', color: 'hover:text-blue-600' },
    ];

    const navLinks = [
        { name: 'Home', href: '#Home' },
        { name: 'About', href: '#About' },
        { name: 'Projects', href: '#Projects' },
        { name: 'Contact', href: '#Contact' },
    ];

    // Animation variants are kept for smooth entrance
    const footerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.footer
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            // --- UPDATED: Background removed, padding reduced for less height ---
            className="w-full border-t border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white py-6 px-6"
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                
                {/* --- UPDATED: Main content row with a more professional layout --- */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Name/Logo */}
                    <motion.div variants={itemVariants}>
                        <a href="#Home" className="text-lg font-bold text-gray-800 dark:text-white">
                            Shiva Singh
                        </a>
                    </motion.div>
                    
                    {/* Navigation Links (centered on mobile, middle on desktop) */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                {link.name}
                            </a>
                        ))}
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div variants={itemVariants} className="flex gap-5 text-xl">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className={`text-gray-500 dark:text-gray-400 transition-colors ${social.color}`}
                                whileHover={{ y: -3, scale: 1.15 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <social.icon />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* --- UPDATED: Divider and Copyright section for a cleaner finish --- */}
                <motion.div variants={itemVariants} className="w-full max-w-lg h-px bg-gray-300/50 dark:bg-white/10" />
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <span>© {new Date().getFullYear()} Shiva Singh. All rights reserved.</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="flex items-center gap-1.5">
                        Made with <RiHeartFill className="text-red-500" /> in India
                    </span>
                </motion.div>

            </div>
        </motion.footer>
    );
};

export default Footer;
