import { AnimatePresence, motion } from "framer-motion";
import { LucideMusic } from "lucide-react";
import { forwardRef } from "react";

export const CurrentTrack = forwardRef(
  ({ title, artist, active, startTime, endTime, currentTime }) => {
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

    const calculateProgress = () => {
      if (startTime >= endTime) return 100; // Handle edge cases
      const progress =
        ((currentTime - startTime) / (endTime - startTime)) * 100;
      return Math.min(Math.max(progress, 0), 100); // Clamp progress between 0 and 100
    };

    return (
      <AnimatePresence mode="wait">
        {active && (
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
                  opacity: [0.5, 1, 0.5], // Pulsing opacity
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

            <motion.div
              className="absolute bottom-0 left-0 h-[1px] mb-[0.5px] bg-gradient-to-r from-background-subtle/80 via-background-subtle/90 to-background-subtle"
              style={{ width: `${calculateProgress()}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default CurrentTrack;
