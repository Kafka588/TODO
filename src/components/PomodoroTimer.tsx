'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl font-bold text-primary-100">
        {formatTime(timeLeft)}
      </div>
      <div className="text-sm text-text-200">
        {isBreak ? 'Break Time' : 'Work Time'}
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="p-3 bg-primary-100 text-bg-100 rounded-full hover:bg-primary-200 transition-colors"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 bg-bg-300 text-text-100 rounded-full hover:bg-bg-200 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 