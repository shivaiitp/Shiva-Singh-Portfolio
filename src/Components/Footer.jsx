import React from 'react';
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaTwitter,
    FaFacebook,
} from 'react-icons/fa';

function Footer() {
    const socialLinks = {
        github: "https://github.com/shivaiitp",
        linkedin: "https://www.linkedin.com/in/shiva-singh-421152167/",
        instagram: "https://www.instagram.com/shivu_iitp/",
        twitter: "https://x.com/_Shiva_iitp",
        facebook: "https://www.facebook.com/shivaiitp", 
    };

    return (
        <footer className="bg-gradient-to-tr from-[#0f0f0f] to-black text-white py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">

                {/* Social Icons */}
                <div className="flex gap-6 text-3xl">
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition hover:scale-110"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition hover:scale-110"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition hover:scale-110"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition hover:scale-110"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition hover:scale-110"
                    >
                        <FaFacebook />
                    </a>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-600"></div>

                {/* Copyright */}
                <p className="text-sm text-gray-400 text-center">
                    © {new Date().getFullYear()} Shiva Singh. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
