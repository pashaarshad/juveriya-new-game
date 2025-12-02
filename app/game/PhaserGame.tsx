'use client';

import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import BootScene from './BootScene';
import PreloadScene from './PreloadScene';
import OverworldScene from './OverworldScene';
import BattleScene from './BattleScene';

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: '#FFF7E6',
      parent: 'phaser-game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scene: [BootScene, PreloadScene, OverworldScene, BattleScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
      <div id="phaser-game" className="shadow-2xl rounded-lg overflow-hidden" />
    </div>
  );
}
