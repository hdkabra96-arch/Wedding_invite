import { useEffect, useRef, useState } from 'react';

export default function ScratchCard({ revealDate }: { revealDate: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the gold foil layer
    ctx.fillStyle = '#D4AF37'; // gold
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add a subtle texture/pattern overlay to look more like foil
    for(let i=0; i<1000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#e8c456' : '#c29a23';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Add text over foil
    ctx.fillStyle = '#111111'; // charcoal
    ctx.font = '600 20px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to Reveal Date', canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (e: any) => {
    if (!isDrawing || isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    // Handle touch vs mouse coordinates
    if (e.type.includes('touch') && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 'destination-out' erases the existing canvas content where drawn
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    // Check progress randomly to save performance on every pixel move
    if (Math.random() > 0.85) {
      checkProgress(ctx, canvas.width, canvas.height);
    }
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const imageData = ctx.getImageData(0, 0, w, h);
    let transparent = 0;
    const totalPixels = w * h;
    
    // Check alpha channel (4th value in rgba array)
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }
    
    // If > 50% scratched, auto reveal the rest
    if (transparent / totalPixels > 0.5) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-36 mt-8 rounded-xl overflow-hidden border border-gold/40 flex items-center justify-center bg-charcoal/80 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
      
      {/* The revealed content beneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-0">
        {revealDate}
      </div>

      {/* The scratchable canvas overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={384}
          height={144}
          className="absolute inset-0 z-10 w-full h-full touch-none cursor-crosshair transition-opacity duration-1000"
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={scratch}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={scratch}
        />
      )}

      {/* Quick reveal fallback button for accessibility */}
      {!isRevealed && (
        <button
          onClick={() => setIsRevealed(true)}
          className="absolute bottom-2 right-2 z-20 text-[10px] uppercase tracking-widest text-charcoal bg-gold/80 px-2 py-1 rounded opacity-60 hover:opacity-100 transition-opacity"
        >
          Quick Reveal
        </button>
      )}
    </div>
  );
}
