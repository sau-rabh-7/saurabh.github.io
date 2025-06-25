
import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import SilkBackground from '@/components/SilkBackground';
import MouseBlob from '@/components/MouseBlob';
import SkillCircle from '@/components/SkillCircle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Instagram, Globe, FileText } from 'lucide-react';

const Home: React.FC = () => {
  const { data } = usePortfolio();
  const { textOnPrimary } = useColorPalette();
  const { personalInfo, socialMedia, skills, experiences, currentlyLearning } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="w-6 h-6" />;
      case 'linkedin': return <Linkedin className="w-6 h-6" />;
      case 'instagram': return <Instagram className="w-6 h-6" />;
      case 'glassdoor':
      case 'indeed':
      default: return <Globe className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ color: textOnPrimary }}>
      <SilkBackground />
      <MouseBlob />
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="lg:w-1/2">
              <img
                src={personalInfo.profilePhoto}
                alt={personalInfo.name}
                className="w-80 h-80 rounded-full object-cover mx-auto shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(255,255,255,0.1)',
                }}
              />
            </div>
            
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl mb-6 text-gray-300">
                {personalInfo.title}
              </h2>
              <p className="text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
                {personalInfo.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30"
                  onClick={() => window.open(`mailto:${personalInfo.email}`)}
                >
                  Contact Me
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => window.open(personalInfo.resumeUrl)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Social Media */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {Object.entries(socialMedia).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
                  >
                    {getSocialIcon(platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <h3 className="text-2xl font-semibold mb-6 text-white">Skills</h3>
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="mb-6">
                  <h4 className="text-lg font-medium mb-4 text-gray-200">{category}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => (
                      <SkillCircle
                        key={skill.id}
                        skill={skill}
                        color="rgba(255,255,255,0.8)"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Card>

            <div className="space-y-8">
              {/* Experience */}
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
                <h3 className="text-2xl font-semibold mb-6 text-white">Experience</h3>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <h4 className="text-lg font-medium text-white">{exp.title}</h4>
                      <p className="text-gray-300">{exp.company} • {exp.duration}</p>
                      <p className="text-gray-200 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Currently Learning */}
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
                <h3 className="text-2xl font-semibold mb-6 text-white">Currently Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {currentlyLearning.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-white/20 text-white border-white/30"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
