import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { buttonStyles } from "./ui/Button";

export function WorkspaceControls({ output }) {
  if (!output) return null;

  const workspaceOnClick = (workspace) => {
    output.glazewm.runCommand(`focus --workspace ${workspace.name}`);
  };

  return (
    <div className="flex items-center gap-2 mt-[0.5px]">
      <AnimatePresence>
        {output.glazewm?.currentWorkspaces?.map((workspace) => {
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
              initial={{ opacity: 0, padding: "6px 6px" }}
              animate={{
                opacity: 1,
                padding: isFocused ? "5px 12px" : "5px 5px",
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
  );
}
