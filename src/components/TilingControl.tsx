import { ChevronRight, Search } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./common/Button";
import { GlazeWmOutput } from "zebar";
import { motion, AnimatePresence } from "framer-motion";

interface TilingControlProps {
  glazewm: GlazeWmOutput | null;
}

// Try to get the Flow Launcher path from environment variables, or use a default path
const getFlowLauncherPath = () => {
  // First check if the environment variable is available
  if (import.meta.env.VITE_FLOW_LAUNCHER_PATH) {
    return import.meta.env.VITE_FLOW_LAUNCHER_PATH;
  }

  // Default paths based on OS
  // For Windows (most common Flow Launcher location)
  const defaultWindowsPath =
    "C:\\Program Files\\FlowLauncher\\Flow.Launcher.exe";
  const appDataPath =
    "C:\\Users\\%USERNAME%\\AppData\\Local\\FlowLauncher\\Flow.Launcher.exe";

  // Return the default path (users can customize this in their own builds)
  return defaultWindowsPath;
};

const FLOW_LAUNCHER_PATH = getFlowLauncherPath();

export function TilingControl({ glazewm }: TilingControlProps) {
  if (!glazewm) return null;

  return (
    <>
      <AnimatePresence>
        {glazewm.bindingModes.map((bindingMode) => (
          <motion.div
            key={bindingMode.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <Button>{bindingMode.displayName ?? bindingMode.name}</Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        onClick={() => {
          if (FLOW_LAUNCHER_PATH) {
            glazewm.runCommand(`shell-exec ${FLOW_LAUNCHER_PATH}`);
          } else {
            console.warn(
              "Flow Launcher path not configured. Set VITE_FLOW_LAUNCHER_PATH in .env file."
            );
          }
        }}
      >
        <Search strokeWidth={3} className="h-3 w-3" />
      </Button>

      <Button onClick={() => glazewm.runCommand("toggle-tiling-direction")}>
        <ChevronRight
          className={cn(
            "h-3 w-3 transition-transform duration-200 ease-in-out",
            glazewm.tilingDirection === "vertical" ? "rotate-90" : ""
          )}
          strokeWidth={3}
        />
      </Button>
    </>
  );
}
