
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Card } from '@/components/ui/card';

const Hobbies: React.FC = () => {
  const { data } = usePortfolio();
  const { primary, secondary } = useColorPalette();

  return (
    <div 
      className="min-h-screen pt-20 pb-12"
      style={{ backgroundColor: primary }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h1 
          className="text-4xl lg:text-5xl font-bold mb-12 text-center"
          style={{ color: secondary }}
        >
          My Hobbies
        </h1>

        {data.hobbies.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: secondary }} className="text-xl">
              No hobbies added yet. Use the admin panel to add your hobbies.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.hobbies.map((hobby) => (
              <Card 
                key={hobby.id} 
                className="overflow-hidden shadow-lg"
                style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
              >
                <img
                  src={hobby.imageUrl}
                  alt={hobby.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: secondary }}
                  >
                    {hobby.name}
                  </h3>
                  <p 
                    style={{ color: `${secondary}CC` }}
                  >
                    {hobby.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hobbies;
