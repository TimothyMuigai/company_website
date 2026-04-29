'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ResearchDetail() {
    return (
        <>
            <main className="w-full ">

                {/* HERO SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-20 text-center bg-[#F9FAFB] text-black">

                    {/* LEFT */}
                    <div>
                        <p className="text-sm mb-4">
                            \ Research \ Oct 09, 2025
                        </p>

                        <h1 className="text-4xl lg:text-5xl font-light leading-tight">
                            PolyJuice Makes It Real: Black-Box, Universal Red Teaming for Synthetic Image Detectors
                        </h1>

                        <div className="mt-8">
                            <Link
                                href="#content"
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md text-sm hover:bg-[#344255] transition"
                            >
                                Read the research ↗
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    {/* <div className="relative w-full h-[320px] lg:h-[420px]">
                        <Image
                            src="/images/blog-feature.jpg"
                            alt="Research"
                            fill
                            className="object-cover rounded-lg opacity-80"
                        />
                    </div> */}
                </section>

                {/* CONTENT SECTION */}
                <section id="content" className="text-black py-20">
                    <div className="max-w-3xl mx-auto px-6 text-sm leading-relaxed">

                        <p>
                            Synthetic image detectors (SIDs) are a key defense against the risks posed by the growing realism of images from text-to-image (T2I) models. Red teaming improves SID’s effectiveness by identifying and exploiting their failure modes via misclassified synthetic images.
                        </p>

                        <p className="mt-6">
                            However, existing red-teaming solutions (i) require white-box access to SIDs, which is infeasible for proprietary state-of-the-art detectors, and (ii) generate image-specific attacks through expensive online optimization.
                        </p>

                        <p className="mt-6">
                            To address these limitations, we propose PolyJuice, the first black-box, image-agnostic red-teaming method for SIDs, based on an observed distribution shift in the T2I latent space between samples correctly and incorrectly classified by the SID.
                        </p>

                        <p className="mt-6">
                            PolyJuice generates attacks by identifying the direction of this shift through a lightweight offline process and exploiting this direction by universally steering all generated images towards the SID’s failure modes.
                        </p>

                        <p className="mt-6">
                            PolyJuice-steered T2I models are significantly more effective at deceiving SIDs (up to 84%) compared to their unsteered counterparts.
                        </p>

                    </div>
                </section>

                {/* MORE RESEARCH */}
                <section className="max-w-7xl mx-auto px-6 py-20 bg-[#F9FAFB] text-black">

                    <p className="text-sm text-gray-900 mb-4">\ Research</p>

                    <h2 className="text-3xl lg:text-4xl font-light text-gray-800 mb-12">
                        Read More of Our Peer-Reviewed Research, Published in Top Journals
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* CARD 1 */}
                        <div>
                            <div className="relative h-[180px] mb-4">
                                <Image src="/images/r1.jpg" alt="" fill className="object-cover rounded-md" />
                            </div>
                            <p className="text-xs text-gray-600 mb-1">\ Research \ Apr 17, 2026</p>
                            <h3 className="text-sm text-black">
                                ICLAD: In-Context Learning with Comparison-Guidance for Audio Deepfake Detection
                            </h3>
                        </div>

                        {/* CARD 2 */}
                        <div>
                            <div className="relative h-[180px] mb-4">
                                <Image src="/images/r2.jpg" alt="" fill className="object-cover rounded-md" />
                            </div>
                            <p className="text-xs text-gray-600 mb-1">\ Research \ Nov 27, 2025</p>
                            <h3 className="text-sm text-black">
                                Patent: Generalizing audio deepfake detection by exploring style-linguistics mismatch
                            </h3>
                        </div>

                        {/* CARD 3 */}
                        <div>
                            <div className="relative h-[180px] mb-4">
                                <Image src="/images/r3.jpg" alt="" fill className="object-cover rounded-md" />
                            </div>
                            <p className="text-xs text-gray-600 mb-1">\ Research \ Nov 04, 2025</p>
                            <h3 className="text-sm text-black">
                                Patent: Data-driven audio deepfake detection
                            </h3>
                        </div>

                    </div>

                    {/* EXPLORE LINK */}
                    <div className="mt-10 text-right">
                        <Link href="/blog" className="text-sm text-black hover:underline">
                            Explore research →
                        </Link>
                    </div>

                </section>

            </main>
        </>
    );
}