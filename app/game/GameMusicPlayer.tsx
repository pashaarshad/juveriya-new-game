'use client';

import { useEffect, useRef, useState } from 'react';

export default function GameMusicPlayer({ isPlaying }: { isPlaying: boolean }) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isMuted) {
      // Initialize Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;
      
      // Create gain node for volume control
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.value = 0.08; // Low volume for background music
      gainNodeRef.current.connect(audioContext.destination);

      // Paper Mario-style upbeat melody
      const melodyNotes = [
        { freq: 523.25, time: 0, duration: 0.3 },     // C5
        { freq: 659.25, time: 0.35, duration: 0.3 },  // E5
        { freq: 783.99, time: 0.7, duration: 0.3 },   // G5
        { freq: 880.00, time: 1.05, duration: 0.4 },  // A5
        { freq: 783.99, time: 1.5, duration: 0.3 },   // G5
        { freq: 659.25, time: 1.85, duration: 0.3 },  // E5
        { freq: 587.33, time: 2.2, duration: 0.3 },   // D5
        { freq: 523.25, time: 2.55, duration: 0.5 },  // C5
      ];

      const bassNotes = [
        { freq: 130.81, time: 0, duration: 0.4 },     // C3
        { freq: 164.81, time: 1, duration: 0.4 },     // E3
        { freq: 196.00, time: 2, duration: 0.4 },     // G3
      ];

      const playNote = (frequency: number, startTime: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
        const oscillator = audioContext.createOscillator();
        const noteGain = audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, startTime);
        
        // Envelope for smooth sound
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.connect(noteGain);
        noteGain.connect(gainNodeRef.current!);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
        
        oscillatorsRef.current.push(oscillator);
      };

      // Loop the melody
      const loopMelody = () => {
        const currentTime = audioContext.currentTime;
        
        // Play melody
        melodyNotes.forEach(note => {
          playNote(note.freq, currentTime + note.time, note.duration, 'triangle', 0.25);
        });

        // Play bass
        bassNotes.forEach(note => {
          playNote(note.freq, currentTime + note.time, note.duration, 'sine', 0.15);
        });
      };

      loopMelody();
      intervalRef.current = setInterval(loopMelody, 3000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    }
  }, [isPlaying, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0.08 : 0;
    }
  };

  if (!isPlaying) return null;

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all shadow-lg text-lg"
    >
      {isMuted ? '🔇 Unmute' : '🔊 Mute'}
    </button>
  );
}
