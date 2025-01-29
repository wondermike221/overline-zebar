import { motion } from "framer-motion";
import { Workspace } from "glazewm";
import { GlazeWmOutput } from "zebar";
import { cn } from "../utils/cn";
import { buttonStyles } from "./common/Button";
import { Chip } from "./common/Chip";
import useMeasure from "react-use-measure";

interface WorkspaceControlsProps {
  glazewm: GlazeWmOutput | null;
}

export function WorkspaceControls({ glazewm }: WorkspaceControlsProps) {
  if (!glazewm) return null;

  const [ref, { width }] = useMeasure();
  const springConfig = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  };

  return (
    <motion.div
      key="workspace-control-panel"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: width || "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={springConfig}
      className="relative overflow-hidden h-full"
    >
      <Chip
        className={cn(
          width ? "absolute" : "relative",
          "flex items-center gap-1.5 px-[2px] py-[4px] select-none overflow-clip"
        )}
        as="div"
        ref={ref}
      >
        {glazewm.allWorkspaces?.map((workspace: Workspace, idx) => {
          const isFocused = workspace.hasFocus;
          return (
            <button
              key={workspace.name}
              onClick={() =>
                glazewm.runCommand(`focus --workspace ${workspace.name}`)
              }
              className={cn(
                "relative rounded-xl px-2 transition duration-500 ease-in-out text-text/80",
                isFocused ? "" : "hover:text-text",
                isFocused && "text-text font-medium"
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <p className="z-10">{workspace.displayName ?? workspace.name}</p>

              {isFocused && (
                <motion.span
                  layoutId="bubble"
                  className={cn(
                    buttonStyles,
                    "bg-background-subtle border-text/20 drop-shadow-sm mix-blend-overlay rounded-xl absolute inset-0",
                    isFocused && "hover:bg-background-subtle"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </Chip>
    </motion.div>
  );
}
