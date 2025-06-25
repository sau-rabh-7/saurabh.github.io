
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const MouseBlob: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { data } = usePortfolio();
  const { mouseBlobSettings } = data;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - mouseBlobSettings.size / 2,
        top: position.y - mouseBlobSettings.size / 2,
        width: mouseBlobSettings.size,
        height: mouseBlobSettings.size,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,${mouseBlobSettings.opacity}) 0%, rgba(255,255,255,${mouseBlobSettings.opacity * 0.3}) 40%, rgba(255,255,255,${mouseBlobSettings.opacity * 0.1}) 100%)`,
          backdropFilter: `blur(${mouseBlobSettings.blur}px)`,
          border: `1px solid rgba(255,255,255,${mouseBlobSettings.opacity * 0.4})`,
          borderRadius: `${mouseBlobSettings.borderRadius}%`,
          boxShadow: `0 8px 32px rgba(255,255,255,${mouseBlobSettings.opacity * 0.2}), inset 0 1px 0 rgba(255,255,255,${mouseBlobSettings.opacity * 0.6})`,
          transform: `scale(${mouseBlobSettings.scale})`,
          animation: `blob ${mouseBlobSettings.animationSpeed}s infinite ease-in-out`,
        }}
      />
    </div>
  );
};

export default MouseBlob;
