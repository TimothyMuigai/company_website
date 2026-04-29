"use client"

import { useState } from "react"
import Image from "next/image"
import { researchArticles } from "@/data/researchArticles"

const ITEMS_PER_PAGE = 6

export default function ResearchGrid() {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(researchArticles.length / ITEMS_PER_PAGE)

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentArticles = researchArticles.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    )

    return (
        <section className="w-full bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-12">
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                        {["Use Case", "Industry", "Modality", "Topic"].map((filter) => (
                            <button
                                key={filter}
                                className="flex items-center gap-2 hover:text-black transition-colors"
                            >
                                <span>{filter}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>

                    <p className="text-sm text-gray-500">
                        {researchArticles.length} articles
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentArticles.map((article, index) => (
                        <article key={index} className="group cursor-pointer">

                            {/* Image */}
                            <div className="relative overflow-hidden bg-gray-100 aspect-[1.2/1]">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Logo */}
                                <div className="absolute bottom-5 left-5">
                                    <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-md flex items-center justify-center">
                                        <div className="space-y-1">
                                            <div className="w-5 h-[2px] bg-white"></div>
                                            <div className="w-4 h-[2px] bg-white"></div>
                                            <div className="w-3 h-[2px] bg-white"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="pt-5 space-y-3">
                                <p className="text-sm text-gray-500">
                                    \ Research \ {article.date}
                                </p>

                                <h3 className="text-2xl font-light leading-snug text-gray-900 group-hover:text-gray-700 transition-colors">
                                    {article.title}
                                </h3>
                            </div>

                        </article>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-16 text-sm text-gray-700">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="hover:text-black transition-colors disabled:opacity-30"
                    >
                        ← Previous
                    </button>

                    <div className="flex items-center gap-5">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`pb-1 ${
                                    currentPage === i + 1
                                        ? "border-b border-black text-black"
                                        : "text-gray-500 hover:text-black"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="hover:text-black transition-colors disabled:opacity-30"
                    >
                        Next →
                    </button>
                </div>

            </div>
        </section>
    )
}