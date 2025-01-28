import { cn } from "../../utils/cn";

export const buttonStyles = `bg-background-subtle/10 border-text/5 border h-full px-1 rounded-md drop-shadow-md
   hover:bg-background-subtle/15 hover:border-text/10
   active:border-text/10 active:bg-background-deeper
   transition-colors ease-in-out duration-200
  `;

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
