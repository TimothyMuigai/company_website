"use client";
import FeatureSvg from "../layout/FeatureSvg"


interface InformationSectionProps {
    title?: string
    subtitle: string
    description: string
    imageSrc?: string
    imageAlt: string
}

const InformationSection = ({
    title,
    subtitle,
    description,
    imageSrc = '',
    imageAlt
}: InformationSectionProps) => {
    return (
        <>
            <section className="text-black max-w-7xl mx-auto mt-4 min-h-[50vh] p-4">
                <h2 className="text-3xl font-light text-center mb-8">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6 justify-center">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-6 px-3">
                        <div>
                            <h1 className="text-4xl font-light mb-6 text-gray-900">{subtitle}</h1>
                            <p className="leading-relaxed max-w-lg text-gray-800">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div data-aos="fade-up" className="flex justify-center lg:justify-end p-6 mt-2">
                        <FeatureSvg imageSrc={imageSrc} altText={imageAlt} />
                    </div>
                </div>
                {/* Neon Divider - Glowing Effect */}
                <div className="relative mt-12">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-gray-900">
                            <div 
                                className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 dark:opacity-100"
                                style={{
                                    boxShadow: '0 0 8px #00f2ff, 0 0 16px rgba(0, 242, 255, 0.3)',
                                    filter: 'blur(0.5px)'
                                }}
                            ></div>
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InformationSection;