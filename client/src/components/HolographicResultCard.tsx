import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Bookmark, Share2, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Source {
  title: string;
  url: string;
  snippet: string;
}

interface HolographicResultCardProps {
  summary: string;
  sources: Source[];
  index: number;
}

export function HolographicResultCard({ summary, sources, index }: HolographicResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mb-8"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-xl" />
      </motion.div>

      {/* Glass Card */}
      <motion.div
        className="relative backdrop-blur-xl bg-white/5 dark:bg-black/20 rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5"
        whileHover={{
          borderColor: "rgba(139, 92, 246, 0.3)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Holographic Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
          }}
          transition={{
            opacity: { duration: 0.3 },
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={isHovered ? {
              x: [-300, 300],
            } : {}}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* AI Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-gray-500 dark:text-gray-400">AI Summary</span>
            </div>
            <div 
              className="text-gray-700 dark:text-gray-200 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </motion.div>

          {/* Sources */}
          {sources.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Verified Sources</span>
              </div>
              
              <div className="grid gap-3">
                {sources.map((source, sourceIndex) => (
                  <motion.div
                    key={sourceIndex}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 + sourceIndex * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="group relative"
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5
                               hover:bg-white/10 dark:hover:bg-black/20 hover:border-purple-500/30
                               transition-all duration-300"
                      onMouseEnter={() => setSelectedSource(sourceIndex)}
                      onMouseLeave={() => setSelectedSource(null)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {source.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {source.snippet}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {new URL(source.url).hostname}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: selectedSource === sourceIndex ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                        </motion.div>
                      </div>
                    </a>

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                      animate={{
                        opacity: selectedSource === sourceIndex ? 0.2 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="flex items-center gap-3 pt-4 border-t border-white/10 dark:border-white/5"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 ml-auto"
            >
              Explore More
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Particles on Hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              style={{
                left: `${30 + i * 20}%`,
                bottom: 0,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}