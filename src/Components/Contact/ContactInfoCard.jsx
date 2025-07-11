import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiFileCopyLine, RiCheckLine } from "@remixicon/react";

const ContactInfoCard = ({ icon, title, value, href, fullAddress, variants }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => {
            setCopied(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopy = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const textToCopy = fullAddress || value;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
    };

    const isAddress = !!fullAddress;
    const finalHref = isAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
        : href;

    const WrapperComponent = isAddress ? motion.a : motion.div;

    return (
        <WrapperComponent
            variants={variants}
            href={isAddress ? finalHref : undefined}
            target={isAddress ? "_blank" : undefined}
            rel={isAddress ? "noopener noreferrer" : undefined}
            className="block h-full"
        >
            <motion.div
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                // --- UPDATED: Added the 'group' class ---
                className="group relative flex h-full w-full flex-col items-center justify-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg text-gray-800 dark:text-white cursor-pointer"
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
                    <p className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors break-words">
                        {value}
                    </p>
                ) : (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors break-words"
                    >
                        {value}
                    </a>
                )}
            </motion.div>
        </WrapperComponent>
    );
};

export default ContactInfoCard;
