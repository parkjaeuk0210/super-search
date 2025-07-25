import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

interface NeuralFollowUpInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export function NeuralFollowUpInput({ onSubmit, isLoading }: NeuralFollowUpInputProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-500" />
          Ask a follow-up question
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Continue the conversation with AI
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            animate={{
              opacity: isFocused ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-xl" />
          </motion.div>

          {/* Input Container */}
          <div className="relative rounded-2xl backdrop-blur-xl bg-white/5 dark:bg-black/10 border border-white/20 dark:border-white/5 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
              }}
              animate={isFocused ? {
                x: [-1000, 1000],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
                placeholder="What else would you like to know?"
                className="w-full bg-transparent outline-none px-6 py-4 pr-16
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <motion.button
                type="submit"
                disabled={!query.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  absolute right-3 p-2.5 rounded-xl transition-all duration-300
                  ${query.trim() && !isLoading
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }
                  disabled:cursor-not-allowed
                `}
              >
                <motion.div
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </form>

      {/* Suggested Follow-ups */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Try:</span>
        {[
          "Tell me more",
          "Can you explain that differently?",
          "What are the implications?",
          "Show me examples"
        ].map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuery(suggestion);
              setTimeout(() => onSubmit(suggestion), 100);
            }}
            className="px-3 py-1 text-xs rounded-full bg-white/5 dark:bg-black/10 
                     border border-white/10 dark:border-white/5
                     hover:bg-white/10 dark:hover:bg-black/20 
                     text-gray-600 dark:text-gray-400 transition-all duration-300"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}