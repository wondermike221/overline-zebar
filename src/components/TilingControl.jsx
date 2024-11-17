import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./Button";

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
        {output.glazewm.tilingDirection === "horizontal" ? (
          <ChevronRight className="h-4 w-4 text-text" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text" />
        )}
      </Button>
    </>
  );
}
