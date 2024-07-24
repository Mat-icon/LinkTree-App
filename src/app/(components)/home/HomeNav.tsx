// components/HomeNavbar.tsx
import React from 'react';
import Link from 'next/link';

const HomeNavbar: React.FC = () => {
  const handleShare = async () => {
    const shareData = {
      title: 'Check out my profile!',
      text: 'Here is the link to my profile',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
    
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy link to clipboard:', error);
      }
    }
  };

  return (
    <div className="w-full relative z-10 h-14 flex items-center justify-between md:rounded-lg p-5 bg-white instrument-sans">
      <div>
        <Link href="/editor" className="link-color text-xs p-3 px-6 rounded-md preview font-semibold">
          Back to Editor
        </Link>
      </div>
      <div>
        <button
          onClick={handleShare}
          className="btn text-white text-xs p-3 px-6 rounded-md preview font-semibold"
        >
          Share Link
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
