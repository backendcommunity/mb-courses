"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useTranscriptions,
  useLocalParticipant,
} from "@livekit/components-react";
import { cn } from "@/lib/utils";
import { Bot, User, ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TranscriptEntry {
  id: string;
  speaker: "interviewer" | "candidate";
  speakerName: string;
  text: string;
  timestamp: number;
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
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Use refs to track processed data without causing re-renders
  const processedIdsRef = useRef<Set<string>>(new Set());
  const entriesMapRef = useRef<Map<string, TranscriptEntry>>(new Map());

  const transcriptions = useTranscriptions();
  const { localParticipant } = useLocalParticipant();

  // Store local participant identity in a ref to avoid dependency issues
  const localIdentityRef = useRef<string | undefined>();
  localIdentityRef.current = localParticipant?.identity;

  // Process transcriptions
  useEffect(() => {
    if (!transcriptions || transcriptions.length === 0) return;

    let hasNewEntries = false;
    const currentMap = entriesMapRef.current;

    for (const segment of transcriptions) {
      // Generate stable ID
      const segmentId = segment.id || `${segment.participant?.identity}-${segment.firstReceivedTime}`;

      // Skip if already processed as final
      if (processedIdsRef.current.has(segmentId)) {
        continue;
      }

      const existing = currentMap.get(segmentId);

      // Skip if text hasn't changed and already exists
      if (existing && existing.text === segment.text && existing.isFinal === segment.final) {
        continue;
      }

      // Determine speaker type
      const identity = segment.participant?.identity || "";
      const isAI = /agent|kap|ai|interviewer/i.test(identity);
      const isLocal = identity === localIdentityRef.current;

      const entry: TranscriptEntry = {
        id: segmentId,
        speaker: isAI ? "interviewer" : "candidate",
        speakerName: isAI ? "Kap AI" : isLocal ? "You" : identity || "Participant",
        text: segment.text,
        timestamp: segment.firstReceivedTime,
        isFinal: segment.final,
      };

      currentMap.set(segmentId, entry);
      hasNewEntries = true;

      // Mark as fully processed if final
      if (segment.final) {
        processedIdsRef.current.add(segmentId);
      }
    }

    // Only update state if we have changes
    if (hasNewEntries) {
      const sortedEntries = Array.from(currentMap.values()).sort(
        (a, b) => a.timestamp - b.timestamp
      );
      setEntries(sortedEntries);
    }
  }, [transcriptions]);

  // Notify parent (debounced)
  const notifyTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (!onTranscriptUpdate || entries.length === 0) return;

    clearTimeout(notifyTimeoutRef.current);
    notifyTimeoutRef.current = setTimeout(() => {
      onTranscriptUpdate(entries);
    }, 200);

    return () => clearTimeout(notifyTimeoutRef.current);
  }, [entries, onTranscriptUpdate]);

  // Auto-scroll
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries.length, autoScroll]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    setAutoScroll(isAtBottom);
  }, []);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setAutoScroll(true);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden relative",
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4" onScroll={handleScroll}>
        <div className="py-4 space-y-4">
          {entries.length === 0 ? (
            <EmptyState />
          ) : (
            entries.map((entry, idx) => (
              <Message
                key={entry.id}
                entry={entry}
                showHeader={idx === 0 || entry.speaker !== entries[idx - 1]?.speaker}
              />
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Scroll button */}
      {!autoScroll && entries.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <Button size="sm" variant="secondary" onClick={scrollToBottom} className="shadow-lg">
            <ChevronDown className="w-4 h-4 mr-1" />
            New messages
          </Button>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <MessageSquare className="w-6 h-6 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">
        Transcript will appear here as you speak
      </p>
    </div>
  );
}

function Message({ entry, showHeader }: { entry: TranscriptEntry; showHeader: boolean }) {
  const isAI = entry.speaker === "interviewer";
  const time = new Date(entry.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex gap-3", isAI ? "flex-row" : "flex-row-reverse")}>
      {showHeader && (
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            isAI ? "bg-primary/20 text-primary" : "bg-secondary text-foreground"
          )}
        >
          {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isAI ? "items-start" : "items-end",
          !showHeader && (isAI ? "ml-11" : "mr-11")
        )}
      >
        {showHeader && (
          <div className={cn("flex items-center gap-2 mb-1", !isAI && "flex-row-reverse")}>
            <span className="text-xs font-medium">{entry.speakerName}</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        )}
        <div
          className={cn(
            "px-3 py-2 rounded-xl text-sm",
            isAI
              ? "bg-secondary text-foreground rounded-tl-none"
              : "bg-primary text-primary-foreground rounded-tr-none",
            !entry.isFinal && "opacity-70"
          )}
        >
          <p className="leading-relaxed">
            {entry.text}
            {!entry.isFinal && (
              <span className="inline-flex ml-1 gap-0.5">
                <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0.1s]" />
                <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
