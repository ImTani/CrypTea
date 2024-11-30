import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function Card({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6',
        'border border-gray-100 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}