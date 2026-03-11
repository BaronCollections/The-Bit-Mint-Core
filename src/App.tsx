import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

type State = 'idle' | 'aggregating' | 'formed';

const Particles = ({ state }: { state: State }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 250;
      return {
        id: i,
        type: i % 2 === 0 ? 'life' : 'bit', // life = green circle, bit = gray square
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <AnimatePresence>
        {state !== 'formed' && particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute ${
              p.type === 'life' ? 'bg-[#6DB578] rounded-full' : 'bg-gray-400 rounded-sm'
            }`}
            style={{ width: p.size, height: p.size }}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={
              state === 'idle'
                ? {
                    x: [p.x, p.x + (Math.random() - 0.5) * 40, p.x],
                    y: [p.y, p.y + (Math.random() - 0.5) * 40, p.y],
                    opacity: [0, 0.5, 0],
                  }
                : {
                    x: 0,
                    y: 0,
                    scale: 0.2,
                    opacity: 1,
                  }
            }
            exit={{ opacity: 0, scale: 0 }}
            transition={
              state === 'idle'
                ? {
                    repeat: Infinity,
                    duration: p.duration,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }
                : {
                    duration: 0.5 + Math.random() * 0.4,
                    ease: 'backIn',
                  }
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const MintLogo = ({ state }: { state: State }) => {
  return (
    <motion.div
      className="absolute flex items-center justify-center w-48 h-48 z-20"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={
        state === 'formed'
          ? { 
              scale: [0.5, 1.15, 0.95, 1.05, 1], 
              opacity: 1 
            }
          : { scale: 0.5, opacity: 0 }
      }
      transition={{ 
        duration: 1.2, 
        times: [0, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut" 
      }}
    >
      {/* Glassmorphic Square (Bit Square) */}
      <div className="absolute inset-0 rounded-[2rem] border-2 border-white/80 bg-white/30 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center overflow-hidden">
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />

        {/* Mint Leaf */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-24 h-24 -rotate-12 relative z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            state === 'formed'
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
        >
          {/* Leaf Base */}
          <motion.path
            d="M 50 10 C 80 40, 80 70, 50 90 C 20 70, 20 40, 50 10 Z"
            fill="#6DB578"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={
              state === 'formed'
                ? { pathLength: 1, fillOpacity: 1 }
                : { pathLength: 0, fillOpacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* Leaf Veins (Negative Space effect using white lines) */}
          <motion.path
            d="M 50 85 Q 50 50 50 15 M 50 65 Q 65 55 70 45 M 50 65 Q 35 55 30 45 M 50 45 Q 60 35 65 25 M 50 45 Q 40 35 35 25"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              state === 'formed'
                ? { pathLength: 1, opacity: 0.9 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [state, setState] = useState<State>('idle');

  const handleAction = () => {
    if (state === 'idle') {
      setState('aggregating');
      setTimeout(() => {
        setState('formed');
      }, 900); // Wait for particles to rush in
    } else if (state === 'formed') {
      setState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col items-center justify-center overflow-hidden relative font-sans text-gray-800">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Main Interactive Area */}
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        
        <Particles state={state} />
        
        {/* Magnetic Core (appears during aggregating) */}
        <AnimatePresence>
          {state === 'aggregating' && (
            <motion.div
              className="absolute w-20 h-20 border-2 border-gray-300 rounded-2xl z-10"
              initial={{ opacity: 0, scale: 2, rotate: 45 }}
              animate={{ opacity: 1, scale: 0.2, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "circIn" }}
            />
          )}
        </AnimatePresence>

        <MintLogo state={state} />
      </div>

      {/* UI Controls & Text */}
      <div className="mt-8 flex flex-col items-center gap-8 z-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">比特薄荷芯</h1>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            营养被精准包装，AI 的核心算法里装着对自然的尊重。
          </p>
        </div>

        <motion.button
          onClick={handleAction}
          disabled={state === 'aggregating'}
          className={`px-8 py-4 rounded-full font-medium text-lg tracking-wide transition-all shadow-lg flex items-center gap-3 ${
            state === 'formed' 
              ? 'bg-white text-[#6DB578] border border-[#6DB578]/20 hover:bg-gray-50 hover:shadow-xl' 
              : 'bg-[#141414] text-white hover:bg-black hover:shadow-xl hover:shadow-black/20'
          } ${state === 'aggregating' ? 'opacity-80 cursor-not-allowed' : ''}`}
          whileHover={state !== 'aggregating' ? { scale: 1.02 } : {}}
          whileTap={state !== 'aggregating' ? { scale: 0.98 } : {}}
        >
          {state === 'formed' ? (
            <>
              <Check size={20} />
              打卡成功 (Reset)
            </>
          ) : (
            <>
              <Sparkles size={20} className={state === 'aggregating' ? 'animate-spin' : ''} />
              {state === 'aggregating' ? '汇聚中...' : '开始打卡'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
