import { cn } from "../../utils/cn";

export const buttonStyles =
  "bg-background-subtle/10 border-text/5 border h-full px-1 hover:bg-background-subtle/80 rounded-md transition-colors ease-in-out duration-200 drop-shadow-md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonStyles, className)} {...props}>
      {children}
    </button>
  );
}
