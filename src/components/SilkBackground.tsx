
import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const SilkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = usePortfolio();
  const { backgroundSettings } = data;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += backgroundSettings.speed * 0.01;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `${backgroundSettings.color}20`);
      gradient.addColorStop(0.5, `${backgroundSettings.color}10`);
      gradient.addColorStop(1, `${backgroundSettings.color}20`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create silk-like flowing waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `${backgroundSettings.color}${Math.floor(30 + i * 10).toString(16)}`;
        ctx.lineWidth = 2 + i;
        
        const offset = i * 100;
        const waveHeight = 50 * backgroundSettings.scale;
        const frequency = 0.01 * backgroundSettings.scale;
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin((x + offset) * frequency + time + backgroundSettings.rotation) * waveHeight +
            Math.sin((x + offset) * frequency * 2 + time * 1.5) * (waveHeight * 0.5) +
            (Math.random() - 0.5) * backgroundSettings.noise * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [backgroundSettings]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
    />
  );
};

export default SilkBackground;
