"use client";

import { useEffect, useRef, useState } from "react";
import { useTranscriptions, useParticipants } from "@livekit/components-react";
import { cn } from "@/lib/utils";
import { Bot, User, ChevronDown, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TranscriptEntry {
  id: string;
  speaker: "interviewer" | "candidate";
  speakerName: string;
  text: string;
  timestamp: Date;
  isFinal: boolean;
}

interface InterviewTranscriptPanelProps {
  className?: string;
  onTranscriptUpdate?: (transcript: TranscriptEntry[]) => void;
}

export function InterviewTranscriptPanel({
  className,
  onTranscriptUpdate,
}: InterviewTranscriptPanelProps) {
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>(
    []
  );
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const transcriptions = useTranscriptions();
  const participants = useParticipants();

  // Process LiveKit transcriptions
  useEffect(() => {
    if (!transcriptions || transcriptions.length === 0) return;

    const newEntries: TranscriptEntry[] = [];

    transcriptions.forEach((segment) => {
      const participant = participants.find(
        (p) => p.identity === segment.participant?.identity
      );

      const isAI =
        segment.participant?.identity?.toLowerCase().includes("agent") ||
        segment.participant?.identity?.toLowerCase().includes("kap") ||
        segment.participant?.identity?.toLowerCase().includes("ai");

      const entry: TranscriptEntry = {
        id: segment.id || `${Date.now()}-${Math.random()}`,
        speaker: isAI ? "interviewer" : "candidate",
        speakerName: isAI
          ? "Kap AI"
          : participant?.identity || "You",
        text: segment.text,
        timestamp: new Date(segment.firstReceivedTime),
        isFinal: segment.final,
      };

      // Check if entry already exists
      const existingIndex = newEntries.findIndex((e) => e.id === entry.id);
      if (existingIndex >= 0) {
        newEntries[existingIndex] = entry;
      } else {
        newEntries.push(entry);
      }
    });

    // Sort by timestamp
    newEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    setTranscriptEntries((prev) => {
      const merged = [...prev];
      newEntries.forEach((newEntry) => {
        const existingIndex = merged.findIndex((e) => e.id === newEntry.id);
        if (existingIndex >= 0) {
          merged[existingIndex] = newEntry;
        } else {
          merged.push(newEntry);
        }
      });
      return merged.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    });
  }, [transcriptions, participants]);

  // Notify parent of transcript updates
  useEffect(() => {
    onTranscriptUpdate?.(transcriptEntries);
  }, [transcriptEntries, onTranscriptUpdate]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcriptEntries, autoScroll]);

  // Handle scroll to detect if user scrolled up
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      50;
    setAutoScroll(isAtBottom);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setAutoScroll(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Live Transcript</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Recording</span>
        </div>
      </div>

      {/* Transcript Content */}
      <ScrollArea
        className="flex-1 px-4"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <div className="py-4 space-y-4">
          {transcriptEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Transcript will appear here as you speak
              </p>
            </div>
          ) : (
            transcriptEntries.map((entry, index) => (
              <TranscriptMessage
                key={entry.id}
                entry={entry}
                showTimestamp={
                  index === 0 ||
                  entry.speaker !== transcriptEntries[index - 1]?.speaker
                }
              />
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Scroll to bottom button */}
      {!autoScroll && transcriptEntries.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Button
            size="sm"
            variant="secondary"
            onClick={scrollToBottom}
            className="shadow-lg"
          >
            <ChevronDown className="w-4 h-4 mr-1" />
            New messages
          </Button>
        </div>
      )}
    </div>
  );
}

function TranscriptMessage({
  entry,
  showTimestamp,
}: {
  entry: TranscriptEntry;
  showTimestamp: boolean;
}) {
  const isInterviewer = entry.speaker === "interviewer";

  return (
    <div
      className={cn(
        "flex gap-3",
        isInterviewer ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      {showTimestamp && (
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            isInterviewer
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-foreground"
          )}
        >
          {isInterviewer ? (
            <Bot className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
      )}

      {/* Message */}
      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isInterviewer ? "items-start" : "items-end",
          !showTimestamp && (isInterviewer ? "ml-11" : "mr-11")
        )}
      >
        {showTimestamp && (
          <div
            className={cn(
              "flex items-center gap-2 mb-1",
              isInterviewer ? "" : "flex-row-reverse"
            )}
          >
            <span className="text-xs font-medium">{entry.speakerName}</span>
            <span className="text-xs text-muted-foreground">
              {entry.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
        <div
          className={cn(
            "px-3 py-2 rounded-xl text-sm",
            isInterviewer
              ? "bg-secondary text-foreground rounded-tl-none"
              : "bg-primary text-primary-foreground rounded-tr-none",
            !entry.isFinal && "opacity-70"
          )}
        >
          <p className="leading-relaxed">
            {entry.text}
            {!entry.isFinal && (
              <span className="inline-flex ml-1">
                <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                <span
                  className="w-1 h-1 rounded-full bg-current animate-bounce ml-0.5"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-1 h-1 rounded-full bg-current animate-bounce ml-0.5"
                  style={{ animationDelay: "0.2s" }}
                />
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
