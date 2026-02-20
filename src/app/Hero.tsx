"use client";
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-32">
      <p className="text-sm text-white/60 mb-4">
        Introducing deeptrack
      </p>

      <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
        An Enterprise deepfake <br /> detection company
      </h1>

      <p className="mt-6 max-w-xl text-white/60 text-sm md:text-base">
        Deeptrack restores trust in digital media through AI-powered
        verification and deepfake detection.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition">
          <Link href="https://gotham.deeptrack.io/signup" 
                target="_blank" >Get started</Link>
        </button>

        <button 
          className="rounded-md border border-white/30 px-6 py-3 text-sm hover:bg-white/10 transition"
          onClick={() => {
            const section = document.getElementById("industries");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View use cases
        </button>
      </div>
    </section>
  );
}
