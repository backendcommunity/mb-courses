"use client";
import { useEffect, useRef, useState } from "react";

interface TimerProps {
  duration: number; // total seconds
  isRunning: boolean;
  onComplete: () => void;
}

export default function StableTimer({
  duration,
  isRunning,
  onComplete,
}: TimerProps) {
  const [displayTime, setDisplayTime] = useState(duration);
  const timeRef = useRef(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start / stop timer logic
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      timeRef.current -= 1;

      // Update UI once per second (only re-render this component)
      setDisplayTime(timeRef.current);

      if (timeRef.current <= 0) {
        clearInterval(timerRef.current!);
        onComplete();
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onComplete]);

  // Format MM:SS
  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;

  return (
    <div className="text-sm flex items-center gap-1 font-medium">
      ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
