"use client"

import Link from "next/link"
import EventCard from "./EventCard"
type Event = {
  id: number
  title: string
  date: string
  description: string
  location: string
  image: string
}

const events: Event[] = [
  // {
  //   id:0,
  //   image: "/blogs_research/event1.jpg",
  //   title: "Global AI Security Summit 2024",
  //   description:
  //     "Exploring advanced deepfake detection techniques and synthetic media defense strategies",
  //   date: "December 15, 2024",
  //   location: "Virtual & On-site",
  // },
  // {
  //   id:1,
  //   image: "/blogs_research/event1.jpg",
  //   title: "Enterprise Fraud Defense Forum",
  //   description:
  //     "AI-powered fraud detection strategies for financial institutions.",
  //   date: "January 10, 2025",
  //   location: "Nairobi, Kenya",
  // },
  // {
  //   id:2,
  //   image: "/blogs_research/event1.jpg",
  //   title: "Enterprise Fraud Defense Forum",
  //   description:
  //     "AI-powered fraud detection strategies for financial institutions.",
  //   date: "January 10, 2025",
  //   location: "Nairobi, Kenya",
  // },
  // {
  //   id:3,
  //   image: "/blogs_research/event1.jpg",
  //   title: "Enterprise Fraud Defense Forum",
  //   description:
  //     "AI-powered fraud detection strategies for financial institutions.",
  //   date: "January 10, 2025",
  //   location: "Nairobi, Kenya",
  // },
]

export default function EventsSection() {
  return (
    <div className="max-w-6xl m-auto">
      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg md:text-3xl font-light text-gray-800">
          Events
        </h2>

        <div
          className={
            `${events.length > 3 ? "relative" : "hidden"}`
          }>
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
      <div className="max-h-[520px] overflow-y-auto pr-4 pt-2 space-y-6 border-r">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))
        ) : (
          <div className="flex flex-col justify-center py-4 space-y-4">
            <p className="text-gray-600">
              No events available. Contact us to publish your event.
            </p>

            <Link
              href="/contact"
              className="px-5 py-2 w-fit bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700 transition"
            >
              Contact Us
            </Link>
          </div>
        )
        }
      </div>

    </div>
  )
}
