"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import socket from "@/lib/socketIo";
import { useUser } from "@/hooks/use-user";
import { X, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import "xterm/css/xterm.css";

let XTerm: any, FitAddon: any;
if (typeof window !== "undefined") {
  XTerm = require("xterm").Terminal;
  FitAddon = require("xterm-addon-fit").FitAddon;
}

interface TerminalProps {
  slug: string;
  output?: string[];
  onClose: (open: boolean) => void;
}

export function Terminal({ slug, onClose, output }: TerminalProps) {
  const user = useUser();
  const [terminalSession, setTerminalSession] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(
    Array.isArray(output) && output.length
      ? output
      : ["Welcome to MB Projects Terminal"]
  );

  const terminalInputRef = useRef<string | undefined>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Array.isArray(output) && output.length) {
      setTerminalOutput(output);
    }
  }, [output]);

  // keep ref synced
  useEffect(() => {
    terminalInputRef.current = terminalInput;
  }, [terminalInput]);

  // initialize terminal session
  useEffect(() => {
    socket.emit("term:start", { userId: user?.id, projectName: slug });

    return () => {
      if (terminalSession)
        socket.emit("term:stop", { sessionId: terminalSession });
      socket.off("term:data");
      socket.off("term:error");
      socket.off("term:started");
      socket.off("term:restarted");
      socket.off("term:exit");
    };
  }, []);

  // socket event listeners
  useEffect(() => {
    const onData = ({
      data,
      sessionId,
    }: {
      data: string;
      sessionId: string;
    }) => {
      if (sessionId !== terminalSession) return;
      const command = terminalInputRef.current;
      const lines = data.split(/\r?\n/).filter((line, idx) => {
        if (idx === 0 && command && line.trim() === command.trim())
          return false;
        return line !== "";
      });
      if (lines.length) setTerminalOutput((prev) => [...prev, ...lines]);
    };

    const onError = ({ data }: any) =>
      setTerminalOutput((prev) =>
        prev.includes(data?.message) ? prev : [...prev, data?.message]
      );

    const onStarted = ({ sessionId }: { sessionId: string }) => {
      setTerminalSession(sessionId);
      setError("");
    };

    const onRestarted = ({ sessionId }: { sessionId: string }) => {
      setTerminalSession(sessionId);
      setError("");
    };

    const onExit = () => {
      setTerminalOutput((prev) => [...prev, "Session ended."]);
      setError("Session ended.");
    };

    socket.on("term:data", onData);
    socket.on("term:error", onError);
    socket.on("term:started", onStarted);
    socket.on("term:restarted", onRestarted);
    socket.on("term:exit", onExit);

    return () => {
      socket.off("term:data", onData);
      socket.off("term:error", onError);
      socket.off("term:started", onStarted);
      socket.off("term:restarted", onRestarted);
      socket.off("term:exit", onExit);
    };
  }, [terminalSession]);

  // auto scroll on output change
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [terminalOutput]);

  const handleData = (data: string) => {
    if (!terminalSession) return;
    socket.emit("term:stdin", {
      sessionId: terminalSession,
      userId: user?.id,
      projectName: slug,
      data: data + "\n",
    });
  };

  const clearTerminal = () => {
    setTerminalOutput(["Welcome to MB Projects Terminal"]);
  };

  const restartTerminal = () => {
    socket.emit("term:start", { userId: user?.id, projectName: slug });
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;

    if (command.toLowerCase().includes("clear")) {
      clearTerminal();
      setTerminalInput("");
      return;
    }

    setTerminalOutput((prev) => [...prev, `$ ${command}`]);
    handleData(command);
    setTerminalInput("");
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 rounded-lg overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-200">Terminal</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-400 hover:text-white"
            onClick={() => onClose(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-400 hover:text-white"
            onClick={restartTerminal}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Output */}
      <div
        ref={scrollRef}
        className="flex-1 p-3 overflow-y-auto space-y-1 font-mono text-xs scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {terminalOutput.map((line, index) => (
          <div
            key={index}
            className={
              line?.startsWith("$")
                ? "text-yellow-400"
                : line?.startsWith("✓")
                ? "text-green-400"
                : "text-gray-300"
            }
          >
            {line}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleTerminalSubmit}
        className="p-3 border-t border-gray-700"
      >
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-mono text-xs">$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-xs"
            placeholder="Enter command..."
            autoComplete="off"
          />
        </div>
      </form>

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-white p-4">
          <p className="mb-4 text-center">{error}</p>
          <Button
            variant="default"
            onClick={restartTerminal}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500"
          >
            <RefreshCw className="h-4 w-4" /> Restart Terminal
          </Button>
        </div>
      )}
    </div>
  );
}
