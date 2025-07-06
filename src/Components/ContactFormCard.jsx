import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";

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
                setShowSuccess(true);
                onClose();
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
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"
                                animate={{
                                    rotate: [360, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
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

                            {/* Enhanced Header with Logo Animation */}
                            <motion.div
                                className="text-center mb-8 relative z-10"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative"
                                    animate={{
                                        boxShadow: [
                                            "0 4px 20px rgba(34, 197, 94, 0.3)",
                                            "0 4px 20px rgba(59, 130, 246, 0.3)",
                                            "0 4px 20px rgba(34, 197, 94, 0.3)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -10, 10, 0],
                                        transition: { duration: 0.6 }
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 15, -15, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <FaPaperPlane className="text-white text-xl" />
                                    </motion.div>

                                    {/* Subtle pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-white/30"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>

                                <motion.h2
                                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                                    variants={itemVariants}
                                >
                                    Let's Connect!
                                </motion.h2>
                                <motion.p
                                    className="text-gray-600 dark:text-gray-400 mt-2"
                                    variants={itemVariants}
                                >
                                    I'd love to hear from you. Send me a message!
                                </motion.p>
                            </motion.div>

                            {/* Form */}
                            <motion.form
                                onSubmit={sendEmail}
                                className="space-y-6 relative z-10"
                                variants={itemVariants}
                            >
                                {/* Name Field */}
                                <motion.div
                                    className="relative"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${errors.name
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                                            }`}
                                    />
                                    <AnimatePresence>
                                        {errors.name && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1 ml-1"
                                                initial={{ opacity: 0, x: -10, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                                exit={{ opacity: 0, x: -10, height: 0 }}
                                            >
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Email Field */}
                                <motion.div
                                    className="relative"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaEnvelope size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${errors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                                            }`}
                                    />
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1 ml-1"
                                                initial={{ opacity: 0, x: -10, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                                exit={{ opacity: 0, x: -10, height: 0 }}
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Message Field */}
                                <motion.div
                                    className="relative"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="absolute left-3 top-4 text-gray-400">
                                        <FaComment size={16} />
                                    </div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none ${errors.message
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
                                            }`}
                                    />
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1 ml-1"
                                                initial={{ opacity: 0, x: -10, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                                exit={{ opacity: 0, x: -10, height: 0 }}
                                            >
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Submit Error */}
                                <AnimatePresence>
                                    {errors.submit && (
                                        <motion.p
                                            className="text-red-500 text-sm text-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            {errors.submit}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* Enhanced Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                                    variants={itemVariants}
                                    whileHover={!isLoading ? {
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)",
                                        y: -2
                                    } : {}}
                                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                                    animate={isLoading ? {
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                    } : {}}
                                    transition={isLoading ? {
                                        backgroundPosition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                    } : {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                    style={isLoading ? {
                                        backgroundSize: "200% 100%"
                                    } : {}}
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

                                    {isLoading ? (
                                        <>
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 15, -15, 0],
                                                    x: [0, 2, -2, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <FaPaperPlane />
                                            </motion.div>
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Success Message */}
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
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.2
                                }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        filter: [
                                            "drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))",
                                            "drop-shadow(0 0 20px rgba(34, 197, 94, 0.8))",
                                            "drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <FaCheckCircle className="text-green-400 text-7xl mb-6 mx-auto" />
                                </motion.div>
                            </motion.div>

                            <motion.h2
                                className="text-3xl font-bold mb-3 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Message Sent! 🎉
                            </motion.h2>

                            <motion.p
                                className="text-xl text-gray-200 mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Thanks for reaching out!
                            </motion.p>

                            <motion.p
                                className="text-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                I'll get back to you soon.
                            </motion.p>

                            {/* Floating Particles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                                    style={{
                                        left: `${20 + i * 12}%`,
                                        top: `${20 + (i % 2) * 60}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 1, 0.3],
                                        scale: [0.5, 1.2, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactForm;
