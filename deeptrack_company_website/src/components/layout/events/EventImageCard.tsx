import Image from "next/image"

interface EventImageCardProps {
  image: string
  alt: string
}

export default function EventImageCard({
  image,
  alt,
}: EventImageCardProps) {
  return (
    <div className="
      relative
      w-full
      h-[180px]
      md:w-[300px]
      md:h-[180px]
      rounded-xl
      overflow-hidden
      flex-shrink-0
    ">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 300px"
      />
    </div>
  )
}
