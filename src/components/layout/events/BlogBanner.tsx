'use client';  // Ensure this is a client component

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { features } from '@/data/blog';
import { ArrowUpRight } from 'lucide-react';

const categories = [
    'ALL',
    'CYBERSECURITY',
    'KYC SECURITY',
    'LAW ENFORCEMENT',
    'MEDIA VERIFICATION',
    'THREAT INTELLIGENCE',
];

const BlogBanner: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filteredFeatures = selectedCategory === 'ALL'
        ? features
        : features.filter((feature) => feature.category === selectedCategory);

    return (
        <div className="py-10 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Category Navigation */}
                <nav className="flex flex-wrap justify-center space-x-4 mb-10 text-sm">
                    {categories.map((category, index) => (
                        <React.Fragment key={category}>
                            <button
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 rounded-lg transition-colors ${selectedCategory === category
                                        ? 'bg-white text-gray-700'
                                        : 'text-gray-600 hover:text-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                            {index < categories.length - 1 && <span className="hidden sm:inline text-gray-400">|</span>}
                        </React.Fragment>
                    ))}
                </nav>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFeatures.map((feature, id) => (
                        <div
                            data-aos="fade-in"
                            key={id}
                            className="bg-primary rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col">
                                <span className="text-xs text-gray-200 font-light mb-1">
                                    {feature.category}
                                </span>
                                <h3 className="text-lg font-light mb-2 text-white line-clamp-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                                    {feature.description}
                                </p>
                                
                                {/* Use Next.js <Link> to pass the blog ID */}
                                <Link
                                    href={`/blog/${feature.id}`}
                                    className="text-white flex items-center mt-auto font-light hover:underline hover:text-gray-300"
                                >
                                    Read <ArrowUpRight size={20} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogBanner;