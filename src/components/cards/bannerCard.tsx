"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Banner {
  icon: string
  title: string
  description: string
}

export const BannerCard = ({ icon, title, description }: Banner) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative
        w-full
        max-w-[500px]
        rounded-3xl
        px-10
        py-14
        text-center
        bg-gray-800
        border border-white/20
        shadow-[2px_2px_5px_0px_#00000040,-2px_-2px_5px_0px_#00000040]
      "
    >
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <Image
          src={icon}
          alt={title}
          width={90}
          height={90}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/85 text-lg leading-relaxed max-w-md mx-auto">
        {description}
      </p>
    </motion.div>
  )
}
