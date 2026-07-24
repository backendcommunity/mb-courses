"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  videoId?: string;
  title?: string;
  /** Play-button size. "md" (default) is the compact card size; "lg" is bigger, for heroes where the video is the visual centerpiece. */
  size?: "md" | "lg";
  /** Wrap the video in a browser-window chrome (dot bar + url strip). Adds visual height/weight without cropping the video itself. Default false keeps the plain card unchanged. */
  browserChrome?: boolean;
  /** Url text shown in the chrome bar when browserChrome is true. */
  chromeUrl?: string;
}

/**
 * Lightweight YouTube player card for a hero section.
 * Shows the video poster + a play overlay; only loads the iframe on click
 * (keeps the hero fast — no third-party script until the user opts in).
 */
export function HeroVideo({
  videoId = "ww8xjVPqLBg",
  title = "MasteringBackend Courses overview",
  size = "md",
  browserChrome = false,
  chromeUrl = "courses.masteringbackend.com",
}: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  const buttonSize =
    size === "lg" ? "w-20 h-20 md:w-28 md:h-28" : "w-16 h-16 md:w-20 md:h-20";
  const iconSize =
    size === "lg" ? "w-9 h-9 md:w-11 md:h-11" : "w-7 h-7 md:w-8 md:h-8";

  return (
    <div className="relative w-full max-w-[760px] mx-auto">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B152A] shadow-2xl">
        {browserChrome && (
          <div className="flex items-center gap-4 border-b border-white/10 bg-[#0B152A] px-4 h-10">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <span className="text-[11px] text-slate-500 font-mono truncate">
                {chromeUrl}
              </span>
            </div>
            <div className="w-[52px] shrink-0" aria-hidden="true" />
          </div>
        )}

        <div className="relative w-full aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 w-full h-full"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-colors group-hover:from-black/40" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  "flex items-center justify-center rounded-full bg-[#13AECE] text-white shadow-lg transition-transform group-hover:scale-110",
                  buttonSize,
                )}
              >
                <Play className={cn("ml-1 fill-white", iconSize)} />
              </span>
            </span>
          </button>
        )}
        </div>
      </div>
    </div>
  );
}
