import React, { useEffect } from "react";
import { MediaControlOptions, MediaSession } from "zebar";
import { Chip } from "../ui/Chip";
import { Status } from "./PlayPause";
import { ConditionalPanel } from "./ConditionalPanel";
import { TitleDetails } from "./TitleDetails";
import { cn } from "../../utils/cn";
import { ProgressBar } from "./ProgressBar";

interface CurrentTrackProps {
  allSessions: MediaSession[] | undefined;
  togglePlayPause: ((options?: MediaControlOptions) => void) | undefined;
  next: ((options?: MediaControlOptions) => void) | undefined;
  previous: ((options?: MediaControlOptions) => void) | undefined;
}

export const TitleDetailsMemo = React.memo(TitleDetails);

export function CurrentTrack({
  allSessions,
  togglePlayPause,
  next,
  previous,
}: CurrentTrackProps) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [currentSessionIdx, setCurrentSessionIdx] = React.useState<number>(0);
  const currentSession = allSessions?.[currentSessionIdx] ?? allSessions?.[0];

  const handlePlayPause = (e: React.MouseEvent, currentSessionIdx: number) => {
    const currentSession = allSessions?.[currentSessionIdx];

    if (e.shiftKey) {
      previous?.({ sessionId: currentSession?.sessionId });
      return;
    }

    if (e.ctrlKey) {
      next?.({ sessionId: currentSession?.sessionId });
      return;
    }

    if (e.altKey && allSessions) {
      if (currentSessionIdx < allSessions.length - 1) {
        setCurrentSessionIdx((prev) => prev + 1);
      } else {
        setCurrentSessionIdx(0);
      }
      return;
    }

    if (currentSession) {
      togglePlayPause?.({ sessionId: currentSession.sessionId });
    }
  };

  return (
    <button
      className={
        "h-full flex gap-2 select-none cursor-pointer outline-none relative py-1.5"
      }
      onClick={(e) => {
        handlePlayPause(e, currentSessionIdx);
      }}
    >
      <ConditionalPanel sessionActive={!!currentSession}>
        <Chip
          className={cn(
            "relative flex gap-2 select-none cursor-pointer py-[0.18rem] overflow-clip group",
            "active:bg-background-deeper/90"
          )}
        >
          <Status isPlaying={currentSession?.isPlaying ?? false} />
          <TitleDetails
            title={currentSession?.title}
            artist={currentSession?.artist}
            expanded={expanded}
          />
          <ProgressBar currentSession={currentSession} />
        </Chip>
      </ConditionalPanel>
    </button>
  );
}
