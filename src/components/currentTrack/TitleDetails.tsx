import { AnimatePresence, MotionProps, motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "../../utils/cn";
import useMeasure from "react-use-measure";

export function TitleDetails({
  title,
  artist,
  expanded,
}: {
  title: string | null | undefined;
  artist: string | null | undefined;
  expanded: boolean;
}) {
  return (
    <div
      className={cn(
        !title && !artist
          ? "invisible"
          : "inline-flex items-center gap-1.5 cursor-pointer outline-none"
      )}
    >
      <MotionText expanded={expanded} className={cn("whitespace-nowrap")}>
        {artist}
      </MotionText>
      <p>{"-"}</p>
      <MotionText expanded={expanded} className={cn("whitespace-nowrap")}>
        {title}
      </MotionText>
    </div>
  );
}

const defaultExpansionTransition: MotionProps["transition"] = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

const MotionText = ({
  children,
  className,
  transition = defaultExpansionTransition,
  expanded,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  transition?: MotionProps["transition"];
  expanded: boolean;
} & MotionProps) => {
  let [ref, { width }] = useMeasure();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.p
        className={cn("whitespace-nowrap overflow-hidden truncate", className)}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        key={JSON.stringify(children, ignoreCircularReferences())}
        exit={{
          opacity: 0,
        }}
        transition={{
          ...transition,
          opacity: { duration: 0.3 },
        }}
        {...props}
      >
        {children}
      </motion.p>
    </AnimatePresence>
  );
};

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
