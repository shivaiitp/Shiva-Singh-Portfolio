import React, { useState } from "react";
import {
    RiMailLine,
    RiPhoneLine,
    RiFileCopyLine,
    RiCheckLine,
    RiMapPinLine,
} from "@remixicon/react";
import ContactForm from "./ContactFormCard";

function ContactSection() {
    const phoneNumber = "+91 6375919829";
    const email = "shivaiitp22@email.com";
    const address = `D-118, APJ Kalam Hostel,\n IIT Patna, Bihta, Patna, Bihar, 801106`;

    const [copied, setCopied] = useState({ phone: false, email: false });
    const [showForm, setShowForm] = useState(false);

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied({ ...copied, [type]: true });

        setTimeout(() => {
            setCopied({ ...copied, [type]: false });
        }, 2000);
    };

    return (
        <section
            id="Contact"
            className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center font-webflow"
        >
            {/* Section Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mb-6 relative inline-block">
                Contact Me
                <span className="absolute left-1/2 bottom-[-6px] h-[4px] w-full bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-x-1/2 rounded-full"></span>
            </h2>

            {/* Contact Info Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl text-white text-left mt-6">
                {/* Left: Contact Details */}
                <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <RiPhoneLine className="text-blue-400 text-3xl" />
                            <a
                                href={`tel:${phoneNumber}`}
                                className="hover:text-blue-300 transition"
                            >
                                {phoneNumber}
                            </a>
                        </div>
                        <button
                            onClick={() => handleCopy(phoneNumber, "phone")}
                            className="text-white hover:text-green-400 transition"
                        >
                            {copied.phone ? (
                                <RiCheckLine className="text-green-400 text-2xl" />
                            ) : (
                                <RiFileCopyLine className="text-xl" />
                            )}
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <RiMailLine className="text-blue-400 text-3xl" />
                            <a
                                href={`mailto:${email}`}
                                className="hover:text-blue-300 transition underline"
                            >
                                {email}
                            </a>
                        </div>
                        <button
                            onClick={() => handleCopy(email, "email")}
                            className="text-white hover:text-green-400 transition"
                        >
                            {copied.email ? (
                                <RiCheckLine className="text-green-400 text-2xl" />
                            ) : (
                                <RiFileCopyLine className="text-xl" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Right: Address */}
                <div className="bg-gray-800 pt-5 rounded-lg shadow-md space-y-4 text-center">
                    <h3 className="text-blue-400 text-xl font-semibold flex items-center justify-center gap-2">
                        <RiMapPinLine className="text-xl" />
                        Address
                    </h3>
                    <p className="text-white text-lg pb-5 px-4 leading-relaxed whitespace-pre-line">
                        {address}
                    </p>
                </div>

            </div>

            {/* Contact Me Button */}
            <button
                onClick={() => setShowForm(true)}
                className="mt-10 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
                Send a Message
            </button>

            {/* Contact Form Modal */}
            <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
        </section>
    );
}

export default ContactSection;
