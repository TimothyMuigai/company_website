'use client'

import { Navbar } from "@/components/landingPage/navs/navBar"
import StatsSection from "@/components/layout/Statistic"
import Banner from "@/components/layout/Banner"
import FeatureSection from "@/components/layout/featureSection"
import InfoSection from "@/components/layout/InfoSection"
import Head from "next/head"
import ExploreSection from "@/components/layout/Explore"
import { WaitlistButton } from "@/components/landingPage/waiting-list"
import Image from "next/image"

const ImageAuthenticationPage = () => {
    return (
        <>
            <Head>
                <title>AI Image Authentication & Deepfake Image Detection Software | deeptrack</title>
                <meta
                    name="description"
                    content="Advanced AI image authentication and deepfake image detection software. Detect manipulated images, synthetic media, and AI-generated content with enterprise-grade accuracy for global businesses."
                />
                <meta
                    name="keywords"
                    content="deepfake image detection, image authentication, detect manipulated media, AI-generated image detection, synthetic media detection, deepfake detection software, AI content verification, image forensics, fake image detection, photo authentication, AI image analysis, deepfake detection USA, deepfake detection UK, deepfake detection Canada, deepfake detection Europe, deepfake detection Australia, deepfake detection Germany, deepfake detection France, deepfake detection Asia, enterprise image verification, business image authentication, corporate deepfake detection, media authenticity solutions, AI image verification tools, detect fake photos, image manipulation detection, digital image forensics, AI image analysis software"
                />
                <meta property="og:title" content="AI Image Authentication & Deepfake Detection Software for Global Businesses" />
                <meta property="og:description" content="Detect manipulated images and synthetic media with advanced AI image authentication. Protect your organization from deepfake image threats worldwide." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.deeptrack.io/image-authentication" />
            </Head>

            <div className="space-y-6 text-black">
                {/* <WebinarSection /> */}
                <Navbar />
                <FeatureSection
                    title="Advanced AI Image Authentication & Deepfake Detection"
                    description="Global solution detecting everything from subtle edits to full synthetic generation across all image formats and sources."
                    imageSrc='/solutions/deeptrack-image-authentication.svg'
                />
                <StatsSection
                    description="
                        Sophisticated AI-generated image forgeries are becoming increasingly accessible and widespread worldwide, posing significant risks across industries in the USA, Europe, Asia, and emerging markets. deeptrack advanced multi-layer detection shields global organizations from deepfake-driven fraud, identity theft, and disinformation with enterprise-grade accuracy.
                    "
                    imageSrc="/solutions/Rectangle 10.png"
                    statistics={[
                        {
                            value: '85%',
                            description:
                                'of organizations globally are vulnerable to deepfake-enabled fraud across North America, Europe, and Asia-Pacific'
                        },
                        {
                            value: '75%',
                            description:
                                'of businesses worldwide face rising threats from manipulated images and misinformation'
                        },
                    ]}
                />
                <Banner
                    banner={[
                        { icon: '/solutions/detection.svg', title: 'Advanced Global Detection', description: 'deeptrack leverages cutting-edge AI to identify manipulations at the pixel level, uncover hidden inconsistencies, and provide unparalleled accuracy in detecting deepfake and synthetic media threats for businesses in the USA, Europe, Asia, and beyond.' },
                        { icon: '/solutions/protection.svg', title: 'International Fraud Protection', description: 'By exposing manipulated images, deeptrack safeguards global enterprises from fraud, enhancing security across key sectors such as finance, media, and public administration in markets worldwide including Canada, Australia, and the UK.' },
                        { icon: '/solutions/injection.svg', title: 'Stop Global Injection Impersonations', description: 'deeptrack enables reliable KYC verification and protects organizations against impersonation threats worldwide, helping to secure reputations, maintain trust, and prevent operational risks across international markets.' },
                        { icon: '/solutions/platform.svg', title: 'Global Platform Agnostic', description: 'Our solution can be integrated into any pre-existing workflow worldwide to help organizations comply with international regulatory standards, safeguard against disinformation, ensure accurate reporting, and maintain visual content integrity across all regions.' },
                    ]}
                />
                <InfoSection
                    title="Global deeptrack Image Authentication Solution"
                    description="deeptrack™ image authentication leverages advanced multi-layer AI detection to analyze images with precision for businesses worldwide. Our technology identifies manipulations at the pixel level, detecting techniques such as GAN-based image synthesis, face swapping, and other forms of synthetic media across diverse global use cases. Every image scan delivers actionable insights, including the likelihood of manipulation, helping organizations in the USA, Europe, Asia, and Africa swiftly identify AI-generated alterations. The platform also employs explainable AI, offering clear visualizations and detailed feedback to empower users globally in combating fraud and disinformation effectively. Designed to scale internationally, deeptrack™ supports everything from processing a few images to managing bulk operations, ensuring flexibility for global businesses of any size with easy access through an intuitive web interface or seamless integration into your workflows via API."
                    imageSrc='/solutions/deeptrack-image-authentications.svg'
                />
                <div>
                    <ExploreSection
                        types={[
                            'Face Swap',
                            'AI-Avatar',
                            'Synthetic Faces',
                            'Lip Sync',
                            'AI-Generated Voice',
                            'Face Re-enactment',
                        ]}
                    />
                    
                    <section className="bg-[#FBFBFB] min-h-[400px] flex items-center w-full py-16 border-y-[1px] border-gray-600">
                        
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                            
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Left column */}
                                <div className="space-y-4">
                                    <h2 data-aos="fade-up" className="text-5xl md:text-5xl font-bold leading-tight">
                                        A Global Holistic
                                        <br />
                                        Authenticity
                                        <br />
                                        Ecosystem
                                    </h2>
                                </div>

                                {/* Right column */}
                                <div className="flex flex-col space-y-8">
                                    
                                    <p className="text-2xl text-shadow-gray-100 leading-relaxed">
                                        The deeptrack AI application is not just a tool—it is a global fraud prevention and media authenticity command center serving businesses worldwide
                                    </p>

                                    <div className="w-full max-w-md">
                                        <WaitlistButton id='btn-image-authentication-footer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </div>
            </div>
        </>
    )
}

export default ImageAuthenticationPage;