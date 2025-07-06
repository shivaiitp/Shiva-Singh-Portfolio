import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ContactForm from "../ContactFormCard";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import MyImg from "../../assets/MyImg.JPG";

function Home() {
    // Your existing portfolioContent and state...
    const portfolioContent = {
        // ... (keep all your existing content)
        name: "Shiva Singh",
        greeting: "Hello,",
        resumeLink: "https://drive.google.com/file/d/1zYtreZeegeAV3wtFSpErIj_dj63JDwyH/view?usp=drive_link",
        typewriterSequence: [
            "I am Shiva Singh.",
            2000,
            "I am a Programmer.",
            2000,
            "I am a Developer.",
            2000,
            "I am a Software Engineer.",
            2000,
            "I build amazing things.",
            2000,
            "I create digital experiences.",
            2000,
        ],
        description: "Welcome to my portfolio! I'm thrilled to have you here. Whether you're here to learn more about my work, collaborate, or get inspired, let's connect and build something incredible together!",
        buttons: {
            sendMessage: "📧 Send Message",
            resume: "📄 Resume"
        },
        socialIcons: [
            { 
                name: "LinkedIn", 
                icon: FaLinkedinIn, 
                color: "#0A66C2", 
                url: "https://linkedin.com/in/yourusername" 
            },
            { 
                name: "Instagram", 
                icon: FaInstagram, 
                color: "#E1306C", 
                url: "https://instagram.com/yourusername" 
            },
            { 
                name: "Twitter", 
                icon: FaTwitter, 
                color: "#1DA1F2", 
                url: "https://twitter.com/yourusername" 
            },
            { 
                name: "WhatsApp", 
                icon: FaWhatsapp, 
                color: "#25D366", 
                url: "https://wa.me/yourphonenumber" 
            },
            { 
                name: "Email", 
                icon: HiOutlineMail, 
                color: "#FACC15", 
                url: "mailto:youremail@example.com" 
            }
        ]
    };

    const [showForm, setShowForm] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState(null);

    // Your existing animation variants...
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const buttonVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            id="Home"
            // 🔥 REMOVED THE BACKGROUND - This was covering GlobalBackground
            className="text-gray-900 dark:text-white flex w-full min-h-screen flex-col lg:flex-row justify-center items-center lg:justify-between p-4 sm:p-6 md:p-10 lg:p-20 relative transition-all duration-500"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* All your existing content stays the same */}
            {/* LEFT HALF: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pt-10 px-2 sm:px-4">
                {/* ... rest of your existing content ... */}
                
                {/* Animated Greeting */}
                <motion.div variants={itemVariants}>
                    <motion.h1 
                        className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-white"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="inline-block"
                            animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut"
                            }}
                        >
                            👋
                        </motion.span>
                        {" "}{portfolioContent.greeting}
                    </motion.h1>
                </motion.div>

                {/* Typewriter Effect */}
                <motion.div 
                    variants={itemVariants}
                    className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-2 sm:mt-4"
                >
                    <span className="block text-green-600 dark:text-green-400">
                        <TypeAnimation
                            sequence={portfolioContent.typewriterSequence}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            deletionSpeed={30}
                        />
                    </span>
                </motion.div>

                {/* Description */}
                <motion.p 
                    variants={itemVariants}
                    className="text-justify w-full text-xs sm:text-sm md:text-lg lg:text-xl tracking-tight mt-4 sm:mt-6 leading-relaxed text-gray-800 dark:text-gray-300"
                >
                    {portfolioContent.description}
                </motion.p>

                {/* Responsive Buttons */}
                <motion.div 
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-10 justify-center lg:justify-start"
                    variants={itemVariants}
                >
                    <motion.button
                        onClick={() => setShowForm(true)}
                        className="group relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                            {portfolioContent.buttons.sendMessage}
                        </span>
                    </motion.button>

                    <motion.a
                        href={portfolioContent.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg overflow-hidden text-center"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                            {portfolioContent.buttons.resume}
                        </span>
                    </motion.a>
                </motion.div>

                <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
            </div>

            {/* RIGHT HALF: Keep all your existing image and social icons code exactly the same */}
            <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[300px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0">
                {/* ... all your existing image and social icons code ... */}
                
                {/* Enhanced Ring for Light Mode */}
                <motion.div
                    className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-2 border-green-500/50 dark:border-green-400/30"
                    animate={{
                        scale: [1, 1.02, 1],
                        rotate: [0, 360]
                    }}
                    transition={{
                        scale: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        rotate: {
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                />

                {/* Enhanced Image for Light Mode */}
                <motion.img
                    src={MyImg}
                    alt="Shiva Singh"
                    className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-green-500/50 dark:border-green-400/30 relative z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1
                    }}
                    transition={{ 
                        delay: 1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                    }}
                />

                {/* Keep all your existing social icons code */}
                {portfolioContent.socialIcons.map((item, i) => {
                    const radius = typeof window !== 'undefined' ? 
                        (window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 150 : 180) : 180;
                    const angle = (i / portfolioContent.socialIcons.length) * 2 * Math.PI;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    const iconSize = typeof window !== 'undefined' ? 
                        (window.innerWidth < 640 ? 48 : window.innerWidth < 768 ? 56 : 64) : 64;

                    return (
                        <motion.div
                            key={item.name}
                            className="absolute"
                            style={{ 
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                            }}
                            onMouseEnter={() => setHoveredIcon(i)}
                            onMouseLeave={() => setHoveredIcon(null)}
                        >
                            <motion.a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full text-white border-2 border-white/40 dark:border-white/20 backdrop-blur-sm relative overflow-hidden shadow-xl cursor-pointer"
                                style={{
                                    width: iconSize,
                                    height: iconSize,
                                    background: `linear-gradient(135deg, ${item.color}, ${item.color}DD)`,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 360],
                                    y: [0, -8, 0],
                                    x: [0, Math.sin(i * 2) * 3, 0]
                                }}
                                transition={{
                                    delay: 1.5 + i * 0.2,
                                    scale: {
                                        duration: 3 + i * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    rotate: {
                                        duration: 30 + i * 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    y: {
                                        duration: 2.5 + i * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    x: {
                                        duration: 4 + i * 0.4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                whileHover={{ 
                                    scale: 1.2,
                                    y: -12,
                                    rotate: 0,
                                    transition: { 
                                        duration: 0.3, 
                                        delay: 0, 
                                        ease: "easeOut" 
                                    }
                                }}
                                whileTap={{ 
                                    scale: 0.9,
                                    transition: { 
                                        duration: 0.1, 
                                        delay: 0 
                                    }
                                }}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/25 via-transparent to-transparent"></div>
                                
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <item.icon size={iconSize * 0.4} className="relative z-10" />
                                </motion.div>

                                {/* Keep your sparkle effects */}
                                <AnimatePresence>
                                    {hoveredIcon === i && (
                                        <>
                                            {[...Array(8)].map((_, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                                                    style={{ 
                                                        backgroundColor: item.color,
                                                        left: `${50 + Math.cos(index * 45 * Math.PI / 180) * 35}%`,
                                                        top: `${50 + Math.sin(index * 45 * Math.PI / 180) * 35}%`
                                                    }}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{
                                                        scale: [0, 1.5, 0],
                                                        opacity: [0, 1, 0],
                                                        x: [0, Math.cos(index * 45 * Math.PI / 180) * 25],
                                                        y: [0, Math.sin(index * 45 * Math.PI / 180) * 25]
                                                    }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: index * 0.05,
                                                        ease: "easeOut"
                                                    }}
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

            {/* Keep all your floating code elements */}
            <div className="absolute top-[15%] right-[5%] text-3xl md:text-5xl font-mono text-green-600/30 dark:text-green-400/15 hidden sm:block">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    whileHover={{
                        scale: 1.5,
                        color: "#059669",
                        transition: { duration: 0.3 }
                    }}
                >
                    {'{ }'}
                </motion.div>
            </div>
            
            <div className="absolute bottom-[35%] right-[15%] text-2xl md:text-3xl font-mono text-blue-600/30 dark:text-blue-400/15 hidden sm:block">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    whileHover={{
                        scale: 1.4,
                        color: "#2563eb",
                        transition: { duration: 0.3 }
                    }}
                >
                    {'</>'}
                </motion.div>
            </div>
            
            <div className="absolute top-[55%] left-[2%] text-xl md:text-2xl font-mono text-purple-600/30 dark:text-purple-400/15 hidden sm:block">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    whileHover={{
                        scale: 1.3,
                        color: "#7c3aed",
                        transition: { duration: 0.3 }
                    }}
                >
                    {'( )'}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Home;
