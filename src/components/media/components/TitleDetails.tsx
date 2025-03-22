import { AnimatePresence, MotionProps, motion } from "framer-motion";
import React from "react";
import { cn } from "../../../utils/cn";

export function TitleDetails({
  title,
  artist,
}: {
  title: string | null | undefined;
  artist: string | null | undefined;
}) {
  const artistKey = artist ?? undefined;
  const titleKey = title ?? undefined;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 cursor-pointer outline-none"
      )}
    >
      <AnimatePresence mode="popLayout" key={artistKey}>
        <MotionText key={artistKey}>{artist}</MotionText>
      </AnimatePresence>

      {artist && title && <p>{"-"}</p>}
      <AnimatePresence mode="popLayout" key={titleKey}>
        <MotionText key={titleKey}>{title}</MotionText>
      </AnimatePresence>
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
  key,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  key?: string;
  transition?: MotionProps["transition"];
} & MotionProps) => {
  return (
    <motion.p
      className={cn("whitespace-nowrap overflow-hidden truncate", className)}
      key={key}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
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
  );
};
