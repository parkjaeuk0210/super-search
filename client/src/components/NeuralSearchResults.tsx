import { useEffect, useRef } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicResultCard } from '@/components/HolographicResultCard';

interface SearchResultsProps {
  query: string;
  results: any;
  isLoading: boolean;
  error?: Error;
  isFollowUp?: boolean;
  originalQuery?: string;
}

export function NeuralSearchResults({ 
  query,
  results,
  isLoading,
  error,
  isFollowUp,
  originalQuery
}: SearchResultsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert variant="destructive" className="backdrop-blur-xl bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'An error occurred while searching. Please try again.'}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        {/* Neural Loading Animation */}
        <div className="relative">
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-purple-600/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 w-24 h-24 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-2 w-20 h-20 rounded-full border-4 border-pink-600/20"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute inset-2 w-20 h-20 rounded-full border-4 border-b-pink-600 border-t-transparent border-r-transparent border-l-transparent"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-4 w-16 h-16 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-8 h-8 text-purple-600" />
          </motion.div>
        </div>
        
        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI is thinking...
          </h3>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Searching across the web and processing information
          </motion.p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-600"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div ref={contentRef} className="space-y-8">
      {/* Query Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        {isFollowUp && originalQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Following up on: "{originalQuery}"
            </span>
          </motion.div>
        )}
        
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-2xl sm:text-3xl font-bold"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            {isFollowUp ? 'Follow-up: ' : ''}"{query}"
          </span>
        </motion.h1>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        <motion.div
          key={query}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-4xl mx-auto"
        >
          <HolographicResultCard
            summary={results.summary}
            sources={results.sources || []}
            index={0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Results Metadata */}
      {results.sources && results.sources.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center justify-center gap-4">
            <span>Found {results.sources.length} sources</span>
            <span>•</span>
            <span>AI confidence: High</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real-time data
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}