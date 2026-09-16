import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center my-12 max-w-lg mx-auto">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map(block => (
        <div key={block.label} className="bg-charcoal/80 backdrop-blur-sm border border-gold/30 rounded-xl p-3 sm:p-5 shadow-lg shadow-gold/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="font-serif text-3xl sm:text-5xl text-gold relative z-10">
            {block.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-gold-light mt-2 uppercase tracking-[0.2em] relative z-10">
            {block.label}
          </div>
        </div>
      ))}
    </div>
  );
}
