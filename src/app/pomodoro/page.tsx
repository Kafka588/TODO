'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsWorkTime(!isWorkTime);
      setTimeLeft(isWorkTime ? BREAK_TIME : WORK_TIME);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkTime ? WORK_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="bg-bg-200 border-bg-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-primary-100">
            <Timer className="h-6 w-6" />
            Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold tracking-tight text-text-100">
              {formatTime(timeLeft)}
            </div>
            <div className="text-text-200">
              {isWorkTime ? 'Focus Time' : 'Break Time'}
            </div>
            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                onClick={toggleTimer}
                className="w-24 bg-primary-100 text-bg-100 hover:bg-primary-200"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetTimer}
                className="w-24 border-primary-100 text-primary-100 hover:bg-bg-300 hover:text-primary-200"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 