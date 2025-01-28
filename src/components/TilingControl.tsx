import { ChevronRight, Search } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./common/Button";
import { GlazeWmOutput } from "zebar";
import { motion, AnimatePresence } from "framer-motion";

interface TilingControlProps {
  glazewm: GlazeWmOutput | null;
}

const FLOW_LAUNCHER_PATH =
  "C:\\Users\\msy\\AppData\\Local\\FlowLauncher\\Flow.Launcher.exe";

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
          >
            <Button>{bindingMode.displayName ?? bindingMode.name}</Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        className="px-2"
        onClick={() => glazewm.runCommand(`shell-exec ${FLOW_LAUNCHER_PATH}`)}
      >
        <Search strokeWidth={3} className="h-3 w-3" />
      </Button>

      <Button
        className="h-full"
        onClick={() => glazewm.runCommand("toggle-tiling-direction")}
      >
        <ChevronRight
          className={cn(
            "h-3 w-4 text-text transition duration-200 ease-in-out",
            glazewm.tilingDirection === "vertical" ? "rotate-90" : ""
          )}
          strokeWidth={3}
        />
      </Button>
    </>
  );
}
