import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random ambient sparkles once mounted
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
