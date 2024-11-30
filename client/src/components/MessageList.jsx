import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';

export function MessageList({ messages = [] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Supporters</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {messages.map((memo, index) => (
          <motion.div
            key={`${memo.from}-${memo.timestamp}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{memo.name}</h3>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(memo.timestamp * 1000).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{memo.message}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  From: {memo.from}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}