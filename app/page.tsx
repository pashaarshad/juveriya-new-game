'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from './components/LoadingScreen';
import GameMusicPlayer from './game/GameMusicPlayer';

// Dynamically import Phaser game with no SSR
const PhaserGame = dynamic(() => import('./game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
      <div className="text-white text-2xl">Loading game engine...</div>
    </div>
  )
});

export default function Home() {
  const [showGame, setShowGame] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleLoadingComplete = () => {
    setShowGame(true);
    setMusicStarted(true);
  };

  return (
    <>
      <GameMusicPlayer isPlaying={musicStarted} />
      {!showGame ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <PhaserGame />
      )}
    </>
  );
}
