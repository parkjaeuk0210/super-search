import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles } from 'lucide-react';

interface NeuralSearchInputProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  isLoading?: boolean;
  autoFocus?: boolean;
  large?: boolean;
}

export function NeuralSearchInput({ 
  onSearch, 
  initialValue = '', 
  isLoading = false,
  autoFocus = true,
  large = true 
}: NeuralSearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setTimeout(() => onSearch(transcript), 100);
      };
      
      recognition.start();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative"
      >
        {/* Animated Background Glow */}
        <AnimatePresence>
          {(isFocused || isLoading) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 animate-pulse" />
              <div className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse animation-delay-300" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glass Morphism Container */}
        <div className="relative overflow-hidden rounded-full backdrop-blur-2xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl">
          {/* Holographic Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
            }}
            animate={{
              x: [-1000, 1000],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
          />

          <div className="relative flex items-center">
            {/* Animated Search Icon */}
            <motion.div
              className="absolute left-4 sm:left-6 pointer-events-none"
              animate={{
                rotate: isLoading ? 360 : 0,
                scale: isFocused ? 1.2 : 1,
              }}
              transition={{
                rotate: { duration: 2, repeat: isLoading ? Infinity : 0, ease: "linear" },
                scale: { duration: 0.2 }
              }}
            >
              <Search className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isFocused ? 'text-purple-400' : 'text-gray-400 dark:text-gray-500'
              } transition-colors`} />
            </motion.div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              placeholder="Ask anything... the AI awaits"
              className={`
                w-full bg-transparent outline-none transition-all duration-300
                ${large 
                  ? 'pl-14 sm:pl-16 pr-28 sm:pr-32 py-4 sm:py-6 text-base sm:text-xl' 
                  : 'pl-12 pr-24 py-3 text-sm sm:text-base'
                }
                text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              autoFocus={autoFocus}
            />

            {/* Action Buttons */}
            <div className="absolute right-2 sm:right-3 flex items-center gap-1 sm:gap-2">
              {/* Voice Search Button */}
              <motion.button
                type="button"
                onClick={startVoiceSearch}
                disabled={isLoading || isListening}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-2 sm:p-3 rounded-full transition-all duration-300
                  ${isListening 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-gray-300'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <AnimatePresence mode="wait">
                  {isListening ? (
                    <motion.div
                      key="listening"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mic"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!query.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative p-2 sm:p-3 rounded-full overflow-hidden transition-all duration-300
                  ${query.trim() && !isLoading
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }
                  disabled:cursor-not-allowed
                `}
              >
                {/* Animated Background */}
                {query.trim() && !isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    animate={{
                      x: [0, 100, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                
                <motion.div
                  className="relative z-10"
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-1 origin-left"
            >
              <div className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-shimmer" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Particles */}
      {isFocused && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * 100 - 50,
                y: 0,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                left: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>
      )}
    </form>
  );
}