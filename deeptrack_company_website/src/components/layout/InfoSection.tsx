"use client"

import { motion } from "framer-motion"
import FeatureSvg from './FeatureSvg';

interface InfoSectionProps {
    title: string;
    description: string;
    imageSrc?: string;
}

const InfoSection = ({ title, description, imageSrc }: InfoSectionProps) => {
    return (
        <>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mt-4 min-h-[50vh] p-4">
                {/* Title */}
                <div className="col-span-1 lg:col-span-2 items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 text-left leading-snug px-2 lg:px-0">
                        {title}
                    </motion.h1>
                </div>

                {/* Left Section */}
                <div className="flex flex-col justify-center items-center lg:items-start p-6 text-center lg:text-left">
                    <FeatureSvg imageSrc={imageSrc} altText="Information section image" />
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-center items-center text-justify lg:items-start lg:text-left space-y-6">
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} 
                        className="text-base sm:text-md leading-loose max-w-lg text-gray-800">
                        {description}
                    </motion.p>
                </div>
            </section>
        </>
    );
};

export default InfoSection;
