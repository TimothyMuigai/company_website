import React from 'react';
import { FaRegClock } from 'react-icons/fa'; // Importing the clock icon from Font Awesome
import SocialIcons from '../layout/verticalIcons'; // Assuming the SocialIcons component is in the same directory
import NameCard from '../ui/nameCard';
const TheStateOfAI: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-black text-white rounded-lg shadow-lg font-outfit">
      <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide  md:text-5xl">
        The State of AI Fraud Should Alarm Every Enterprise Leader
      </h1>

      {/* Description below the main heading with smaller font */}
      <p className="text-sm md:text-lg text-gray-300 text-center mb-6 max-w-176.25 mx-auto text-[18px]">
        As AI technology continues to advance, the threat of AI-driven fraud grows. This article delves into the rising concerns of AI fraud and its implications for enterprises.
      </p>

      {/* Reading Time with Icon */}
      <div className="flex justify-center items-center text-gray-400 text-sm mb-6">
        <FaRegClock className="h-5 w-5 mr-2" /> {/* Updated clock icon */}
        <span>5 min read</span>
      </div>

      {/* Image above the NameCard */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="/blogs_research/deeptrack-blog-1.png" // Replace with the correct image path
          alt="AI Fraud Illustration"
          className="w-full h-111 object-cover shadow-md rounded-lg" // Set height to 444px
        />
      </div>

      {/* NameCard component above the first paragraph */}
      <NameCard firstName="Hillary" lastName="Nyakundi" date="12-02-2025" />

      {/* First paragraph */}
      <p className="text-lg text-gray-300 leading-loose text-justify w-full mb-6 md:text-lg">
        Over the past few years, we have seen a drastic rise in the field of AI. Different companies all rallying to see who will emerge as a superior in this race. This comes as a good thing for consumers and end-users as we have seen the revolution these advancements have brought in different industries.
      </p>

      {/* Social Icons - Fixed to the right, with smaller gap */}
      <div className="fixed right-12 top-1/4 space-y-2">
  <SocialIcons />
</div>


      {/* Second paragraph with 100% width */}
      <p className=" text-gray-300 leading-loose text-justify w-full mb-6 text-base md:text-lg">
        AI has not only streamlined different operations across major fields but it has also enhanced decision-making processes. Even though it presents many pros, AI has also introduced new and growing threats of AI fraud as it&apos;s called by many.
      </p>

      {/* Centered and Full-Width Image */}
      <div className="w-full flex justify-center mt-6">
        <img
          src="/blogs_research/thestateofai.png"
          className="w-full rounded-lg shadow-md"
          alt="The State of AI Fraud"
        />
      </div>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Understanding AI Fraud
      </h2>

      <p className=" text-gray-300 leading-loose text-justify text-base md:text-lg">
        AI fraud is the use of artificial intelligence to deceive people, businesses, and organizations for financial gain, spread wrong information, or manipulate. It differs from traditional fraud as it leverages machine learning models to bypass security measures.
      </p>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        Types of AI Fraud
      </h2>

      <ul className="list-disc ml-6 text-lg text-gray-300 space-y-4">
        <li>
          <strong className="text-white">Deepfakes:</strong> AI-generated videos used to manipulate, spread misinformation, or impersonate others.
        </li>
        <li>
          <strong className="text-white">Voice Cloning:</strong> AI mimics an individual&apos;s voice to deceive others.
        </li>
        <li>
          <strong className="text-white">AI-Generated Phishing:</strong> Using deep learning to craft highly personalized phishing emails.
        </li>
        <li>
          <strong className="text-white">AI-Powered Misinformation:</strong> Manipulating public perception with AI-driven content.
        </li>
      </ul>

      <h2 className="font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 text-3xl md:text-4xl">
        AI Threat to Enterprises
      </h2>

      <p className="text-lg text-gray-300 leading-loose text-justify  md:text-lg">
        AI-driven fraud poses a critical threat to enterprises, with industries like finance, government, and healthcare being the most affected. A notable case in 2019 saw a UK energy company lose $243,000 due to a deepfake audio attack.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 md:text-4xl">
        How to Safeguard Against AI Fraud
      </h2>

      <ul className="list-disc ml-6 text-lg text-gray-300 space-y-4">
        <li>
          <strong className="text-white">Use Deepfake Detection Tools:</strong> Platforms like deeptrack analyze media inconsistencies to verify authenticity.
        </li>
        <li>
          <strong className="text-white">Employee Training:</strong> Conduct awareness programs on recognizing AI-based fraud and verifying communications.
        </li>
        <li>
          <strong className="text-white">Strengthen Cybersecurity:</strong> Implement multi-factor authentication, encrypt data, and monitor threats.
        </li>
        <li>
          <strong className="text-white">Leverage AI for Fraud Prevention:</strong> AI models can analyze behavioral patterns to detect anomalies in transactions and communications.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-700 pb-2 md:text-4xl">
        Conclusion
      </h2>

      <p className="text-lg text-gray-300 leading-loose text-justify md:text-lg">
        AI fraud is no longer a future threat—it is happening now. Enterprise leaders must act proactively, implementing AI-powered security solutions to safeguard against evolving threats.
      </p>
    </div>
  );
};

export default TheStateOfAI;
