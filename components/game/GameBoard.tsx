'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Player, Board, GameState } from './types';
import { WINNING_COMBINATIONS } from './types';
import { ScoreBoard } from './ScoreBoard';

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: '🚀',
    winner: null,
    winningLine: null
  });

  const [scores, setScores] = useState({
    '🚀': 0,
    '👾': 0,
  });

  const checkWinner = useCallback((board: Board): [Player | 'draw' | null, number[] | null] => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [board[a] as Player, combo];
      }
    }
    return [board.every(cell => cell !== null) ? 'draw' : null, null];
  }, []);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const [winner, winningLine] = checkWinner(newBoard);

    if (winner && winner !== 'draw') {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));

      // Delay the winning animation until the last icon appears
      setTimeout(() => {
        winningLine?.forEach(idx => {
          const emoji = document.querySelector(`[data-cell-index="${idx}"] .game-emoji`);
          if (emoji) {
            emoji.classList.add('winner-animation');
          }
        });
      }, 300); // Wait for the icon scale animation to complete

      toast(
        `Winner: ${winner} ${winner === '🚀' ? 'Rocket wins!' : 'Alien wins!'}`,
        {
          duration: 3000,
          className: 'winner-toast'
        }
      );
    } else if (winner === 'draw') {
      toast("It's a draw! 🤝", {
        duration: 3000,
      });
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === '🚀' ? '👾' : '🚀',
      winner,
      winningLine
    });
  };

  const resetGame = () => {
    // Remove winner animations from all cells
    document.querySelectorAll('.game-emoji').forEach(emoji => {
      emoji.classList.remove('winner-animation');
    });

    setGameState({
      board: Array(9).fill(null),
      currentPlayer: '🚀',
      winner: null,
      winningLine: null
    });
    toast('New game started! 🎮');
  };

  const resetAll = () => {
    // Reset scores
    setScores({ '🚀': 0, '👾': 0 });
    // Reset game state
    document.querySelectorAll('.game-emoji').forEach(emoji => {
      emoji.classList.remove('winner-animation');
    });
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: '🚀',
      winner: null,
      winningLine: null
    });
    toast('Game and scores reset! 🔄');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg mx-auto p-4 min-h-[calc(100vh-2rem)]">
      <div className="text-center space-y-2">
        <motion.h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Space Battle Tic Tac Toe
        </motion.h1>
        <p className="text-2xl text-slate-100" role="status" aria-live="polite">
          Current Player: {' '}
          <motion.span
            key={gameState.currentPlayer}
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="game-emoji inline-block"
          >
            {gameState.currentPlayer}
          </motion.span>
        </p>
      </div>

      <ScoreBoard scores={scores} currentPlayer={gameState.currentPlayer} />

      <Card className="w-full aspect-square p-4 bg-black/40">
        <div className="grid grid-cols-3 gap-4 h-full">
          <AnimatePresence mode="wait">
            {gameState.board.map((cell, index) => (
              <motion.div
                key={index}
                role="gridcell"
                className="game-cell-wrapper"
                whileHover={{ scale: gameState.board[index] ? 1 : 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={() => handleCellClick(index)}
                  disabled={!!gameState.board[index] || !!gameState.winner}
                  data-cell-index={index}
                  data-player={cell}
                  className={`game-cell w-full h-full ${
                    gameState.winningLine?.includes(index) ? 'winner-cell' : ''
                  } ${cell === '🚀' ? 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30' : 
                     cell === '👾' ? 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30' : 
                     'hover:bg-white/10 border-white/20'}`}
                  aria-label={`Cell ${index + 1}, ${cell || 'empty'}`}
                >
                  {cell && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        filter: gameState.winningLine?.includes(index) 
                          ? ["brightness(1.2)", "brightness(2)", "brightness(1.2)"] 
                          : "brightness(1)"
                      }}
                      transition={{ 
                        duration: 0.3,
                        filter: {
                          duration: 1,
                          repeat: gameState.winningLine?.includes(index) ? Infinity : 0,
                          ease: "easeInOut"
                        }
                      }}
                      className={`game-emoji text-5xl ${
                        gameState.winningLine?.includes(index) 
                          ? 'text-white drop-shadow-glow' 
                          : ''
                      }`}
                    >
                      {cell}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      <motion.div 
        className="flex justify-center items-center gap-4 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={resetGame}
            className="w-full max-w-[145px] bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 text-slate-100 font-semibold text-base py-6"
            variant="outline"
            size="lg"
          >
            🎮 New Game
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={resetAll}
            className="w-full max-w-[145px] bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30 text-slate-100 font-semibold text-base py-6"
            variant="outline"
            size="lg"
          >
            🔄 Reset All
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}