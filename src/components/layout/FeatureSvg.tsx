import Image from 'next/image';
import { motion } from 'framer-motion'

interface FeatureSvgProps {
  imageSrc?: string;
  altText: string;
}

const FeatureSvg = ({ imageSrc = '', altText }: FeatureSvgProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative mt-6"
    >
      <Image src={imageSrc} className='w-full m-auto' height={400} width={600} alt={altText} />
    </motion.div>
  )
}

export default FeatureSvg;