import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./ui/Button";
import { GlazeWmOutput } from "zebar";

interface TilingControlProps {
  glazewm: GlazeWmOutput | null; 
}

export function TilingControl({ glazewm }: TilingControlProps) {
  if (!glazewm) return null;

  return (
    <>
      {glazewm.bindingModes.map((bindingMode) => (
        <Button key={bindingMode.name}>
          {bindingMode.displayName ?? bindingMode.name}
        </Button>
      ))}

      <Button
        className="h-full"
        onClick={() => glazewm.runCommand("toggle-tiling-direction")}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 text-text transition duration-200 ease-in-out",
            glazewm.tilingDirection === "vertical" ? "rotate-90" : ""
          )}
        />
      </Button>
    </>
  );
}
