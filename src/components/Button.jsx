import { cn } from "../utils/cn";

export const buttonStyles =
  "bg-background-subtle/10 border-text/5 border h-full px-1 hover:bg-background-subtle/80 rounded-sm transition-colors ease-in-out duration-200";

export function Button({ children, className, ...props }) {
  return (
    <button className={cn(buttonStyles, className)} {...props}>
      {children}
    </button>
  );
}
