import Image from 'next/image';
import { motion } from 'framer-motion'

interface AudioFeatureSvgProps {
  imageSrc?: string;
  altText: string;
}

const AudioFeatureSvg = ({ imageSrc = '', altText }: AudioFeatureSvgProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
        <Image 
            src={imageSrc} 
            height={400} width={600}
            className="w-full max-w-100 h-auto object-contain" 
            alt={altText} 
        />
    </motion.div>
  )
}

export default AudioFeatureSvg;