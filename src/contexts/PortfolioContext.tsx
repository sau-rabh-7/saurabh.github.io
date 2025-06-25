
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  profilePhoto: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
}

interface SocialMedia {
  linkedin: string;
  github: string;
  instagram: string;
  glassdoor: string;
  indeed: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

interface Research {
  id: string;
  title: string;
  description: string;
  publication: string;
  date: string;
  url: string;
}

interface Hobby {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

interface BackgroundSettings {
  speed: number;
  scale: number;
  noise: number;
  rotation: number;
  color: string;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  socialMedia: SocialMedia;
  skills: Skill[];
  experiences: Experience[];
  currentlyLearning: string[];
  projects: Project[];
  research: Research[];
  hobbies: Hobby[];
  certifications: Certification[];
  backgroundSettings: BackgroundSettings;
  selectedPalette: number;
}

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateSocialMedia: (social: SocialMedia) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateCurrentlyLearning: (learning: string[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateResearch: (research: Research[]) => void;
  updateHobbies: (hobbies: Hobby[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateBackgroundSettings: (settings: BackgroundSettings) => void;
  updateSelectedPalette: (palette: number) => void;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: "Your Name",
    title: "Software Developer",
    description: "Passionate developer with expertise in modern web technologies.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, Country",
    resumeUrl: "#"
  },
  socialMedia: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    instagram: "https://instagram.com/yourusername",
    glassdoor: "https://glassdoor.com/profile/yourprofile",
    indeed: "https://indeed.com/profile/yourprofile"
  },
  skills: [
    { id: '1', name: 'React', level: 90, category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 85, category: 'Languages' },
    { id: '3', name: 'Node.js', level: 80, category: 'Backend' }
  ],
  experiences: [
    {
      id: '1',
      title: 'Senior Developer',
      company: 'Tech Company',
      duration: '2022 - Present',
      description: 'Leading development of modern web applications.'
    }
  ],
  currentlyLearning: ['AI/ML', 'Cloud Architecture', 'DevOps'],
  projects: [],
  research: [],
  hobbies: [],
  certifications: [],
  backgroundSettings: {
    speed: 1,
    scale: 1,
    noise: 0.5,
    rotation: 0,
    color: '#6366f1'
  },
  selectedPalette: 1
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-data');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const saveData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio-data', JSON.stringify(newData));
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    saveData({ ...data, personalInfo: info });
  };

  const updateSocialMedia = (social: SocialMedia) => {
    saveData({ ...data, socialMedia: social });
  };

  const updateSkills = (skills: Skill[]) => {
    saveData({ ...data, skills });
  };

  const updateExperiences = (experiences: Experience[]) => {
    saveData({ ...data, experiences });
  };

  const updateCurrentlyLearning = (learning: string[]) => {
    saveData({ ...data, currentlyLearning: learning });
  };

  const updateProjects = (projects: Project[]) => {
    saveData({ ...data, projects });
  };

  const updateResearch = (research: Research[]) => {
    saveData({ ...data, research });
  };

  const updateHobbies = (hobbies: Hobby[]) => {
    saveData({ ...data, hobbies });
  };

  const updateCertifications = (certifications: Certification[]) => {
    saveData({ ...data, certifications });
  };

  const updateBackgroundSettings = (settings: BackgroundSettings) => {
    saveData({ ...data, backgroundSettings: settings });
  };

  const updateSelectedPalette = (palette: number) => {
    saveData({ ...data, selectedPalette: palette });
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      updatePersonalInfo,
      updateSocialMedia,
      updateSkills,
      updateExperiences,
      updateCurrentlyLearning,
      updateProjects,
      updateResearch,
      updateHobbies,
      updateCertifications,
      updateBackgroundSettings,
      updateSelectedPalette
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
