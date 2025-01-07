import { AnimatePresence, motion } from "framer-motion";
import { LucideMusic } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { MediaSession } from "zebar";

export const CurrentTrack = forwardRef(
  ({
    title,
    artist,
    isPlaying,
    startTime,
    endTime,
    position,
  }: MediaSession) => {
    const MAX_WIDTH_MD = "28rem";

    const collapseTransitionSettings = {
      type: "spring",
      duration: 1.7,
    };

    const trackVariants = {
      hidden: {
        opacity: 0,
        maxWidth: 0,
        transition: collapseTransitionSettings,
      },
      visible: {
        opacity: 1,
        maxWidth: MAX_WIDTH_MD,
        transition: collapseTransitionSettings,
      },
    };

    const iconVariants = {
      hidden: {
        opacity: 0,
        scale: 0,
        transition: { type: "spring", duration: 1.0 },
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", duration: 1.4 },
      },
    };

    return (
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div
            className="cursor-pointer select-none flex items-center bg-background-deeper/30 rounded-md border border-app-border/30 overflow-hidden pr-2 py-0.5 relative"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={trackVariants}
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  transition: {
                    duration: 2.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                }}
                className="flex items-center justify-center"
              >
                <LucideMusic className="h-3 w-3 text-icon ml-2 mr-2" />
              </motion.div>
            </motion.div>
            <div className="flex items-center text-text flex-grow gap-1.5">
              <p className="truncate max-w-[300px]">{artist}</p>
              <span>{" - "}</span>
              <p className="truncate flex-grow max-w-[300px]">{title}</p>
            </div>

            <ProgressBar
              startTime={startTime}
              endTime={endTime}
              position={position}
              isPlaying={isPlaying}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

type ProgressBarProps = Omit<
  MediaSession,
  "title" | "artist" | "albumTitle" | "albumArtist" | "trackNumber"
>;

const ProgressBar = ({
  isPlaying,
  startTime,
  endTime,
  position,
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const updateProgress = () => {
      const now = performance.now();
      const elapsedTime = Math.max(position + now / 1000 - startTime, 0);
      const newProgress = (elapsedTime / (endTime - startTime)) * 100;

      setProgress(Math.min(Math.max(newProgress, 0), 100));

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [startTime, endTime, position, isPlaying]);

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[1px] mb-[0.5px] bg-gradient-to-r from-background-subtle/80 via-background-subtle/90 to-background-subtle"
      style={{ width: `${progress}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
    />
  );
};

export default CurrentTrack;
