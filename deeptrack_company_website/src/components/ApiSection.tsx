"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TryApiSection() {
    const router = useRouter();
    return (
        <section className="pt-18">
            <div className="max-w-5xl mx-auto px-6">

                <div className="bg-gray-100 rounded-2xl p-12 flex flex-col items-center text-center">

                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        Try our API
                    </h2>

                    <p className="mt-4 text-gray-700 text-lg max-w-xl text-center">
                        Detect deepfakes in images, video, and audio using our AI models.
                        Start testing the API and explore the developer docs.
                    </p>

                    <div className="mt-8">
                        <Link href="/productApi">
                            <button
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                                onClick={() => router.push('/productApi')}
                            >
                                Test the API
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}