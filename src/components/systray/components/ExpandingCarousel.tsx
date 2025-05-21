import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';

interface ExpandingCarouselProps {
  items: ReactElement[];
  expanded: boolean;
  visibleCount?: number;
  itemWidth?: number;
  gap?: number;
}

const springConfig = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
  mass: 0.8,
};

export const ExpandingCarousel: React.FC<ExpandingCarouselProps> = ({
  items,
  expanded,
  visibleCount = 4,
  itemWidth = 128,
  gap = 8,
}) => {
  const totalItems = items.length;

  const fullWidth = totalItems * itemWidth + (totalItems - 1) * gap;
  const visibleWidth = visibleCount * itemWidth + (visibleCount - 1) * gap;

  const startIndex = Math.max(0, Math.floor((totalItems - visibleCount) / 2));
  const initialOffset = -(startIndex * (itemWidth + gap));

  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={false}
        className="relative overflow-hidden"
        animate={{ width: expanded ? fullWidth : visibleWidth }}
        transition={springConfig}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: expanded ? 0 : initialOffset }}
          transition={springConfig}
        >
          <AnimatePresence mode="wait">
            {items.map((item, index) => (
              <motion.div
                key={item.key}
                className="flex-shrink-0"
                style={{ width: itemWidth }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.8, scale: 1 }}
                whileHover={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  ...springConfig,
                  delay: index * 0.09,
                }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

