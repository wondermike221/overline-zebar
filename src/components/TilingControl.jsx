import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./ui/Button";

export function TilingControl({ output }) {
  if (!output.glazewm) return null;

  return (
    <>
      {output.glazewm.bindingModes.map((bindingMode) => (
        <Button key={bindingMode.name}>
          {bindingMode.displayName ?? bindingMode.name}
        </Button>
      ))}

      <Button
        className="h-full"
        onClick={() => output.glazewm.runCommand("toggle-tiling-direction")}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 text-text transition duration-200 ease-in-out",
            output.glazewm.tilingDirection === "vertical" ? "rotate-90" : ""
          )}
        />
      </Button>
    </>
  );
}
