
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useColorPalette } from '@/hooks/useColorPalette';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { primary, secondary } = useColorPalette();
  
  const isHome = location.pathname === '/';
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/research', label: 'Research' },
    { path: '/hobbies', label: 'Hobbies' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 ${
        isHome 
          ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' 
          : 'border-b'
      }`}
      style={{
        backgroundColor: isHome ? undefined : `${primary}20`,
        borderColor: isHome ? undefined : `${secondary}30`,
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className={`text-xl font-bold ${
            isHome ? 'text-white' : ''
          }`}
          style={{ color: isHome ? undefined : secondary }}
        >
          Portfolio
        </Link>
        
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors duration-200 ${
                location.pathname === item.path
                  ? (isHome ? 'text-white font-semibold' : 'font-semibold')
                  : (isHome ? 'text-white/80 hover:text-white' : 'hover:opacity-80')
              }`}
              style={{
                color: isHome ? undefined : (location.pathname === item.path ? secondary : `${secondary}80`),
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
