"use client";

import Link from "next/link";
import { useState } from "react";

const tabs = ["Overview", "Resources", "Controls", "Subprocessors"];

export default function TrustHeroWithTabs() {
    const [activeTab, setActiveTab] = useState("Overview");

    return (
        <div>
            {/* Top Trust Center Header */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    
                    {/* Left side */}
                    <div className="flex items-center space-x-3">
                        {/* Logo placeholder */}
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-800" />
                            <span className="text-gray-400 text-sm font-medium cursor-pointer">
                                <Link href={"/"}>deeptrack</Link>
                            </span>
                        </div>

                        <span className="text-gray-300">|</span>

                        <span className="text-sm text-gray-700 font-medium">
                            deeptrack&apos;s Trust Center
                        </span>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3">
                        <button className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                            Ask a question
                        </button>

                        <button className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                            Request access
                        </button>
                    </div>
                </div>
            </div>

            {/* Blue Hero Section */}
            <div className="bg-[#1686B7] text-white">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <h1 className="text-3xl font-semibold mb-6">deeptrack</h1>

                    <p className="max-w-2xl text-sm leading-relaxed text-white/90">
                        Deeptrack is a machine-verification platform to detect and combat
                        deepfakes, synthetic media, and fraud across high-trust sectors
                        like finance, media, and government. Deeptrack aims to make trust
                        machine-readable and help organizations safeguard against
                        increasingly sophisticated AI-generated threats.
                    </p>

                    <button className="mt-6 text-sm underline underline-offset-4">
                        Privacy Policy
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 text-sm relative ${
                                    activeTab === tab
                                        ? "text-gray-900 font-medium"
                                        : "text-gray-500"
                                }`}
                            >
                                {tab}

                                {activeTab === tab && (
                                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-semibold">{activeTab}</h2>
            </div>
        </div>
    );
}