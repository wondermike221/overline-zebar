import { AnimatePresence, motion } from "framer-motion";
import { Volume, Volume1, Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { Chip } from "../ui/Chip";
import Slider from "./Slider";

// TODO: Investigate AudioDevice type and why it's not exported. For now, just use any.
export function VolumeControl({
  playbackDevice,
  statIconClassnames,
  setVolume,
}: {
  playbackDevice: any;
  setVolume: any;
  statIconClassnames: "h-3 w-3 text-icon";
}) {
  const [expanded, setExpanded] = useState(false);

  const handleWheel = (e: React.WheelEvent<HTMLButtonElement>) => {
    if (!playbackDevice) return;

    const delta = e.deltaY > 0 ? -3 : 3;
    setVolume(Math.min(Math.max(playbackDevice.volume + delta, 0), 100));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!playbackDevice) return;

    if (e.shiftKey) {
      setVolume(playbackDevice.volume === 0 ? 100 : 0);
      return;
    }

    setExpanded(!expanded);
  };

  const renderIcon = () => {
    if (!playbackDevice) return null;
    if (playbackDevice?.volume === 0) {
      return (
        <Volume className={statIconClassnames} size={16} strokeWidth={3} />
      );
    } else if (playbackDevice?.volume > 0 && playbackDevice?.volume < 60) {
      return (
        <Volume1 className={statIconClassnames} size={16} strokeWidth={3} />
      );
    } else {
      return (
        <Volume2 className={statIconClassnames} size={16} strokeWidth={3} />
      );
    }
  };

  return (
    <Chip
      as="button"
      onClick={handleClick}
      onWheel={handleWheel}
      className="outline-none h-full"
    >
      <div className="flex items-center">
        <div>{renderIcon()}</div>

        <div
          className={cn(
            "transition duration-200 ease-in-out mx-1 w-full",
            expanded && "mx-1.5"
          )}
        >
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden"
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              >
                <Slider value={playbackDevice.volume} setValue={setVolume} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p>{playbackDevice?.volume}%</p>
      </div>
    </Chip>
  );
}
