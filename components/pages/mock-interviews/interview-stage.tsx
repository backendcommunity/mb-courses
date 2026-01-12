import {
  AudioTrack,
  useParticipants,
  useTracks,
  useLocalParticipant,
  VideoTrack,
} from "@livekit/components-react";

export function InterviewStage() {
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();
  const tracks = useTracks();

  return (
    <div className="grid grid-cols-2 gap-4">
      {tracks.map((track) => (
        <div
          key={track.publication.trackSid}
          className="rounded-lg overflow-hidden"
        >
          {track.publication.kind === "video" && (
            <div className="relative">
              {track.participant.identity ===
                localParticipant.localParticipant.identity && (
                <div className="text-xs p-2 text-white absolute bottom-0 left-0 z-10">
                  {track.participant.identity}
                </div>
              )}
              <VideoTrack trackRef={track} />
            </div>
          )}
          {track.publication.kind === "audio" && (
            <AudioTrack trackRef={track} />
          )}

          {track.participant.identity !==
            localParticipant.localParticipant.identity && (
            <>
              <div className="text-xs p-2 bg-black/50">
                {track.participant.identity}
              </div>

              <AudioTrack trackRef={track} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
