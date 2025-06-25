
import React from 'react';

interface SkillCircleProps {
  skill: {
    id: string;
    name: string;
    level: number;
    category: string;
    icon?: string;
  };
  color: string;
}

const SkillCircle: React.FC<SkillCircleProps> = ({ skill, color }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(skill.level / 100) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
          ) : (
            <span className="text-lg font-bold" style={{ color }}>
              {skill.level}%
            </span>
          )}
        </div>
      </div>
      <h4 className="text-sm font-medium text-center">{skill.name}</h4>
    </div>
  );
};

export default SkillCircle;
