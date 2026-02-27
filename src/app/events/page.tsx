"use client"

import { Navbar } from "@/components/landingPage/navs/navBar"
import { WaitlistButton } from "@/components/landingPage/waiting-list"
import BlogBanner from "@/components/layout/events/BlogBanner"
import EventsSection from "@/components/layout/events/EventSection"
import WhyAttend from "@/components/layout/events/WhyAttendComponent"
import ExploreSection from "@/components/layout/Explore"

export default function BlogsAndResearch() {
    return (
        <>
            <Navbar />
            <section className="w-full space-y-16 flex flex-col items-center justify-center pt-6">
                <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
                    Deepfake Detection Blog & Industry Events
                </h1>
                <div className="px-4">
                    <EventsSection />
                </div>
                <BlogBanner />
                <WhyAttend />
                <div className="text-black">
                    <ExploreSection
                        types={[
                            'Face Swap',
                            'AI-Avatar',
                            'Synthetic Faces',
                            'Lip Sync',
                            'AI-Genereated Voice',
                            'Face Re-enactment',
                        ]}
                    />
                    
                    <section className="bg-[#F9FAFB] min-h-[400px] flex items-center w-full py-16 border-y-[1px] border-gray-600">
                        
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                            
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Left column */}
                                <div className="space-y-4">
                                    <h2 data-aos="fade-up" className="text-5xl md:text-5xl font-light text-gray-900 leading-tight">
                                        A Global Holistic
                                        <br />
                                        Authenticity
                                        <br />
                                        Ecosystem
                                    </h2>
                                </div>

                                {/* Right column */}
                                <div className="flex flex-col space-y-8">
                                    
                                    <p className="text-2xl text-gray-800 leading-relaxed">
                                        The deeptrack AI application is not just a tool it is a global fraud prevention and audio authenticity command center serving businesses worldwide
                                    </p>

                                    <div className="w-full max-w-md">
                                        <WaitlistButton id='btn-image-authentication-footer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </div>
            </section>
        </>
    )
}