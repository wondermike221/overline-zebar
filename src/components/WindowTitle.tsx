import { motion, AnimatePresence } from "framer-motion";
import { AppWindowIcon } from "lucide-react";
import { forwardRef } from "react";
import { GlazeWmOutput } from "zebar";

const SPLIT_WINDOW_PROCESS_EXCLUSIONS = ["Spotify"];
const SPLIT_WINDOW_TITLE_REGEX = /[-—]/;

interface WindowTitleProps {
  glazewm: GlazeWmOutput | null;
}

export const WindowTitle = forwardRef<HTMLDivElement, WindowTitleProps>(
  ({ glazewm }, ref) => {
    if (!glazewm) return null;

    const title = getWindowTitle(glazewm);
    const ANIMATION_EXIT_OFFSET = 3;

    function handleWindowTitle(e: React.MouseEvent, textToCopy: string) {
      if (e.altKey) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            console.log(`Copied to clipboard: ${textToCopy}`);
          })
          .catch((err) => {
            console.error("Failed to copy text to clipboard:", err);
          });
      }
    }

    return (
      <AnimatePresence mode="wait">
        {title ? (
          <motion.div
            ref={ref}
            key={title}
            initial={{ opacity: 0, y: -ANIMATION_EXIT_OFFSET }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: ANIMATION_EXIT_OFFSET }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="max-w-[400px] truncate font-medium"
            title={title}
            onClick={(e) =>
              handleWindowTitle(e, getWindowProcess(glazewm) ?? "")
            }
          >
            {title}
          </motion.div>
        ) : (
          <motion.div
            ref={ref}
            key="default-icon"
            initial={{ opacity: 0, y: -ANIMATION_EXIT_OFFSET }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: ANIMATION_EXIT_OFFSET }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="flex items-center"
          >
            <AppWindowIcon className="h-4 w-4 text-icon" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

enum ContainerType {
  ROOT = "root",
  MONITOR = "monitor",
  WORKSPACE = "workspace",
  SPLIT = "split",
  WINDOW = "window",
}

const getWindowTitle = (glazewm: GlazeWmOutput): string | null => {
  const focusedWorkspace = glazewm.focusedWorkspace;
  const focusedContainer = glazewm.focusedContainer;

  if (focusedContainer.type === ContainerType.WINDOW) {
    const focusedContainerTitle = focusedContainer.title;
    const focusedContainerProcess = focusedContainer.processName;

    const isExcluded =
      typeof focusedContainerProcess === "string" &&
      SPLIT_WINDOW_PROCESS_EXCLUSIONS.some((exclusion) =>
        focusedContainerProcess.startsWith(exclusion)
      );

    const splitWindowTitle =
      focusedContainerTitle?.split(SPLIT_WINDOW_TITLE_REGEX) || [];

    const lastSplitWindowTitle = isExcluded
      ? focusedContainerProcess
      : splitWindowTitle.at(-1) ?? focusedContainerTitle;

    return lastSplitWindowTitle;
  }

  // If the focused container is not a window, return workspace name
  return (focusedWorkspace && `Workspace ${focusedWorkspace.name}`) || null;
};

const getWindowProcess = (glazewm: GlazeWmOutput): string | null => {
  const focusedContainer = glazewm.focusedContainer;

  if (focusedContainer.type === ContainerType.WINDOW) {
    return focusedContainer.processName;
  }

  return null;
};
