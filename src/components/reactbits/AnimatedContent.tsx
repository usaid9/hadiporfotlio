import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  delay?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * reactbits-style AnimatedContent — fades/slides/scales children into view
 * on scroll. https://reactbits.dev/animations/animated-content
 */
export default function AnimatedContent({
  children,
  className = '',
  distance = 40,
  direction = 'vertical',
  reverse = false,
  duration = 0.7,
  delay = 0,
  scale = 0.98,
  threshold = 0.15,
  once = true,
}: AnimatedContentProps) {
  const axis = direction === 'vertical' ? 'y' : 'x';
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      initial={{ opacity: 0, scale, [axis]: offset }}
      whileInView={{ opacity: 1, scale: 1, [axis]: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
