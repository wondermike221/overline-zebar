import { motion } from "framer-motion";
import CurrentTrack from "./CurrentTrack";
import { WindowTitle } from "./WindowTitle";

export function Center({ output }) {
  if (!output) return null;

  return (
    <motion.div
      className="flex gap-3 items-center h-full transition-all ease-in-out"
      layout="position"
    >
      <WindowTitle output={output} />
      <CurrentTrack
        title={output?.media?.session?.title}
        artist={output?.media?.session?.artist}
        active={output?.media?.session?.isPlaying}
        startTime={output?.media?.session?.startTime}
        endTime={output?.media?.session?.endTime}
        currentTime={output?.media?.session?.position}
      />
    </motion.div>
  );
}
