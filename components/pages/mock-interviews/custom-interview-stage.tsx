"use client";

import {
  useParticipants,
  useTracks,
  useLocalParticipant,
  VideoTrack,
  useConnectionState,
  AudioTrack,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { cn } from "@/lib/utils";
import { Bot, User, Wifi, WifiOff } from "lucide-react";

interface CustomInterviewStageProps {
  className?: string;
}

export function CustomInterviewStage({ className }: CustomInterviewStageProps) {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const connectionState = useConnectionState();
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
  ]);

  const isConnected = connectionState === ConnectionState.Connected;

  // Separate local and remote tracks
  const localVideoTrack = tracks.find(
    (t) =>
      t.participant.identity === localParticipant?.identity &&
      t.source === Track.Source.Camera
  );

  const remoteParticipant = participants.find(
    (p) => p.identity !== localParticipant?.identity
  );

  const remoteVideoTrack = tracks.find(
    (t) =>
      t.participant.identity !== localParticipant?.identity &&
      t.source === Track.Source.Camera
  );

  // Get remote audio track for playback
  const remoteAudioTrack = tracks.find(
    (t) =>
      t.participant.identity !== localParticipant?.identity &&
      t.source === Track.Source.Microphone
  );

  const hasRemoteAudio = !!remoteAudioTrack;

  return (
    <div className={cn("relative w-full h-full min-h-[400px]", className)}>
      {/* Main Video Area - AI Interviewer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,30%,12%)] to-[hsl(222,25%,8%)] rounded-2xl overflow-hidden">
        {/* Remote Audio - Always render when available (AI agent may be audio-only) */}
        {remoteAudioTrack && <AudioTrack trackRef={remoteAudioTrack} />}

        {remoteVideoTrack ? (
          <div className="w-full h-full">
            <VideoTrack
              trackRef={remoteVideoTrack}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <AIInterviewerPlaceholder
            isConnected={isConnected}
            participantName={remoteParticipant?.identity}
            hasAudio={hasRemoteAudio}
          />
        )}

        {/* AI Interviewer Label */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">
              {remoteParticipant?.identity || "Kap AI"}
            </span>
            <Bot className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Connection Status */}
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border",
              isConnected
                ? "bg-green-500/20 border-green-500/30"
                : "bg-yellow-500/20 border-yellow-500/30"
            )}
          >
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400">
                  Connecting...
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Local Video - Picture in Picture */}
      <div className="absolute bottom-4 right-4 w-48 h-36 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 bg-[hsl(222,25%,16%)]">
        {localVideoTrack ? (
          <div className="relative w-full h-full">
            <VideoTrack
              trackRef={localVideoTrack}
              className="w-full h-full object-cover mirror"
            />
            {/* Local participant label */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
              <User className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-white">You</span>
            </div>
          </div>
        ) : (
          <LocalVideoPlaceholder />
        )}
      </div>
    </div>
  );
}

function AIInterviewerPlaceholder({
  isConnected,
  participantName,
  hasAudio,
}: {
  isConnected: boolean;
  participantName?: string;
  hasAudio?: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Animated AI Avatar */}
      <div className="relative">
        {/* Outer glow rings */}
        <div className="absolute inset-0 -m-8">
          <div
            className={cn(
              "w-40 h-40 rounded-full border-2 border-primary/20",
              isConnected && "animate-ping"
            )}
            style={{ animationDuration: "3s" }}
          />
        </div>
        <div className="absolute inset-0 -m-4">
          <div
            className={cn(
              "w-32 h-32 rounded-full border border-primary/30",
              isConnected && "animate-pulse"
            )}
          />
        </div>

        {/* Main avatar container */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[hsl(190,83%,34%)] p-[3px]">
          <div className="w-full h-full rounded-full bg-[hsl(222,25%,16%)] flex items-center justify-center">
            <Bot className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[hsl(222,25%,16%)] flex items-center justify-center",
            isConnected ? "bg-green-500" : "bg-yellow-500"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full bg-white",
              isConnected && "animate-pulse"
            )}
          />
        </div>
      </div>

      {/* AI Name */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          {participantName || "Kap AI Interviewer"}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {!isConnected
            ? "Connecting to session..."
            : hasAudio
            ? "Speaking..."
            : "Ready to interview"}
        </p>
      </div>

      {/* Voice Activity Visualization */}
      {isConnected && (
        <div className="flex items-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all",
                hasAudio
                  ? "bg-green-500 animate-[audioWave_0.5s_ease-in-out_infinite]"
                  : "bg-primary/50 animate-pulse"
              )}
              style={{
                height: hasAudio ? `${12 + i * 4}px` : "8px",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LocalVideoPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(222,25%,20%)] to-[hsl(222,25%,14%)]">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
        <User className="w-6 h-6 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground mt-2">Camera off</span>
    </div>
  );
}
