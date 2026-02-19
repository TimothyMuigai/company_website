import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import NameCard from '../ui/nameCard';
import SocialIcons from '../layout/verticalIcons';

const TheGothamBlog: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-black text-white rounded-lg shadow-lg font-outfit">
      <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide md:text-5xl">
        deeptrack Gotham: Defending Journalism in the Age of Deepfakes
      </h1>

      <p className="text-sm md:text-lg text-gray-300 text-center mb-6 max-w-176.25 mx-auto text-[18px]">
        Deepfakes are no longer futuristic—they’re here, reshaping how misinformation spreads online.
        This article explores how Gotham empowers journalists to combat AI-driven deception.
      </p>

      {/* Reading Time */}
      <div className="flex justify-center items-center text-gray-400 text-sm mb-6">
        <FaRegClock className="h-5 w-5 mr-2" />
        <span>6 min read</span>
      </div>

      {/* Placeholder Image */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="/blogs_research/gotham.jpg" // Add an image in /public/blogs/
          alt="deeptrack Gotham Illustration"
          className="w-full h-111 object-cover shadow-md rounded-lg"
        />
      </div>

      {/* Author Info */}
      <NameCard firstName="Bryan" lastName="Koyundi" date="18-09-2025" />

      {/* Blog Content */}
      <div className="fixed right-12 top-1/4 space-y-2">
        <SocialIcons />
      </div>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        The Rising Threat of Deepfakes
      </h2>
      <p className="text-gray-300 leading-loose text-justify text-base md:text-lg mb-6">
        Deepfakes are no longer a futuristic concept—they are here, reshaping how misinformation spreads online.
        Synthetic audio, video, and images are increasingly being weaponized to manipulate public opinion, discredit journalists,
        and erode trust in legitimate news sources. For newsrooms, the challenge is urgent: how do you verify authenticity in real time?
      </p>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Introducing deeptrack Gotham
      </h2>
      <p className="text-gray-300 leading-loose text-justify text-base md:text-lg mb-6">
        At deeptrack, we built Gotham to empower journalists, editors, and fact-checkers with a powerful line of defense.
        Gotham is our deepfake detection platform designed to fit seamlessly into newsroom workflows, helping identify
        manipulated media before it reaches the public.
      </p>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Key Features
      </h2>
      <ul className="list-disc ml-6 text-lg text-gray-300 space-y-4">
        <li><strong className="text-white">Real-Time Detection:</strong> Instantly analyze audio, video, and images to flag potential deepfakes.</li>
        <li><strong className="text-white">C2PA-Aligned Verification:</strong> Built with global standards for content provenance and authenticity.</li>
        <li><strong className="text-white">Flexible Integration:</strong> Access Gotham via API or dashboard, tailored for both technical and editorial teams.</li>
        <li><strong className="text-white">Actionable Insights:</strong> Clear reports that help journalists make fast, confident publishing decisions.</li>
      </ul>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Why It Matters
      </h2>
      <p className="text-gray-300 leading-loose text-justify text-base md:text-lg mb-6">
        The credibility of journalism depends on truth. By adopting tools like Gotham, newsrooms can combat disinformation,
        protect their reputation, and safeguard public trust in a digital world increasingly shaped by AI-driven manipulation.
      </p>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Learn More
      </h2>
      <p className="text-gray-300 leading-loose text-justify text-base md:text-lg mb-6">
        Equip your newsroom with the tools to fight back against synthetic media. Visit{' '}
        <a href="https://www.deeptrack.io" target="_blank" rel="noopener noreferrer" className="text-customTeal hover:underline">
          www.deeptrack.io
        </a>{' '}
        to learn more or request a demo.
      </p>
    </div>
  );
};

export default TheGothamBlog;
