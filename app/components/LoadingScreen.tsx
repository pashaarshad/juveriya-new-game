'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-pink-400 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Circular image in the middle */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/me.jpg"
            alt="Loading"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Welcome text below the image */}
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 animate-pulse">
          Welcome to Juveriya Game
        </h1>

        {/* Play button */}
        {!loading && (
          <button
            onClick={onComplete}
            className="mt-8 px-12 py-4 bg-white text-pink-600 font-bold text-2xl rounded-full hover:bg-pink-100 transform hover:scale-110 transition-all duration-300 shadow-lg animate-bounce"
          >
            PLAY
          </button>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-2 mt-4">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
