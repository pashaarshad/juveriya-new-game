'use client';

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import FamilyGame from './components/FamilyGame';
import MusicPlayer from './components/MusicPlayer';

export default function Home() {
  const [showGame, setShowGame] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleLoadingComplete = () => {
    setShowGame(true);
    setMusicStarted(true);
  };

  return (
    <>
      <MusicPlayer isPlaying={musicStarted} />
      {!showGame ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <FamilyGame />
      )}
    </>
  );
}
