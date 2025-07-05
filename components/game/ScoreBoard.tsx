'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  scores: {
    '🚀': number;
    '👾': number;
  };
  currentPlayer: '🚀' | '👾';
}

export function ScoreBoard({ scores, currentPlayer }: ScoreBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-[300px] p-4 shadow-xl bg-black/40 backdrop-blur-sm border-white/10">
        <motion.h2
          className="text-2xl font-bold mb-4 text-center title-gradient"
          animate={{
            textShadow: [
              '0 0 7px #fff',
              '0 0 10px #fff',
              '0 0 21px #fff',
              '0 0 42px #0fa',
              '0 0 7px #fff',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          Score
        </motion.h2>
        <div className="flex justify-between items-center px-8 gap-6">
          <motion.div
            className="text-center relative flex-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {currentPlayer === '🚀' && (
              <motion.div
                className="absolute -inset-2 border-2 border-blue-400/50 rounded-lg"
                layoutId="currentPlayer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <motion.span
              className="text-4xl filter drop-shadow-glow"
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              🚀
            </motion.span>
            <motion.p
              key={scores['🚀']}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold mt-2 text-slate-100"
            >
              {scores['🚀']}
            </motion.p>
          </motion.div>

          <motion.div
            className="text-2xl font-bold text-slate-100 px-4"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            vs
          </motion.div>

          <motion.div
            className="text-center relative flex-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {currentPlayer === '👾' && (
              <motion.div
                className="absolute -inset-2 border-2 border-purple-400/50 rounded-lg"
                layoutId="currentPlayer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <motion.span
              className="text-4xl filter drop-shadow-glow"
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              👾
            </motion.span>
            <motion.p
              key={scores['👾']}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold mt-2 text-slate-100"
            >
              {scores['👾']}
            </motion.p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}