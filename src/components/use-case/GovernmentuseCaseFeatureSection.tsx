import { WaitlistButton } from "../landingPage/waiting-list"
import FeatureSvg from "../layout/FeatureSvg"


interface UseCaseFeatureSectionProps {
    title: string
    useCase: string
    description: string
    imageSrc?: string
}

const GovernmentUseCaseFeatureSection = ({
    title, useCase, description, imageSrc = ''
}: UseCaseFeatureSectionProps) => {
    return (
        <>
            <section data-aos="fade-in" className="text-black max-w-7xl mx-auto mt-4 min-h-[50vh] p-4">
                {/* OUTER FRAME */}
                <div
                    className="
                                  rounded-[20px]
                                  bg-white
                                  p-[1px]
                                  backdrop-blur-[50px]
                              "
                    style={{
                        boxShadow:
                            '2px 2px 5px 0px rgba(0,0,0,0.25), -2px -2px 5px 0px rgba(0,0,0,0.25)',
                        backdropFilter: 'blur(50px)',
                    }}
                >
                    {/* INNER CARD */}
                    <div className="rounded-[20px] bg-[#001D2C66] ">
                        <div className="grid lg:grid-cols-2 gap-10 p-8 lg:p-12 min-h-[420px]">
                            {/* Left Section */}
                            <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-4">
                                <p className='font-semibold text-lg'>{useCase}:</p>
                                <h1 className="text-4xl sm:text-5xl font-semibold">{title}</h1>
                                <p className="text-lg leading-relaxed max-w-lg">
                                    {description}
                                </p>
                                <WaitlistButton id='btn-media-usecase' />
                            </div>

                            {/* Right Section */}
                            <div className="flex justify-center lg:justify-end p-6 mt-6">
                                <FeatureSvg imageSrc={imageSrc} altText="Feature section image" />
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <div className='bg-black max-w-7xl mx-auto mt-4' style={{ height: '1px' }} />
        </>
    )
}

export default GovernmentUseCaseFeatureSection;
