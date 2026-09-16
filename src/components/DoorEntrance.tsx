import { motion } from 'motion/react';

export default function DoorEntrance({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-charcoal transition-opacity duration-1000 ${
        isOpen ? 'opacity-0 pointer-events-none delay-1000' : 'opacity-100'
      }`}
      style={{ perspective: '1500px' }}
    >
      <div className="relative w-full max-w-[90vw] md:max-w-2xl h-[75vh] flex preserve-3d px-4 sm:px-0">
        
        {/* Left Door */}
        <div
          className="w-1/2 h-full bg-charcoal border-4 border-r-2 border-gold rounded-tl-full origin-left transition-transform duration-[1500ms] ease-in-out relative flex items-center justify-end overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
          style={{ transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)' }}
        >
          {/* Inner arch detail */}
          <div className="absolute inset-0 border-[8px] sm:border-[16px] border-gold/10 rounded-tl-full m-3 sm:m-6 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_80%)] opacity-5 pointer-events-none" />
          
          {/* Left Handle */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-gold mr-3 sm:mr-6 relative z-10 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
             <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-gold/50" />
          </div>
        </div>

        {/* Right Door */}
        <div
          className="w-1/2 h-full bg-charcoal border-4 border-l-2 border-gold rounded-tr-full origin-right transition-transform duration-[1500ms] ease-in-out relative flex items-center justify-start overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
          style={{ transform: isOpen ? 'rotateY(110deg)' : 'rotateY(0deg)' }}
        >
          {/* Inner arch detail */}
          <div className="absolute inset-0 border-[8px] sm:border-[16px] border-gold/10 rounded-tr-full m-3 sm:m-6 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_80%)] opacity-5 pointer-events-none" />
          
          {/* Right Handle */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-gold ml-3 sm:ml-6 relative z-10 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-gold/50" />
          </div>
        </div>

        {/* Tap to Open Prompt */}
        {!isOpen && (
          <motion.button
            onClick={onOpen}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-gold font-serif text-lg sm:text-2xl px-8 py-4 border border-gold rounded-full bg-charcoal/90 backdrop-blur-md cursor-pointer whitespace-nowrap shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            animate={{
              boxShadow: [
                '0px 0px 0px rgba(212,175,55,0)',
                '0px 0px 30px rgba(212,175,55,0.5)',
                '0px 0px 0px rgba(212,175,55,0)'
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Tap to Open
          </motion.button>
        )}
      </div>
    </div>
  );
}
