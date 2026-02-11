'use client'

import { Navbar } from "@/components/landingPage/navs/navBar"
import StatsSection from "@/components/layout/Statistic"
import Banner from "@/components/layout/Banner"
import FeatureSection from "@/components/layout/featureSection"
import Head from "next/head"
import ExploreSection from "@/components/layout/Explore"
import { WaitlistButton } from "@/components/landingPage/waiting-list"
import InfoSection from "@/components/layout/InfoSection"

const AudioAuthenticationPage = () => {
    return (
        <>
            <Head>
                <title>AI Audio Authentication & Voice Deepfake Detection Software | deeptrack</title>
                <meta
                    name="description"
                    content="Advanced AI audio authentication and voice deepfake detection for global enterprises. Detect synthetic voices, cloned audio, and AI-generated speech with enterprise-grade accuracy."
                />
                <meta
                    name="keywords"
                    content="audio authentication, voice deepfake detection, AI-generated voice detection, synthetic audio detection, voice cloning detection, audio forensics, fake voice detection, voice authentication, AI voice verification, deepfake audio detection, voice fraud prevention, audio manipulation detection, speech synthesis detection, voice biometrics, audio deepfake detection, detect cloned voices, voice scam protection, AI audio analysis, audio verification software, voice deepfake detection USA, voice deepfake detection UK, voice deepfake detection Canada, voice deepfake detection Europe, audio authentication solutions, enterprise voice verification, business audio security, corporate voice protection, voice deepfake detection for call centers, financial voice verification"
                />
                <meta property="og:title" content="AI Audio Authentication & Voice Deepfake Detection for Global Businesses" />
                <meta property="og:description" content="Detect synthetic voices and audio deepfakes with advanced AI authentication. Protect your organization from voice fraud worldwide." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.deeptrack.io/audio-authentication" />
            </Head>

            <div className="space-y-6">
                {/* <WebinarSection /> */}
                <Navbar />
                <FeatureSection
                    title="Advanced AI Audio Authentication & Voice Deepfake Detection"
                    description="Global solution detecting everything from subtle voice alterations to fully synthetic audio generation across all languages and accents"
                    imageSrc="/solutions/deeptrack-audio-authentication.svg"
                />
                <StatsSection
                    description="Sophisticated AI-generated voice forgeries are rapidly advancing worldwide, creating new vulnerabilities for global businesses and individuals alike. deeptrack cutting-edge voice authentication technology detects synthetic voice patterns across multiple languages and accents, protecting against identity theft, fraud, and impersonation-driven disinformation in markets from North America to Europe and Asia."

                    imageSrc="/solutions/rectangle audio.png"

                    statistics={[
                        { value: '90%', description: 'of CEOs globally cannot distinguish cloned voices across different languages and accents' },
                        { value: '85%', description: 'of fraudulent call attempts worldwide use cloned voices targeting businesses in the USA, Europe, and emerging markets' },
                    ]}
                />
                <Banner
                    banner={[
                        {
                            icon: '/solutions/detection.svg',
                            title: 'Advanced Global Voice Detection',
                            description: 'Leverage AI-powered analysis to detect synthetic voices across multiple languages, uncovering even the most subtle manipulations in pitch, tone, and frequency for businesses worldwide.'
                        },
                        {
                            icon: '/solutions/protection.svg',
                            title: 'International Voice Fraud Protection',
                            description: 'Protect your global organization from voice-enabled fraud, securing transactions, communications, and sensitive data across international markets including USA, UK, Canada, and Europe.'
                        },
                        {
                            icon: '/solutions/injection.svg',
                            title: 'Stop Global Voice Impersonations',
                            description: 'Detect cloned voices and stop impersonation attempts worldwide before they compromise trust or operations across different regions and languages.'
                        },
                        {
                            icon: '/solutions/platform.svg',
                            title: 'Global Platform Agnostic',
                            description: 'Integrate voice authentication into your international workflows effortlessly, ensuring secure and scalable operations across platforms and regions with multi-language support.'
                        },
                    ]}
                />
                <InfoSection
                    title="Global deeptrack Audio Authentication Solution"
                    description="deeptrack audio authentication leverages advanced multi-layer AI detection to analyze audio with precision for global enterprises. Our technology identifies manipulations at the spectral level, detecting techniques such as GAN-based audio synthesis, voice cloning, and other forms of synthetic media across diverse languages and accents. Every audio scan delivers actionable insights, including the likelihood of manipulation, helping organizations worldwide swiftly identify AI-generated alterations. deeptrack platform also employs explainable AI, offering clear visualizations and detailed feedback to empower users globally in combating voice fraud and disinformation effectively. Designed to scale internationally, deeptrack supports everything from processing individual audio files to managing billions of verifications, ensuring flexibility for global businesses of any size. Access our solution through an intuitive web interface or seamlessly integrate it into your international workflows via API."
                    imageSrc="/solutions/deeptrack-audio-authentications.svg"
                />
                <div>
                    <ExploreSection
                        types={[
                            'Voice Cloning Detection',
                            'AI-Generated Voice',
                            'Synthetic Speech',
                            'Lip Sync Analysis',
                            'Audio Deepfakes',
                            'Voice Biometric Verification',
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
                                        Audio Authenticity
                                        <br />
                                        Ecosystem
                                    </h2>
                                </div>

                                {/* Right column */}
                                <div className="flex flex-col space-y-8">
                                    <p className="text-2xl text-gray-300 leading-relaxed">
                                        The deeptrack AI application is not just a tool—it is a global fraud prevention and audio authenticity command center serving businesses worldwide
                                    </p>

                                    <div className="w-full max-w-md">
                                        <WaitlistButton id='btn-audio-authentication-footer' />
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

export default AudioAuthenticationPage;