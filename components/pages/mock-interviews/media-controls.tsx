import { useRoomContext } from "@livekit/components-react";
import { useState } from "react";

export function MediaControls() {
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const room = useRoomContext();
  const local = room.localParticipant;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          local.setMicrophoneEnabled(!isMicrophoneEnabled);
          setIsMicrophoneEnabled(!isMicrophoneEnabled);
        }}
      >
        {isMicrophoneEnabled ? "Mute Mic" : "Unmute Mic"}
      </button>

      <button
        onClick={() => {
          local.setCameraEnabled(!isMicrophoneEnabled);
          setIsCameraEnabled(!isCameraEnabled);
        }}
      >
        {isCameraEnabled ? "Stop Camera" : "Start Camera"}
      </button>
    </div>
  );
}
