import React from 'react'
import Image from 'next/image'

interface Statistic {
  value: string
  description: string
}

interface StatsSectionProps {
  description: string
  statistics: Statistic[]
  imageSrc: string
}

const StatsSection = ({
  description,
  statistics,
  imageSrc
}: StatsSectionProps) => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-12 md:space-y-16 lg:space-y-20">

            {/* Description */}
            <p className="
              text-base 
              md:text-lg 
              leading-7 
              md:leading-8 
              lg:text-[18px] 
              lg:leading-9 
              text-gray-800 
              max-w-3xl
            ">
              {description}
            </p>

            {/* Statistics */}
            <div className="
              flex 
              flex-col 
              sm:flex-row 
              gap-12 
              sm:gap-16 
              lg:gap-24
            ">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="max-w-sm text-center sm:text-left"
                >
                  <div className="
                    text-4xl 
                    sm:text-5xl 
                    md:text-6xl 
                    lg:text-[72px] 
                    font-light 
                    tracking-tight 
                    text-gray-900
                  ">
                    {stat.value}
                  </div>

                  <p className="
                    text-sm 
                    md:text-base 
                    leading-6 
                    md:leading-7 
                    text-gray-700 
                    mt-4
                  ">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
            <Image
              src={imageSrc}
              alt="Deepfake example"
              width={460}
              height={560}
              className="w-full max-w-sm md:max-w-md lg:max-w-none object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default StatsSection
