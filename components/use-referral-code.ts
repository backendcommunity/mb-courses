"use client";

import { useEffect, useState } from "react";
import { isAffizyReady, readReferralCode } from "@/lib/affizy-ready";

const POLL_INTERVAL_MS = 300;
const MAX_POLL_ATTEMPTS = 20; // ~6s max wait for affizy.js to load

export function useReferralCode(): { referralCode: string; ready: boolean } {
  const [referralCode, setReferralCode] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as unknown as Parameters<typeof isAffizyReady>[0];

    function check(): boolean {
      if (isAffizyReady(win)) {
        setReferralCode(readReferralCode(win));
        setReady(true);
        return true;
      }
      return false;
    }

    if (check()) return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      if (check() || attempts >= MAX_POLL_ATTEMPTS) {
        clearInterval(interval);
        setReady(true);
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { referralCode, ready };
}
