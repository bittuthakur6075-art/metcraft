import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  style = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 35, x: 0 };
      case 'down': return { y: -35, x: 0 };
      case 'left': return { x: 35, y: 0 };
      case 'right': return { x: -35, y: 0 };
      case 'none': return { x: 0, y: 0 };
    }
  };

  const initial = { opacity: 0, ...getInitialPosition() };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};
