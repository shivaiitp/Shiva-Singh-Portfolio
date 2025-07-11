import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiMailLine,
    RiPhoneLine,
    RiMapPinLine,
    RiFileCopyLine,
    RiCheckLine,
} from "@remixicon/react";
import ContactForm from "./ContactFormCard"; // Ensure this path is correct

// --- Contact Data (Structured for easy mapping) ---
const contactDetails = [
    {
        icon: <RiPhoneLine className="w-7 h-7" />,
        title: "Phone",
        value: "+91 6375919829",
        href: "tel:+916375919829",
        type: "phone",
    },
    {
        icon: <RiMailLine className="w-7 h-7" />,
        title: "Email",
        value: "shivaiitp22@gmail.com",
        href: "mailto:shivaiitp22@gmail.com",
        type: "email",
    },
    {
        icon: <RiMapPinLine className="w-7 h-7" />,
        title: "Address",
        value: "IIT Patna, Bihta, Bihar",
        fullAddress: "D-118, APJ Kalam Hostel, IIT Patna, Bihta, Patna, Bihar, 801106",
        type: "address",
    },
];

// --- Reusable Contact Info Card Component (Integrated and Corrected) ---
const ContactInfoCard = ({ icon, title, value, href, fullAddress, variants }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopy = (e) => {
        // Prevents the parent link (the card) from being triggered
        e.stopPropagation();
        e.preventDefault();
        const textToCopy = fullAddress || value;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
    };

    const isAddress = !!fullAddress;
    const mapHref = isAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
        : href;

    // The component wrapper is a link (`motion.a`) for the address, and a div for others.
    const Wrapper = isAddress ? motion.a : motion.div;

    return (
        <Wrapper
            href={isAddress ? mapHref : undefined}
            target={isAddress ? "_blank" : undefined}
            rel={isAddress ? "noopener noreferrer" : undefined}
            variants={variants}
            className="block h-full" // Ensure the link fills the grid cell
        >
            <motion.div
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="relative flex h-full w-full flex-col items-center justify-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg text-gray-800 dark:text-white cursor-pointer"
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleCopy}
                        aria-label={`Copy ${title} to clipboard`}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {copied ? (
                                <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                    <RiCheckLine className="w-5 h-5 text-green-500" />
                                </motion.div>
                            ) : (
                                <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                    <RiFileCopyLine className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
                
                <div className="text-blue-500 dark:text-blue-400 mb-4">{icon}</div>
                
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                
                {isAddress ? (
                    <p className="text-sm text-center text-gray-600 dark:text-gray-300 break-words">
                        {value}
                    </p>
                ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors break-words">
                        {value}
                    </a>
                )}
            </motion.div>
        </Wrapper>
    );
};

// --- Main Contact Section Component ---
export default function ContactSection() {
    const [showForm, setShowForm] = useState(false);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
    const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

    return (
        <motion.section
            id="Contact"
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-3xl" />
            </div>

            <motion.div variants={itemVariants} className="relative mb-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Get In Touch
                </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="max-w-2xl text-gray-600 dark:text-gray-400 mb-12">
                Have a question or a project in mind? I'd love to hear from you.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {contactDetails.map((detail) => (
                    <ContactInfoCard key={detail.type} {...detail} variants={itemVariants} />
                ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16">
                <motion.button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/30"
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    Or Send a Direct Message
                </motion.button>
            </motion.div>

            <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
        </motion.section>
    );
}
