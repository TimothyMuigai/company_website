'use client'

import { Navbar } from "@/components/landingPage/navBar"
import StatsSection from "@/components/landingPage/Statistic"
import Banner from "@/components/layout/Banner"
import FeatureSection from "@/components/layout/featureSection"
import Head from "next/head"

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

            </div>
        </>
    )
}

export default ImageAuthenticationPage;