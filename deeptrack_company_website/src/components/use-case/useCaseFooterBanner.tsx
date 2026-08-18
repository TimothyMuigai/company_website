"use client";
import FeatureSvg from "../layout/FeatureSvg";


interface ContentItem {
    subtitle: string;
    description: string;
}

interface UseCaseFooterBannerProps {
    content: ContentItem[];
    title: string
    imageSrc: string
    imageAlt: string
}

const UseCaseFooterBanner = ({
    title,
    content,
    imageSrc = '',
    imageAlt
}: UseCaseFooterBannerProps) => {
    return (
        <>
            <section className="max-w-7xl mx-auto mt-4 min-h-[50vh] p-6 pt-10">
                <h2 className="text-4xl font-light text-gray-900 text-center mb-8">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6 justify-center">
                    {/* Left Section */}
                    
                        <FeatureSvg imageSrc={imageSrc} altText={imageAlt} />

                    {/* Right Section */}
                    <div
                        className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-6"
                    >
                        {content.map((item, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-light text-gray-900 m-0">{item.subtitle}:</h2>
                                <p className="leading-relaxed max-w-lg text-gray-700">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UseCaseFooterBanner;
