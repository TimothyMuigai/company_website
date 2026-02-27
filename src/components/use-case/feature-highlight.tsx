"use client";
import FeatureSvg from "../layout/FeatureSvg"


interface FeatureHighlightProps {
    title: string
    subtitle: string
    description: string
    imageSrc: string
    imageAlt: string
}

const FeatureHighlight = ({
    title,
    subtitle,
    description,
    imageSrc='',
    imageAlt
}: FeatureHighlightProps) => {
    return (
        <>
            <section className="text-black max-w-7xl mx-auto mt-4 min-h-[50vh] p-4">
                <h2 className="text-4xl font-light text-gray-900 text-center mb-8">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Section */}
                    <div className="flex justify-center lg:justify-end p-6 mt-6">
                        <FeatureSvg imageSrc={imageSrc} altText={imageAlt} />
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-4">
                        <h1 className="text-2xl text-gray-800 sm:text-3xl font-light mb-4">{subtitle}</h1>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                            {description}
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeatureHighlight;

