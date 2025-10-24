import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ContactForm from "../Contact/ContactFormCard";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp, FaGithub, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import MyImg from "../../assets/MyImg.JPG";

function Home() {
    const portfolioContent = {
        name: "Shiva Singh",
        greeting: "Hello,",
        resumeLink: "https://drive.google.com/file/d/1zYtreZeegeAV3wtFSpErIj_dj63JDwyH/view?usp=drive_link",
        typewriterSequence: [
            "I am Shiva Singh.", 2000, "I am a Programmer.", 2000, "I am a Developer.", 2000, "I am a Software Engineer.", 2000, "I build amazing things.", 2000, "I create digital experiences.", 2000,
        ],
        description: "Welcome to my portfolio! I'm thrilled to have you here. Whether you're here to learn more about my work, collaborate, or get inspired, let's connect and build something incredible together!",
        buttons: { sendMessage: "📧 Send Message", resume: "📄 Resume" },
        socialIcons: [
            { name: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2", url: "https://www.linkedin.com/in/shiva-singh-421152167/" },
            { name: "GitHub", icon: FaGithub, color: "#181717", url: "https://github.com/shivaiitp" },
            { name: "Instagram", icon: FaInstagram, color: "#E1306C", url: "https://www.instagram.com/shivu_iitp/" },
            { name: "Twitter", icon: FaTwitter, color: "#1DA1F2", url: "https://x.com/_Shiva_iitp" },
            { name: "Facebook", icon: FaFacebook, color: "#1877F2", url: "https://facebook.com/shivaiitp" },
            { name: "WhatsApp", icon: FaWhatsapp, color: "#25D366", url: "https://wa.me/+916375919829" },
            { name: "Email", icon: HiOutlineMail, color: "#FACC15", url: "mailto:shivaiitp22@gmail.com" }
        ]
    };

    const [showForm, setShowForm] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } } };
    const buttonVariants = { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }, hover: { scale: 1.1, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)", transition: { type: "spring", stiffness: 400, damping: 10 } }, tap: { scale: 0.95 } };

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
        
    return (
        <motion.div
            id="Home"
            className="text-gray-900 dark:text-white flex w-full min-h-screen flex-col lg:flex-row justify-center items-center lg:justify-between mt-6 md:mt-0 p-4 sm:p-6 md:p-10 lg:p-20 relative transition-all duration-500"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* LEFT HALF: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pt-10 px-2 sm:px-4">
                <motion.div variants={itemVariants}>
                    <motion.h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-white" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} viewport={{ once: true}} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.span className="inline-block" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}>
                            👋
                        </motion.span>
                        {" "}{portfolioContent.greeting}
                    </motion.h1>
                </motion.div>
                <motion.div variants={itemVariants} className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-2 sm:mt-4">
                    <span className="block text-green-600 dark:text-green-400">
                        <TypeAnimation sequence={portfolioContent.typewriterSequence} wrapper="span" speed={50} repeat={Infinity} deletionSpeed={30} />
                    </span>
                </motion.div>
                <motion.p variants={itemVariants} className="text-justify w-full text-xs sm:text-sm md:text-lg lg:text-xl tracking-tight mt-4 sm:mt-6 leading-relaxed text-gray-800 dark:text-gray-300">
                    {portfolioContent.description}
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-10 justify-center lg:justify-start" variants={itemVariants}>
                    <motion.button onClick={() => setShowForm(true)} className="group relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden" variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-2 justify-center">{portfolioContent.buttons.sendMessage}</span>
                    </motion.button>
                    <motion.a href={portfolioContent.resumeLink} target="_blank" rel="noopener noreferrer" className="group relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg overflow-hidden text-center" variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-2 justify-center">{portfolioContent.buttons.resume}</span>
                    </motion.a>
                </motion.div>
                <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
            </div>

            {/* RIGHT HALF: Image and Social Icons */}
            <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[300px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0">
                <motion.div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-2 border-green-500/50 dark:border-green-400/30" animate={{ scale: [1, 1.02, 1], rotate: [0, 360] }} transition={{ scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }} />
                <motion.img src={MyImg} alt="Shiva Singh" 
                className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-green-500/50 dark:border-green-400/30 relative z-10" 
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} viewport={{ once: true}} 
                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }} 
                loading='lazy'
                />

                {portfolioContent.socialIcons.map((item, i) => {
                    const radius = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 150 : 180) : 180;
                    const angle = (i / portfolioContent.socialIcons.length) * 2 * Math.PI;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    const iconSize = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 48 : window.innerWidth < 768 ? 56 : 64) : 64;

                    return (
                        <motion.div key={item.name} className="absolute" style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} onMouseEnter={() => setHoveredIcon(i)} onMouseLeave={() => setHoveredIcon(null)}>
                            <motion.a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center rounded-full text-white border-2 border-white/40 dark:border-white/20 backdrop-blur-sm relative overflow-hidden shadow-xl cursor-pointer" 
                                style={{ width: iconSize, height: iconSize, background: `linear-gradient(135deg, ${item.color}, ${item.color}DD)` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: [1, 1.05, 1], rotate: [0, 360], y: [0, -8, 0], x: [0, Math.sin(i * 2) * 3, 0] }}
                                transition={{ delay: 1.5 + i * 0.2, scale: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 30 + i * 5, repeat: Infinity, ease: "linear" }, y: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }, x: { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" } }}
                                whileHover={{ scale: 1.2, y: -10, transition: { type: "spring", stiffness: 300, damping: 10 }}} 
                                whileTap={{ scale: 0.9, transition: { duration: 0.1, delay: 0 } }} 
                                viewport={{ once: true}}
                            >
                                <AnimatePresence>
                                    {hoveredIcon === i && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-lg whitespace-nowrap"
                                            style={{ background: `linear-gradient(135deg, ${item.color}EE, ${item.color}CC)`, boxShadow: `0 6px 20px ${item.color}50` }}
                                        >
                                            {item.name}
                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-x-4 border-x-transparent border-t-4" style={{ borderTopColor: `${item.color}EE` }}></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/25 via-transparent to-transparent"></div>
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}>
                                    <item.icon size={iconSize * 0.4} className="relative z-10" />
                                </motion.div>
                                <AnimatePresence>
                                    {hoveredIcon === i && (
                                        <>
                                            {[...Array(8)].map((_, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    className="absolute w-1 h-1 rounded-full pointer-events-none" 
                                                    style={{ backgroundColor: item.color, left: `${50 + Math.cos(index * 45 * Math.PI / 180) * 35}%`, top: `${50 + Math.sin(index * 45 * Math.PI / 180) * 35}%` }}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], x: [0, Math.cos(index * 45 * Math.PI / 180) * 25], y: [0, Math.sin(index * 45 * Math.PI / 180) * 25] }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </AnimatePresence>
                            </motion.a>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default Home;
