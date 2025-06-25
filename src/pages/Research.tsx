
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Research: React.FC = () => {
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
          Research Work
        </h1>

        {data.research.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: secondary }} className="text-xl">
              No research work added yet. Use the admin panel to add your research.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {data.research.map((research) => (
              <Card 
                key={research.id} 
                className="p-8"
                style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <h3 
                      className="text-2xl font-semibold mb-3"
                      style={{ color: secondary }}
                    >
                      {research.title}
                    </h3>
                    <p 
                      className="text-lg mb-4"
                      style={{ color: `${secondary}CC` }}
                    >
                      {research.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <span style={{ color: `${secondary}99` }}>
                        Published in: {research.publication}
                      </span>
                      <span style={{ color: `${secondary}99` }}>
                        • {research.date}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => window.open(research.url)}
                    style={{ 
                      backgroundColor: secondary,
                      color: primary
                    }}
                  >
                    View Paper
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
