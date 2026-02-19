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
            <section className="max-w-7xl mx-auto mt-4 min-h-[50vh] p-6 pt-10 text-black">
                <h2 data-aos="fade-up" className="text-4xl font-bold text-center mb-8">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6 justify-center">
                    {/* Left Section */}
                    
                        <FeatureSvg imageSrc={imageSrc} altText={imageAlt} />

                    {/* Right Section */}
                    <div
                        data-aos="fade-up"
                        className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-6"
                    >
                        {content.map((item, index) => (
                            <div key={index}>
                                <h2 className="text-xl sm:text-xl font-bold m-0">{item.subtitle}:</h2>
                                <p className="leading-relaxed max-w-lg">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UseCaseFooterBanner;
