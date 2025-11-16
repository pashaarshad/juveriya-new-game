'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer({ isPlaying }: { isPlaying: boolean }) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isPlaying && !isMuted) {
      // Initialize Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;
      
      // Create gain node for volume control
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.value = 0.1; // Low volume
      gainNodeRef.current.connect(audioContext.destination);

      // Create a simple melodic sequence
      const notes = [
        { freq: 523.25, time: 0 },    // C5
        { freq: 587.33, time: 0.5 },  // D5
        { freq: 659.25, time: 1 },    // E5
        { freq: 783.99, time: 1.5 },  // G5
        { freq: 659.25, time: 2 },    // E5
        { freq: 587.33, time: 2.5 },  // D5
        { freq: 523.25, time: 3 },    // C5
      ];

      // Play notes in sequence and loop
      const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const noteGain = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, startTime);
        
        // Envelope for smooth sound
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
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
        notes.forEach(note => {
          playNote(note.freq, currentTime + note.time, 0.4);
        });
        
        // Schedule next loop
        setTimeout(loopMelody, 3500);
      };

      loopMelody();

      return () => {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {
            // Oscillator might already be stopped
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
      gainNodeRef.current.gain.value = isMuted ? 0.1 : 0;
    }
  };

  if (!isPlaying) return null;

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
    >
      {isMuted ? '🔇 Unmute' : '🔊 Mute'}
    </button>
  );
}
