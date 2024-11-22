import { motion, AnimatePresence } from "framer-motion";
import { AppWindowIcon } from "lucide-react";
import { forwardRef } from "react";

export const WindowTitle = forwardRef(({ output }) => {
  if (!output) return null;

  const focusedWorkspace = output?.glazewm?.focusedWorkspace;
  const children = focusedWorkspace?.children ?? [];
  const focusedWindow =
    children.length > 0
      ? children.find((window) => window?.hasFocus)
      : undefined;
  const workspaceName =
    focusedWorkspace && "Workspace " + focusedWorkspace.name;
  const title = focusedWindow?.title || workspaceName;
  const ANIMATION_EXIT_OFFSET = 3;

  return (
    <AnimatePresence mode="wait">
      {title ? (
        <motion.div
          key={title} // Trigger re-animation when the title changes
          initial={{ opacity: 0, y: -ANIMATION_EXIT_OFFSET }} // Starting animation state
          animate={{ opacity: 1, y: 0 }} // End animation state
          exit={{ opacity: 0, y: ANIMATION_EXIT_OFFSET }} // Exit animation state
          transition={{ duration: 0.15, ease: "easeInOut" }} // Timing for animation
          className="max-w-[400px] truncate"
          title={title} // Tooltip to show full title on hover
        >
          {title}
        </motion.div>
      ) : (
        <motion.div
          key="default-icon" // Ensure unique key for unmounting
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
});
