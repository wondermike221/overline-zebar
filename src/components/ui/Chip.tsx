import { cn } from "../../utils/cn";

interface ChipProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
}

export function Chip({ className, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2.5 py-3 bg-background-deeper/50 rounded-lg border border-app-border/30 h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
