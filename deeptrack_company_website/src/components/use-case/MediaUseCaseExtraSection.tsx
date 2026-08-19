"use client";
import { WaitlistButton } from "../landingPage/waiting-list";


interface UseCaseExtraSectionProps {
  title: string
}

const MediaUseCaseExtraSection = ({ title }: UseCaseExtraSectionProps) => {
  return (
    <section className="bg-[#F9FAFB] min-h-[400px] flex items-center w-full py-16 border-y-[1px] border-gray-600">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-5xl font-light text-gray-900 leading-tight">
              A Holistic Authenticity
              <br />
              Ecosystem
            </h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col space-y-8">

            <p className="text-2xl text-gray-800 leading-relaxed">
              {title}
            </p>

            <div className="w-full max-w-md">
              <WaitlistButton id='btn-image-authentication-footer' />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default MediaUseCaseExtraSection;
