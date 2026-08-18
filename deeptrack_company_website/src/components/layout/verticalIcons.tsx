'use client';

import { FaLink, FaFacebook, FaInstagram, FaTimes } from 'react-icons/fa'; // Importing React Icons
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SocialIcons = () => {
  const router = useRouter();
  const [showCloseText, setShowCloseText] = useState(false);

  // Function to copy URL to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        alert(err);
      });
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  // Function to share on Instagram (via URL)
  const shareOnInstagram = () => {
    const url = window.location.href;
    window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Copy Link Button */}
      <button className="p-1.5 bg-gray-200 rounded-full" onClick={copyLink}>
        <FaLink className="w-5 h-5 text-black" /> {/* Reduced icon size */}
      </button>

      {/* Facebook Button */}
      <button className="p-1.5 bg-blue-600 rounded-full" onClick={shareOnFacebook}>
        <FaFacebook className="w-5 h-5 text-white" /> {/* Reduced icon size */}
      </button>

      {/* Instagram Button */}
      <button className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" onClick={shareOnInstagram}>
        <FaInstagram className="w-5 h-5 text-white" /> {/* Reduced icon size */}
      </button>

      <div
        className="relative flex items-center"
        onMouseEnter={() => setShowCloseText(true)}
        onMouseLeave={() => setShowCloseText(false)}
      >
        {showCloseText && (
          <span className="absolute right-10 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap transition-opacity duration-200">
            Close button
          </span>
        )}

        <button
          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          onClick={() => router.back()}
        >
          <FaTimes className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default SocialIcons;