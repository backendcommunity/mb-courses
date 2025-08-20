"use client";

import { useEffect, useRef, useState } from "react";
import socket from "@/lib/socketIo";
import { useUser } from "@/hooks/use-user";
import { Paintbrush, X } from "lucide-react";
import { Button } from "../ui/button";
import "xterm/css/xterm.css";

let XTerm: any, FitAddon: any;
if (typeof window !== "undefined") {
  XTerm = require("xterm").Terminal;
  FitAddon = require("xterm-addon-fit").FitAddon;
}

interface TerminalProps {
  slug: string;
  output?: any;
  onClose: (open: boolean) => void;
}

export function Terminal({ slug, onClose }: TerminalProps) {
  const user = useUser();
  const [terminalSession, setTerminalSession] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);
  const fitAddonRef = useRef<any>(null);
  const [command, setCommand] = useState<string>("");

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      fontFamily: "Ubuntu Mono, Terminus Font, courier-new, courier, monospace",
      // fontWeight: "100",
      fontSize: 14,
      cursorBlink: true,
      cursorStyle: "bar",
      theme: { background: "#191919" },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);

    // Delay the first fit to let DOM paint
    setTimeout(() => {
      try {
        fitAddon.fit();
        term.focus();
      } catch (e) {
        console.warn("Fit failed initially", e);
      }
    }, 50);

    // Save refs
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Observe resizing of the container
    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch (e) {
        console.warn("Fit on resize failed", e);
      }
    });
    resizeObserver.observe(terminalRef.current);

    // Start session
    socket.emit("term:start", { userId: user?.id, projectName: slug });
    return () => {
      resizeObserver.disconnect();
      term.dispose();
      socket.off("term:data");
      socket.off("term:error");
      socket.off("term:started");
      socket.off("term:exit");
    };
  }, []);

  useEffect(() => {
    if (!xtermRef.current) return;

    const handleData = (data: any) => {
      if (terminalSession) {
        socket.emit("term:stdin", {
          sessionId: terminalSession,
          userId: user?.id,
          projectName: slug,
          data,
        });
      }
    };

    // Terminal Events
    xtermRef.current?.onKey((e: any) => {
      switch (e.domEvent.key) {
        case "Enter":
          if (command === "clear") {
            xtermRef.current?.clear();
            return;
          }
          handleData("\r\n");
          break;

        default:
          setCommand((prev) => prev + e.key);
          handleData(e.key);
      }
    });

    // Socket events
    socket.on("term:data", ({ data, sessionId }) => {
      if (sessionId === terminalSession)
        xtermRef.current?.write(
          data
            .replace("__END__", "")
            .replace("\n__END__", "")
            .replace(";echo", "")
        );
    });

    socket.on("term:error", ({ data }) =>
      xtermRef.current?.writeln(`\x1b[31m${data}\x1b[0m`)
    );

    socket.on("term:started", ({ sessionId, cwd }) => {
      setTerminalSession(sessionId);
      xtermRef.current?.write(`\x1b[32m${cwd} $: \x1b[0m`);
      fitAddonRef.current?.fit();
    });

    socket.on("term:restarted", ({ sessionId }) => {
      setTerminalSession(sessionId);
      fitAddonRef.current?.fit();
    });

    socket.on("term:exit", (data) => {
      xtermRef.current?.writeln("\x1b[31mSession ended.\x1b[0m");
    });

    return () => {
      socket.off("term:data");
      socket.off("term:error");
      socket.off("term:started");
      socket.off("term:restarted");
      socket.off("term:exit");
    };
  }, [terminalSession]);

  const clearTerminal = () => {
    xtermRef.current?.clear();
    xtermRef.current?.writeln("Welcome to MB Projects Terminal");
    fitAddonRef.current?.fit();
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 relative overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-xs font-medium">Terminal</span>
        <div className="flex gap-2">
          <Button
            title="Clear terminal"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400"
            onClick={clearTerminal}
          >
            <Paintbrush />
          </Button>
          <Button
            title="Close terminal"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400"
            onClick={() => onClose(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal container */}
      <div ref={terminalRef} className="flex-1 overflow-hidden" />
    </div>
  );
}
