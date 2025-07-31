import React, { useState } from "react";
import { motion } from 'framer-motion';
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "@remixicon/react";

// Import the optimized child components
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactFormCard";

// --- Constants moved outside the component to prevent re-creation on render ---
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

const titleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};


function ContactSection() {
    const [showForm, setShowForm] = useState(false);

    return (
        <motion.section
            id="Contact"
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <motion.div className="relative mb-12" variants={titleVariants}>
                    <motion.h2
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% 100%" }}
                    >
                      Get In Touch
                    </motion.h2>
                    <motion.div
                      className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <motion.div
                      className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
                      animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500/20 dark:bg-purple-400/20 rounded-full"
                      animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </motion.div>
            <motion.p variants={itemVariants} className="max-w-2xl text-gray-600 dark:text-gray-400 mb-12">
                Have a question or a project in mind? I'd love to hear from you.
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {contactDetails.map((detail) => (
                    <ContactInfoCard key={detail.type} {...detail} variants={itemVariants} />
                ))}
            </motion.div>

            {/* "Send Message" Button */}
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

            {/* Contact Form Modal (conditionally rendered) */}
            <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
        </motion.section>
    );
}
export default React.memo(ContactSection);