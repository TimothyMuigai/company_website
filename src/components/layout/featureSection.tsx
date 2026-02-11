import { WaitlistButton } from '../landingPage/waiting-list'
import FeatureSvg from '../layout/FeatureSvg'

interface FeatureSectionProps {
  title: string
  description: string
  imageSrc?: string
}

const FeatureSection = ({
  title,
  description,
  imageSrc = '',
}: FeatureSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6">
      
      {/* OUTER FRAME */}
      <div
        className="
          rounded-[20px]
          bg-white
          p-[2px]
          backdrop-blur-[50px]
        "
        style={{
          boxShadow:
            '2px 2px 5px 0px rgba(0,0,0,0.25), -2px -2px 5px 0px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(50px)',
        }}
      >
        
        {/* INNER CARD */}
        <div className="rounded-[20px] bg-[#0191DA33] ">
          <div className="grid lg:grid-cols-2 gap-10 p-8 lg:p-12 min-h-[420px]">

            {/* LEFT */}
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-black">
                {title}
              </h1>

              <p className="text-lg text-gray-700 max-w-xl">
                {description}
              </p>

              <div>
                <WaitlistButton id="btn-image-authentication" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-center lg:justify-end">
              <FeatureSvg imageSrc={imageSrc} altText="Feature section image" />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default FeatureSection
