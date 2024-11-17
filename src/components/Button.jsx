export function Button({ children, className, ...props }) {
  const baseClasses =
    "bg-background-subtle/10 border-text/5 border h-full px-1 hover:bg-background-subtle/80 rounded-sm transition-colors ease-in-out duration-200";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
