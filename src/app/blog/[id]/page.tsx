'use client';

import { useParams, useRouter } from 'next/navigation';

import { WaitlistButton } from '@/components/landingPage/waiting-list';
import { blogComponents } from '@/components/blogsBody/blogsComponent';
import { Undo2 } from 'lucide-react';

const DisplayBlog = () => {
  const params = useParams();
  const blogId = params?.id as string;
  const router = useRouter();

  const BlogComponent = blogComponents[blogId];

  return (
    <>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-500 rounded-lg p-1 bg-gray-100 hover:text-black transition"
        >
          <Undo2/> Back
        </button>
      </div>

      {BlogComponent ? (
        <div className='py-10'>
          <BlogComponent />
        </div>
      ) : (
        <div className="text-center text-lg p-8">Blog not found</div>
      )}
      <section className="bg-[#99a5ab] min-h-[400px] flex items-center w-full py-16 border-y-[1px] border-gray-600">
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

              <p className="text-2xl text-shadow-gray-100 leading-relaxed">
                The deeptrack AI application is not just a tool—it is a global fraud prevention and audio authenticity command center serving businesses worldwide
              </p>

              <div className="w-full max-w-md">
                <WaitlistButton id='btn-image-authentication-footer' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayBlog;