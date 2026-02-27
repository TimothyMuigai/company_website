"use client";
import FeatureSvg from "../layout/FeatureSvg";


interface ContentItem {
    subtitle: string;
    description: string;
}

interface UseCaseFooterGothamBannerProps {
    content: ContentItem[];
    title: string
}

const UseCaseFooterGothamBanner = ({
    title,
    content
}: UseCaseFooterGothamBannerProps) => {
    return (
        <>
            <section className="max-w-7xl mx-auto mt-4 min-h-[50vh] p-6 pt-10">
                <h2 className="text-4xl font-light text-gray-900 text-center mb-8">{title}</h2>
                <div className="grid lg:grid-cols-2 gap-6 justify-center">
                    {/* Left Section */}
                    

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
                    <section className="py-16 px-4 text-center bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light mb-4 text-gray-900">Ready to Scale Your Media Verification?</h2>
              <p className="text-lg text-gray-700 mb-6">deeptrack Gotham powers organizations that need to verify media at scale with reliability, compliance, and ease of use.</p>
              <a 
                href="https://gotham.deeptrack.io" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition font-light"
              >
                Launch deeptrack Gotham
              </a>
            </div>
          </section>
                </div>
            </section>
        </>
    )
}

export default UseCaseFooterGothamBanner;
