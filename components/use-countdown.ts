"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mb-promo-countdown-deadline";
const DEFAULT_SECONDS = 4 * 60 * 60;

function readStoredDeadline(): number | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const deadline = Number(stored);
  return Number.isNaN(deadline) || deadline <= Date.now() ? null : deadline;
}

function startNewDeadline(seconds: number): number {
  const deadline = Date.now() + seconds * 1000;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, String(deadline));
  }
  return deadline;
}

function secondsUntil(deadline: number): number {
  return Math.max(0, Math.round((deadline - Date.now()) / 1000));
}

/**
 * Every mounted instance reads/writes the same sessionStorage deadline, so a
 * countdown shown in two places on the page (hero + pricing card) always
 * agrees, and reloading the tab continues the same countdown rather than
 * silently resetting to a fresh 4h window.
 */
export function useCountdown(seconds: number = DEFAULT_SECONDS) {
  const [deadline, setDeadline] = useState(
    () => readStoredDeadline() ?? startNewDeadline(seconds),
  );
  const [remaining, setRemaining] = useState(() => secondsUntil(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = secondsUntil(deadline);
      if (next <= 0) {
        const newDeadline = startNewDeadline(seconds);
        setDeadline(newDeadline);
        setRemaining(secondsUntil(newDeadline));
      } else {
        setRemaining(next);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, seconds]);

  return {
    h: String(Math.floor(remaining / 3600)).padStart(2, "0"),
    m: String(Math.floor((remaining % 3600) / 60)).padStart(2, "0"),
    s: String(remaining % 60).padStart(2, "0"),
  };
}
