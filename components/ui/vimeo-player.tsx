"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Player from "@vimeo/player";
import { Card } from "./card";
import { Video } from "@/lib/data";
import { Play } from "lucide-react";

export interface VimeoPlayerHandle {
  seekTo: (time: number) => void;
}

interface VimeoPlayerProps {
  video: Partial<Video>;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

const VimeoPlayer = forwardRef<VimeoPlayerHandle, VimeoPlayerProps>(
  ({ video, onEnded, onPlay, onPause, onComplete }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerInstanceRef = useRef<Player | null>(null);
    const completedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      seekTo: (time: number) => {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.setCurrentTime(time);
        }
      },
    }));
    useEffect(() => {
      if (!containerRef.current) return;

      // Create a new Vimeo player
      const player = new Player(containerRef.current, {
        autoplay: true,
        id: Number(video.video),
        byline: false,
        title: false,
        responsive: true,
        // chromecast: false,
        muted: false,
        portrait: false,
      });

      playerInstanceRef.current = player;
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
        playerInstanceRef.current = null;
      };
    }, [video]);

    return <div ref={containerRef}></div>;
  });

VimeoPlayer.displayName = "VimeoPlayer";

export { VimeoPlayer };
