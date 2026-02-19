"use client";
import { WaitlistButton } from "../landingPage/waiting-list";


interface UseCaseExtraSectionProps {
    title: string
}

const MediaUseCaseExtraSection = ({title}: UseCaseExtraSectionProps) => {
  return (
      <section className="bg-[#99a5ab] text-white min-h-[400px] max-w-7xl mx-auto mt-4 flex items-center w-full py-16 border-y-[1px] border-customTeal">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left column */}
                  <div data-aos="fade-in" className="space-y-4 h-full pt-10 pb-10 items-center justify-center flex flex-col"
                style={{backgroundImage: 'url(/use-cases/deeptrack-holistic.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
              >
                <h2 data-aos="fade-up" className="text-5xl md:text-5xl font-bold leading-tight">
                  A Holistic
                  <br />
                  Authenticity
                  <br />
                  Ecosystem
                </h2>
              </div>
    
              {/* Right column */}
              <div className="flex flex-col space-y-8">
                <h1 data-aos="fade-up" className="text-4xl text-white font-bold leading-relaxed">
                    {title}
                </h1>
    
                    <div data-aos="fade-up" className="w-full max-w-md">
                  <WaitlistButton id='btn-media-footer'/>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default MediaUseCaseExtraSection;
