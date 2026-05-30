import React from 'react';
import './SkillTag.css';

const SkillTag = ({ skill, proficiency }) => {
  const getProficiencyWidth = () => {
    switch (proficiency) {
      case 'Expert':
        return 90;
      case 'Intermediate':
        return 60;
      case 'Beginner':
        return 40;
      default:
        return 0;
    }
  };

  const width = getProficiencyWidth();

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill}</span>
        <span className="skill-level">{proficiency}</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress" 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillTag;
