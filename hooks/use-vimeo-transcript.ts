"use client";

import { useEffect, useState } from "react";

export type TranscriptCue = {
    id: string;
    start: number; // in seconds
    end: number;
    text: string;
};

function parseVTTTime(timeStr: string): number {
    const parts = timeStr.split(":");
    let secs = 0;
    if (parts.length === 3) {
        secs += parseInt(parts[0], 10) * 3600;
        secs += parseInt(parts[1], 10) * 60;
        secs += parseFloat(parts[2]);
    } else if (parts.length === 2) {
        secs += parseInt(parts[0], 10) * 60;
        secs += parseFloat(parts[1]);
    }
    return secs;
}

function parseVTT(vttString: string): TranscriptCue[] {
    const lines = vttString.split(/\r?\n/);
    const cues: TranscriptCue[] = [];
    let currentCue: Partial<TranscriptCue> = {};
    let isHeader = true;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (isHeader) {
            if (line === "") isHeader = false;
            continue;
        }

        if (line === "") {
            if (currentCue.start !== undefined) {
                currentCue.text = currentCue.text?.trim()?.replace(/<[^>]*>/g, ""); // strip html tags like <i>
                cues.push(currentCue as TranscriptCue);
                currentCue = {};
            }
            continue;
        }

        if (!currentCue.id && !line.includes("-->")) {
            currentCue.id = line;
            continue;
        }

        if (line.includes("-->")) {
            const parts = line.split("-->").map((p) => p.trim());
            currentCue.start = parseVTTTime(parts[0]);
            currentCue.end = parseVTTTime(parts[1]);
            continue;
        }

        if (currentCue.start !== undefined) {
            currentCue.text = (currentCue.text ? currentCue.text + " " : "") + line;
        }
    }

    // push last cue if no trailing newline
    if (currentCue.start !== undefined && currentCue.text) {
        currentCue.text = currentCue.text?.trim()?.replace(/<[^>]*>/g, "");
        cues.push(currentCue as TranscriptCue);
    }

    return cues;
}

export function formatTime(secs: number): string {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function useVimeoTranscript(videoId: string | number | undefined) {
    const [transcript, setTranscript] = useState<TranscriptCue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!videoId) {
            setTranscript([]);
            return;
        }

        let isMounted = true;

        async function fetchTranscript() {
            setLoading(true);
            setError(null);
            try {
                const configRes = await fetch(
                    `https://player.vimeo.com/video/${videoId}/config`
                );
                const config = await configRes.json();

                const textTracks = config.request?.text_tracks || [];
                if (textTracks.length === 0) {
                    if (isMounted) {
                        setTranscript([]);
                        setError("No transcript available for this video.");
                    }
                    return;
                }

                let englishTrack = textTracks.find(
                    (t: any) => t.lang === "en" || t.lang === "en-US" || t.lang === "en-GB"
                );
                const selectedTrack = englishTrack || textTracks[0];

                const vttRes = await fetch(selectedTrack.url);
                if (!vttRes.ok) throw new Error("Could not fetch transcript text");

                const vttText = await vttRes.text();
                const parsed = parseVTT(vttText);

                if (isMounted) {
                    setTranscript(parsed);
                }
            } catch (e: any) {
                if (isMounted) setError(e.message || "Failed to load transcript.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchTranscript();

        return () => {
            isMounted = false;
        };
    }, [videoId]);

    return { transcript, loading, error };
}
