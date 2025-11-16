'use client';

import React, { useState } from 'react';

export default function FamilyGame() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🎈', '🎁', '🎨', '🎪', '🎯', '🎲', '🎮', '⭐'];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [targetEmoji, setTargetEmoji] = useState(emojis[1]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    generateNewRound();
  };

  const generateNewRound = () => {
    const randomTarget = emojis[Math.floor(Math.random() * emojis.length)];
    const randomCurrent = emojis[Math.floor(Math.random() * emojis.length)];
    setTargetEmoji(randomTarget);
    setCurrentEmoji(randomCurrent);
  };

  const handleClick = () => {
    if (currentEmoji === targetEmoji) {
      setScore(score + 10);
      generateNewRound();
    } else {
      setScore(Math.max(0, score - 5));
    }
    generateNewRound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 text-pink-600">
          Juveriya Game! 🎉
        </h1>

        {!gameStarted ? (
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-8">
              Click on the emoji that matches the target!
            </p>
            <button
              onClick={startGame}
              className="px-12 py-4 bg-pink-500 text-white font-bold text-2xl rounded-full hover:bg-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-700 mb-4">
                Score: <span className="text-pink-600 text-4xl">{score}</span>
              </p>
            </div>

            <div className="bg-pink-100 rounded-2xl p-8 text-center">
              <p className="text-xl font-semibold text-gray-700 mb-4">
                Find this emoji:
              </p>
              <div className="text-8xl">{targetEmoji}</div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={handleClick}
                  onMouseEnter={() => setCurrentEmoji(emoji)}
                  className="bg-gradient-to-br from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 rounded-xl p-6 text-6xl transform hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition-all duration-300"
              >
                Restart Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
