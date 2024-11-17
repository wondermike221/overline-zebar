import { motion } from "framer-motion";
import CurrentTrack from "./CurrentTrack";

export function Center({ output }) {
  const DATE_PREFIX = ""; // Configure if you want text in front of the date
  console.log(output?.media);

  return (
    <motion.div className="flex gap-2 items-center h-full transition-all ease-in-out">
      <div>
        {output?.date?.formatted ? DATE_PREFIX : "Hello!"}{" "}
        {output?.date?.formatted}
      </div>

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
