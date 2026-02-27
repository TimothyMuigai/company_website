"use case";
import FeatureSvg from '../layout/FeatureSvg';

interface ContentItem {
    subtitle: string;
    description: string;
}

interface UseCaseInfoSectionProps {
    content: ContentItem[];
    title: string
    imageSrc: string
    imageAlt: string
}

const UseCaseInfoSection = ({
    title,
    content,
    imageSrc = '',
    imageAlt
}: UseCaseInfoSectionProps) => {
    return (
        <>
            <section className="max-w-7xl mx-auto mt-4 min-h-[50vh] p-4 text-black">
                <h2 className="text-4xl font-light text-center mb-2">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6justify-center">
                    {/* Left Section */}
                    <div
                        className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-6"
                    >
                        {content.map((item, index) => (
                            <div key={index}>
                                <h2 className="text-xl sm:text-xl text-gray-900 m-0">{item.subtitle}:</h2>
                                <p className="leading-relaxed max-w-lg text-gray-700">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div
                        className="flex justify-center lg:justify-end p-6 mt-2"
                    >
                        <FeatureSvg imageSrc={imageSrc} altText={imageAlt} />
                    </div>
                </div>
            </section>
            <div className='bg-black max-w-7xl mx-auto mt-4' style={{ height: '1px' }} />
            <div className='max-w-7xl mx-auto text-5xl leading-relaxed p-4 justify-center mt-6 pb-6 font-light text-center text-black'>
                <h1>deeptrack.io is not just a tool—it’s an authenticity command center</h1>
            </div>
        </>
    )
}

export default UseCaseInfoSection;
