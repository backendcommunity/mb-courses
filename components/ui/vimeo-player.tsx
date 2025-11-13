"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { Card } from "./card";
import { Video } from "@/lib/data";
import { Play } from "lucide-react";

interface VimeoPlayerProps {
  video: Partial<Video>;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

const VimeoPlayer = ({
  video,
  onEnded,
  onPlay,
  onPause,
  onComplete,
}: VimeoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef(false);
  useEffect(() => {
    if (!playerRef.current) return;

    // Create a new Vimeo player
    const player = new Player(playerRef.current, {
      autoplay: true,
      id: Number(video.video),
      byline: false,
      title: false,
      responsive: true,
      // chromecast: false,
      muted: false,
      portrait: false,
    });

    player.play();

    // Listen for events
    player.on("ended", () => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      onEnded?.();
    });

    player.on("play", (s) => {
      console.log("Video is playing");
      onPlay?.();
    });

    player.on("pause", () => {
      console.log("Video is paused");
      onPause?.();
    });

    player.on("timeupdate", (data) => {
      const progress = data.percent;
      if (progress >= 0.9 && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    });

    return () => {
      player.destroy(); // clean up
    };
  }, [video]);

  return <div ref={playerRef}></div>;
};

export { VimeoPlayer };
