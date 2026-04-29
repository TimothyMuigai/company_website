'use client';

import { Navbar } from '@/components/landingPage/navs/navBar';
import { useRouter } from 'next/navigation';

export default function ResearchPaperPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors mb-6 cursor-pointer"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back
        </button>

        {/* PDF Viewer */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="/files/Deeptrack_NACHA_2026_Final.pdf"
            className="w-full h-[calc(100vh-120px)]"
            title="Research Paper"
          />
        </div>
      </div>
    </div>
  );
}