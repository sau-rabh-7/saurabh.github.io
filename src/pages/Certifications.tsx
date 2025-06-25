
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Certifications: React.FC = () => {
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
          Certifications
        </h1>

        {data.certifications.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: secondary }} className="text-xl">
              No certifications added yet. Use the admin panel to add your certifications.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.certifications.map((cert) => (
              <Card 
                key={cert.id} 
                className="p-6"
                style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
              >
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: secondary }}
                >
                  {cert.name}
                </h3>
                <p 
                  className="mb-2"
                  style={{ color: `${secondary}CC` }}
                >
                  Issued by: {cert.issuer}
                </p>
                <p 
                  className="mb-4 text-sm"
                  style={{ color: `${secondary}99` }}
                >
                  {cert.date}
                </p>
                
                <Button 
                  onClick={() => window.open(cert.credentialUrl)}
                  style={{ 
                    backgroundColor: secondary,
                    color: primary
                  }}
                >
                  View Credential
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
