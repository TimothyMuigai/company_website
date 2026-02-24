import { motion } from "framer-motion"
import EventImageCard from "./EventImageCard"
import { ArrowUpRight } from "lucide-react"

interface EventCardProps {
  image: string
  title: string
  description: string
  date: string
  location: string
  link?: string
}

export default function EventCard({
  image,
  title,
  description,
  date,
  location,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="
        bg-white 
        rounded-2xl 
        border 
        border-gray-500
        p-4 
        md:p-2
        flex 
        flex-col
        md:flex-row
        gap-4
        md:gap-8 
        hover:shadow-lg 
        transition-all 
        duration-300
      "
    >

      {/* LEFT IMAGE */}
      <EventImageCard
        image={image}
        alt={title}
      />

      {/* RIGHT CONTENT */}
      <div className="flex-1 space-y-4">

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        <div className="text-black text-lg font-light">
          {date} | {location}
        </div>

        <button className="
          text-black 
          font-light 
          flex 
          items-center 
          gap-2 
          hover:text-gray-600
        ">
          LEARN MORE
          <ArrowUpRight size={18} />
        </button>

      </div>

    </motion.div>
  )
}
