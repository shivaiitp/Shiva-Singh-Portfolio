import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";

// --- Animation Variants moved outside the component for performance ---
const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 30,
        transition: {
            duration: 0.2
        }
    }
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};

const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: {
            duration: 0.3
        }
    }
};

const ContactForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Replace with your actual EmailJS credentials
        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setIsLoading(false);
                setFormData({ name: "", email: "", message: "" });
                onClose(); // Close form modal
                setShowSuccess(true); // Show success message
                setTimeout(() => {
                    setShowSuccess(false);
                }, 4000);
            })
            .catch((error) => {
                console.error("Email send error:", error);
                setErrors({ submit: "Failed to send email. Please try again later." });
                setIsLoading(false);
            });
    };

    return (
        <>
            {/* Contact Form Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-gray-900 dark:text-white w-full max-w-md relative overflow-hidden"
                            variants={modalVariants}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Background */}
                            <motion.div
                                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full -translate-y-16 translate-x-16"
                                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"
                                animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Close Button */}
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-all duration-200"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FaTimes size={16} />
                            </motion.button>

                            {/* Header */}
                            <motion.div className="text-center mb-8 relative z-10" variants={itemVariants}>
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0], transition: { duration: 0.6 } }}
                                >
                                    <FaPaperPlane className="text-white text-xl" />
                                </motion.div>
                                <motion.h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" variants={itemVariants}>
                                    Let's Connect!
                                </motion.h2>
                                <motion.p className="text-gray-600 dark:text-gray-400 mt-2" variants={itemVariants}>
                                    I'd love to hear from you. Send me a message!
                                </motion.p>
                            </motion.div>

                            {/* Form */}
                            <motion.form onSubmit={sendEmail} className="space-y-6 relative z-10" variants={itemVariants}>
                                {/* Name Field */}
                                <motion.div className="relative" variants={itemVariants}>
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/50'}`}
                                    />
                                    <AnimatePresence>
                                        {errors.name && (<motion.p className="text-red-500 text-sm mt-1 ml-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{errors.name}</motion.p>)}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Email Field */}
                                <motion.div className="relative" variants={itemVariants}>
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaEnvelope size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/50'}`}
                                    />
                                    <AnimatePresence>
                                        {errors.email && (<motion.p className="text-red-500 text-sm mt-1 ml-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{errors.email}</motion.p>)}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Message Field */}
                                <motion.div className="relative" variants={itemVariants}>
                                    <div className="absolute left-3 top-4 text-gray-400">
                                        <FaComment size={16} />
                                    </div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 resize-none ${errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/50'}`}
                                    />
                                    <AnimatePresence>
                                        {errors.message && (<motion.p className="text-red-500 text-sm mt-1 ml-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{errors.message}</motion.p>)}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3 disabled:opacity-70" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    {isLoading ? (
                                        <>
                                            <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm z-50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                            variants={successVariants}
                        >
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                                <FaCheckCircle className="text-green-400 text-7xl mb-6 mx-auto" />
                            </motion.div>
                            <motion.h2 className="text-3xl font-bold mb-3 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}>
                                Message Sent! 🎉
                            </motion.h2>
                            <motion.p className="text-gray-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}>
                                Thanks for reaching out! I'll get back to you soon.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default React.memo(ContactForm);