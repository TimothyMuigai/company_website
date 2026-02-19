'use client';

import { motion, Variants  } from 'framer-motion';
import Image from 'next/image';
import {
    ShieldCheck,
    Search,
    Newspaper,
    EyeOff,
    UserCheck,
} from 'lucide-react';

const leadership = [
    {
        name: 'Bryan Koyundi',
        title: 'Founder',
        img: '/people/bryan.jpg',
        link: "https://www.linkedin.com/in/bryane-fundraising-to-build-deeptrack-6a215a282"
    },
    {
        name: 'Isaak Hayes',
        title: 'Product Strategy & User Experience',
        img: '/people/hayes.jpg',
        link: "https://www.linkedin.com/in/isaakhayes/",
    },
    {
        name: 'Russel Okoth',
        title: 'Principal Cybersecurity advisor and Privacy',
        img: '/people/russell.jpg',
        link: "https://www.linkedin.com/in/russellokoth/",
    },
    {
        name: 'Sammy Deprez',
        title: 'Pricipal Advisor on AI and Automation',
        img: '/people/sammy.jpg',
        link: "https://www.linkedin.com/in/sammydeprez/",
    },
    {
        name: 'MauriceOyundi',
        title: 'Advisor, Enterprise Technology & Public Sector Solutions',
        img: '/people/maurice.jpg',
        link: "https://www.linkedin.com/in/maurice-oyundi-50bb7119/"
    },
    {
        name: 'Ian Lumbasio',
        title: 'Advisor, Legal, Transactions & Venture Capital',
        img: '/people/ian.jpeg',
        link: "https://ke.linkedin.com/in/ian-lumbasio"
    },
    {
        name: 'Brenda Gentry',
        title: 'Marketing and Expansion ',
        img: '/people/brenda.jpg',
        link: "https://www.linkedin.com/in/brenda-gentry-4b56b087/"
    },
];

const productStack = [
    {
        name: 'deeptrack Foundry',
        icon: ShieldCheck,
        color: 'text-[#00000078]',
        desc: 'Detects insurance fraud, laundering, and policy collusion',
    },
    {
        name: 'deeptrack Gotham',
        icon: EyeOff,
        color: 'text-[#00000078]',
        desc: 'Enterprise-grade deepfake detection for media, legal, and public sector',
    },
    {
        name: 'deeptrack Atlas',
        icon: Newspaper,
        color: 'text-[#00000078]',
        desc: 'Verifies media in real time, built for journalists and fact-checkers',
    },
    {
        name: 'deeptrack Sentinel',
        icon: UserCheck,
        color: 'text-[#00000078]',
        desc: 'AI-powered KYC/KYB compliance for financial services',
    },
    {
        name: 'deeptrack Mirror',
        icon: Search,
        color: 'text-[#00000078]',
        desc: 'Shields public figures from deepfake identity attacks',
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};


export default function CompanyCulture() {
    return (
        <main className="text-black px-4 sm:px-6 md:px-10 lg:px-16 py-12 max-w-7xl mx-auto space-y-16">

            {/* Company & Culture */}
            <section className="flex flex-col md:flex-row lg:flex-row items-center gap-12 pt-6">

                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Company & Culture
                    </h1>

                    <div className="space-y-6">
                        <p className="text-lg text-gray-800 leading-relaxed">
                            We&apos;re engineers, researchers, and realists securing reality in an AI-shaped world. At deeptrack, we build active defenses against AI threats.
                        </p>

                        <p className="text-lg text-gray-800 leading-relaxed">
                            Founded in 2024 , we&apos;re the first verification-focused AI company with a global mission to establish truth infrastructure across critical sectors.
                        </p>
                    </div>
                </div>

                <div className=" lg:block flex-1">
                    <Image
                        src="/Rectangle 28.png"
                        alt="Team Culture"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-8 px-4 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Mission */}
                    <div className="space-y-6 rounded-2xl p-8 bg-[#99a5ab]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full ">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold bg-clip-text">Our Mission</h2>
                        </div>
                        <p className="text-xl italic ">
                            Machine-Verified Truth as Standard
                        </p>
                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                                <span className="font-medium">deeptrack</span> protects high-trust sectors from AI-generated fraud and misinformation.
                            </p>
                            <p className="text-lg leading-relaxed">
                                We build forensic-grade platforms to detect deepfakes, trace laundering behavior, and verify content before it causes harm.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="space-y-6 bg-[#99a5ab] rounded-2xl p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full">
                                <EyeOff className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold bg-clip-text">Our Vision</h2>
                        </div>
                        <p className="text-xl italic">
                            Deception Has Nowhere to Hide
                        </p>
                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                                We believe trust should be machine-readable, and every system that handles sensitive data should have built-in defense.
                            </p>
                            <p className="text-lg leading-relaxed">
                                <span className="font-medium">deeptrack</span> is building privacy-first platforms to secure digital ecosystems through verifiability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Stack */}
            <section className="py-12 px-4 rounded-2xl bg-[#99a5ab] text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                        <span className="">
                            When Detection Fell Short
                        </span>
                    </h2>
                    <p className="text-lg mb-12 max-w-3xl mx-auto text-center leading-relaxed">
                        deeptrack was born out of necessity when AI threats stopped being theoretical. We built infrastructure from the ground up to protect truth and trust.
                    </p>

                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {productStack.map(({ name, icon: Icon, desc, }) => (
                            <div
                                key={name}
                                className="bg-[#00000078] border border-gray-700 rounded-2xl p-6 group"
                            >
                                <div className="flex flex-col items-center text-center">

                                    <div className="flex items-center space-x-3 mb-3">
                                        <Icon className="w-6 h-6 text-whites" />
                                        <h3 className="text-xl font-bold text-white">{name}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-base mt-12 max-w-2xl mx-auto text-center border-t border-black pt-6 leading-relaxed">
                        Each product is purpose-built, regulator-aware, and battle-tested in African and global environments where truth is under pressure.
                    </p>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Company Leadership
                    </h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {leadership.map(({ name, title, img, link }) => (
                        <motion.div
                            key={name}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="rounded-2xl p-6 flex flex-col items-center text-center"
                        >
                            {/* IMAGE CONTAINER */}
                            <motion.a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-full aspect-square rounded-2xl overflow-hidden group"
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                            >
                                {/* IMAGE ZOOM */}
                                <motion.div
                                    className="absolute inset-0"
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.05 },
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Image
                                        src={img}
                                        alt={name}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </motion.a>


                            {/* TEXT */}
                            <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                {name}
                            </h3>

                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                {title}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </main>
    );
}