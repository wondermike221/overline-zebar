import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { buttonStyles } from "./ui/Button";
import { Chip } from "./ui/Chip";
import { GlazeWmOutput } from "zebar";
import { Workspace } from "glazewm";

interface WorkspaceControlsProps {
  glazewm: GlazeWmOutput | null;
}

export function WorkspaceControls({ glazewm }: WorkspaceControlsProps) {
  if (!glazewm) return null;

  const workspaceOnClick = (workspace: Workspace) => {
    glazewm.runCommand(`focus --workspace ${workspace.name}`);
  };

  return (
    <Chip>
      <div className="flex items-center gap-1.5">
        <AnimatePresence>
          {glazewm.currentWorkspaces?.map((workspace, idx) => {
            const isFocused = workspace.hasFocus;

            return (
              <motion.div
                key={workspace.name}
                className={cn(
                  buttonStyles,
                  "rounded-full cursor-pointer",
                  isFocused &&
                    "bg-gradient-to-r from-background-subtle/80 via-background-subtle/90 to-background-subtle border border-white/10"
                )}
                initial={{ opacity: 0, padding: "4.5px 4.5px" }}
                animate={{
                  opacity: 1,
                  padding: isFocused ? "4.5px 11px" : "4.5px 4.5px",
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.2,
                }}
                onClick={() => workspaceOnClick(workspace)}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </Chip>
  );
}
