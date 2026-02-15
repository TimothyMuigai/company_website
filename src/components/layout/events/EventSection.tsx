"use client"

import EventCard from "./EventCard"

const events = [
  {
    image: "/blogs_research/event1.jpg",
    title: "Global AI Security Summit 2024",
    description:
      "Exploring advanced deepfake detection techniques and synthetic media defense strategies",
    date: "December 15, 2024",
    location: "Virtual & On-site",
  },
  {
    image: "/blogs_research/event1.jpg",
    title: "Enterprise Fraud Defense Forum",
    description:
      "AI-powered fraud detection strategies for financial institutions.",
    date: "January 10, 2025",
    location: "Nairobi, Kenya",
  },
  {
    image: "/blogs_research/event1.jpg",
    title: "Enterprise Fraud Defense Forum",
    description:
      "AI-powered fraud detection strategies for financial institutions.",
    date: "January 10, 2025",
    location: "Nairobi, Kenya",
  },
  {
    image: "/blogs_research/event1.jpg",
    title: "Enterprise Fraud Defense Forum",
    description:
      "AI-powered fraud detection strategies for financial institutions.",
    date: "January 10, 2025",
    location: "Nairobi, Kenya",
  },
]

export default function EventsSection() {
  return (
    <div className="max-w-6xl m-auto">
      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          Events
        </h2>

        <div className="relative">
          <select
            className="
              text-sm
              text-gray-700
              bg-transparent
              outline-none
              cursor-pointer
            "
          >
            <option>Sort by</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

      </div>

      {/* Scrollable container */}
      <div className="h-[520px] overflow-y-auto pr-4 pt-2 space-y-6 border-r">
        {events.map((event, i) => (
            <EventCard key={i} {...event} />
        ))}

      </div>

    </div>
  )
}
