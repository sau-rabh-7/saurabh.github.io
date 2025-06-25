
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const Projects: React.FC = () => {
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
          My Projects
        </h1>

        {data.projects.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: secondary }} className="text-xl">
              No projects added yet. Use the admin panel to add your projects.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <Card 
                key={project.id} 
                className="overflow-hidden shadow-lg"
                style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: secondary }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: `${secondary}CC` }}
                  >
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index}
                        style={{ 
                          backgroundColor: `${secondary}20`,
                          color: secondary,
                          borderColor: `${secondary}40`
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => window.open(project.githubUrl)}
                      style={{ 
                        backgroundColor: secondary,
                        color: primary
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.liveUrl && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.liveUrl)}
                        style={{ 
                          borderColor: secondary,
                          color: secondary
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
