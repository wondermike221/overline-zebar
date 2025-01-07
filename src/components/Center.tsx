import { motion } from "framer-motion";

export function Center({ children }) {
  return (
    <motion.div
      className="flex gap-3 items-center h-full transition-all ease-in-out"
      layout="position"
    >
      {children}
    </motion.div>
  );
}
