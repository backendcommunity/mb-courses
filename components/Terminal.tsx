// components/TerminalComponent.js (or .tsx)
"use client"; // Mark as a client component

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const termInstanceRef = useRef(null); // To store the xterm.js instance
  //   const term = new Terminal();
  useEffect(() => {
    (async () => {
      //   const { Terminal } = await import("xterm");
      //   const { FitAddon } = await import("@xterm/addon-fit");
      //   await import("@xterm/xterm/css/xterm.css");

      const term = new Terminal({ convertEol: true, cursorBlink: true });
      const fitAddon = new FitAddon();

      term.loadAddon(fitAddon);
      term.open(terminalRef.current!);
      fitAddon.fit();
      term.write("Welcome!\r\n");
    })();
  }, []);

  //   return <div ref={terminalRef} style={{ width: "100%", height: "400px" }} />;
  return (
    <div
      ref={terminalRef}
      style={{ height: "400px", width: "100%" }}
      className="h-full flex flex-col bg-black text-green-400 overflow-hidden"
    />
  );
};

export default TerminalComponent;
