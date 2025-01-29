import { Eye } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { IconButton } from "../IconButton";
import { CommandProps } from "./types/command";

export const Transparency = ({ glazewm }: CommandProps) => {
  const command = "set-transparency --opacity 100";
  const tooltipText = "Temporarily make window 100% visible";

  return (
    <IconButton
      key={command}
      title={tooltipText}
      onClick={() => glazewm?.runCommand(command)}
      icon={Eye}
    />
  );
};
