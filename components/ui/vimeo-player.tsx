"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { Card } from "./card";
import { Video } from "@/lib/data";
import { Play } from "lucide-react";

interface VimeoPlayerProps {
  video: Video;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

const VimeoPlayer = ({ video, onEnded, onPlay, onPause }: VimeoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
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
      console.log("Video has ended");
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

    return () => {
      player.destroy(); // clean up
    };
  }, [video]);

  return <div ref={playerRef}></div>;
};

export { VimeoPlayer };
