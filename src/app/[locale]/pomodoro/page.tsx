'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroPage() {
  const t = useTranslations('pomodoro');
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
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center">
      <h1 className="text-3xl font-bold text-primary-100">{t('title')}</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="text-6xl font-mono text-text-100">
          {formatTime(timeLeft)}
        </div>
        
        <div className="text-xl text-text-200">
          {isBreak ? t('breakTime') : t('focusTime')}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={toggleTimer}
            className="bg-primary-100 text-bg-100 hover:bg-primary-200"
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            className="text-text-100 hover:text-primary-100"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
} 