import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';
import { NeuralSearchInput } from '@/components/NeuralSearchInput';
import { NeuralBackground } from '@/components/NeuralBackground';

export function Home() {
  const [, setLocation] = useLocation();

  const handleSearch = (query: string) => {
    setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Neural Background */}
      <NeuralBackground />
      
      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4 z-20"
      >
        <ThemeToggle />
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Logo with glow effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full" />
            <Logo className="relative" />
          </motion.div>
          
          {/* Title with gradient animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-5xl font-bold text-center mb-3"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient bg-300%">
              What do you want to know?
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            AI-powered search with real-time web intelligence
          </motion.p>
        </motion.div>
        
        {/* Neural Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <NeuralSearchInput onSearch={handleSearch} />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Powered by Gemini 2.0</span>
          </div>
          <div>
            Created by{' '}
            <a 
              href="http://x.com/ammaar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              @ammaar
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Floating suggestion chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center max-w-2xl px-4"
      >
        {[
          "What is quantum computing?",
          "Explain AI like I'm five",
          "Latest in space exploration",
          "How does blockchain work?"
        ].map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSearch(suggestion)}
            className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md
                     border border-white/20 dark:border-white/10 text-sm
                     hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300
                     text-gray-700 dark:text-gray-300"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
