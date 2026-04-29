"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { researchArticles } from "@/data/researchArticles"

const ITEMS_PER_PAGE = 6

type Article = {
  title: string
  date: string
  image: string
  useCase: string
  industry: string
  modality: string
  topic: string
}

export default function ResearchGrid() {
  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    useCase: "",
    industry: "",
    modality: "",
    topic: "",
  })

  // ✅ Extract unique values for dropdowns
  const filterOptions = useMemo(() => {
    const getUnique = (key: keyof Article) =>
      [...new Set((researchArticles as Article[]).map((a) => a[key]))]

    return {
      useCase: getUnique("useCase"),
      industry: getUnique("industry"),
      modality: getUnique("modality"),
      topic: getUnique("topic"),
    }
  }, [])

  // ✅ Filter logic
  const filteredArticles = useMemo(() => {
    return (researchArticles as Article[]).filter((article) => {
      return (
        (!filters.useCase || article.useCase === filters.useCase) &&
        (!filters.industry || article.industry === filters.industry) &&
        (!filters.modality || article.modality === filters.modality) &&
        (!filters.topic || article.topic === filters.topic)
      )
    })
  }, [filters])

  // ✅ Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  const currentArticles: Article[] = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <section className="w-full bg-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ✅ Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-12">

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">

            {/* Use Case */}
            <select
              value={filters.useCase}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, useCase: e.target.value }))
              }
              className="border-none bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Use Case</option>
              {filterOptions.useCase.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>

            {/* Industry */}
            <select
              value={filters.industry}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, industry: e.target.value }))
              }
              className="border-none bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Industry</option>
              {filterOptions.industry.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>

            {/* Modality */}
            <select
              value={filters.modality}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, modality: e.target.value }))
              }
              className="border-none bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Modality</option>
              {filterOptions.modality.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>

            {/* Topic */}
            <select
              value={filters.topic}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, topic: e.target.value }))
              }
              className="border-none bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Topic</option>
              {filterOptions.topic.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>

            {/* Reset Filters */}
            <button
              onClick={() =>
                setFilters({
                  useCase: "",
                  industry: "",
                  modality: "",
                  topic: "",
                })
              }
              className="text-gray-400 hover:text-black transition"
            >
              Reset
            </button>
          </div>

          <p className="text-sm text-gray-500">
            {filteredArticles.length} articles
          </p>
        </div>

        {/* ✅ Grid */}
        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No articles found.
          </p>
        ) : (
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
        )}

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-16 text-sm text-gray-700">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="hover:text-black transition disabled:opacity-30"
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
              className="hover:text-black transition disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </section>
  )
}