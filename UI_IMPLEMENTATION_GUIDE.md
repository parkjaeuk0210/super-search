# 🚀 UI 구현 가이드

## 즉시 구현 가능한 컴포넌트

### 1. Neural Search Input (즉시 구현 가능)

```tsx
// components/NeuralSearchInput.tsx
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export const NeuralSearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
    >
      {/* Glowing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: isFocused ? 1 : 0,
        }}
        style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe)',
          backgroundSize: '400% 400%',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Glass Morphism Container */}
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-full p-1">
        <div className="relative flex items-center">
          {/* Animated Search Icon */}
          <motion.div
            className="absolute left-6 text-white/60"
            animate={{
              rotate: isFocused ? 360 : 0,
              scale: isFocused ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <SearchIcon />
          </motion.div>
          
          {/* Input Field */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-16 pr-32 py-6 text-xl bg-transparent text-white placeholder-white/40 focus:outline-none"
            placeholder="Ask the future..."
          />
          
          {/* Voice & Send Buttons */}
          <div className="absolute right-4 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20"
            >
              <MicIcon />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <SendIcon />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Particle Effect on Focus */}
      {isFocused && <ParticleField />}
    </motion.div>
  );
};
```

### 2. Holographic Result Card

```tsx
// components/HolographicCard.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const HolographicCard = ({ result }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative"
      whileHover={{ z: 50 }}
    >
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-xl" />
      
      {/* Glass Card */}
      <motion.div
        className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
        whileHover={{
          borderColor: "rgba(255, 255, 255, 0.3)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Holographic Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
          }}
          animate={{
            x: [-200, 200],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
        
        {/* Content Layers */}
        <div className="relative z-10 space-y-6">
          {/* Source Info */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <SourceIcon />
              </div>
              <div>
                <h3 className="text-white font-semibold">{result.source.title}</h3>
                <p className="text-white/60 text-sm">{result.source.domain}</p>
              </div>
            </div>
            <TrustScore score={result.trustScore} />
          </motion.div>
          
          {/* Content Preview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/80 leading-relaxed">{result.summary}</p>
          </motion.div>
          
          {/* Interactive Actions */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ActionButton icon={<SaveIcon />} label="Save" />
            <ActionButton icon={<ShareIcon />} label="Share" />
            <ActionButton icon={<ExpandIcon />} label="Expand" primary />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

### 3. AI Thinking Visualization

```tsx
// components/AIThinkingVisualization.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export const AIThinkingVisualization = ({ isThinking }) => {
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, []);
  
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Neural Nodes */}
        {nodes.map((node, i) => (
          <NeuralNode
            key={i}
            position={node.position}
            scale={node.scale}
            active={isThinking}
          />
        ))}
        
        {/* Connections */}
        {isThinking && (
          <ConnectionLines nodes={nodes} />
        )}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

const NeuralNode = ({ position, scale, active }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (active && meshRef.current) {
      meshRef.current.scale.setScalar(
        scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      );
    }
  });
  
  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 16, 16]} scale={scale}>
      <meshStandardMaterial
        color={active ? "#8b5cf6" : "#4c1d95"}
        emissive={active ? "#8b5cf6" : "#000000"}
        emissiveIntensity={active ? 0.5 : 0}
      />
    </Sphere>
  );
};
```

### 4. Liquid Loading Animation

```tsx
// components/LiquidLoader.tsx
export const LiquidLoader = ({ progress }) => {
  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* Liquid Fill */}
        <path
          d={`
            M 0,${200 - progress * 2}
            Q 50,${200 - progress * 2 + Math.sin(Date.now() / 1000) * 10} 100,${200 - progress * 2}
            T 200,${200 - progress * 2}
            L 200,200
            L 0,200
            Z
          `}
          fill="url(#gradient)"
          opacity="0.8"
        />
        
        {/* Glass Container */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
      </svg>
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
};
```

### 5. Dynamic Background

```css
/* styles/neural-background.css */
.neural-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(to bottom, #0a0a0a, #1a0a2a);
  overflow: hidden;
}

.neural-background::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(
    circle at 20% 50%,
    rgba(139, 92, 246, 0.3) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 80%,
    rgba(236, 72, 153, 0.3) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 40% 20%,
    rgba(59, 130, 246, 0.3) 0%,
    transparent 50%
  );
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Particle Field */
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: float 10s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(10px) translateX(-10px); }
  75% { transform: translateY(-10px) translateX(20px); }
}
```

## 즉시 적용 가능한 개선사항

### 1. 기존 컴포넌트 업그레이드

```tsx
// 기존 SearchInput.tsx 개선
import { motion } from 'framer-motion';

// Glass morphism 효과 추가
const glassStyle = {
  backdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

// Hover 효과 강화
const hoverEffect = {
  scale: 1.02,
  boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.4)',
  borderColor: 'rgba(139, 92, 246, 0.5)',
};
```

### 2. 애니메이션 라이브러리 설정

```tsx
// utils/animations.ts
export const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};
```

### 3. 컬러 팔레트 시스템

```tsx
// theme/colors.ts
export const neuralColors = {
  primary: {
    purple: '#8b5cf6',
    pink: '#ec4899',
    blue: '#3b82f6',
  },
  gradient: {
    neural: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    holographic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    aurora: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 100%)',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
};
```

## 시작하기

1. **필요한 패키지 설치**
```bash
npm install three @react-three/fiber @react-three/drei gsap
```

2. **기본 구조 설정**
```bash
mkdir -p src/components/neural
mkdir -p src/utils/animations
mkdir -p src/styles/effects
```

3. **점진적 구현**
- Phase 1: Glass morphism과 gradient 효과 적용
- Phase 2: Framer Motion 애니메이션 강화
- Phase 3: 3D 요소 점진적 추가
- Phase 4: 인터랙션과 사운드 통합

## 성능 고려사항

- GPU 가속 활용 (transform, opacity)
- will-change 속성 신중히 사용
- requestAnimationFrame으로 애니메이션 최적화
- IntersectionObserver로 뷰포트 기반 렌더링
- 저사양 기기를 위한 prefers-reduced-motion 지원