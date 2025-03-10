import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard(props) {
  // Get data from props
  const { name, role, avatar, skills, location } = props;

  // State for showing/hiding details
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(0);

  // Toggle details visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="profile-card">
      {/* Avatar and basic info */}
      <div className="profile-header">
        <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
        <h2>{name}</h2>
        <p>{role}</p>
        <p>{location}</p>
      </div>

      {/* Toggle button */}
      <button onClick={toggleDetails}>
        {showDetails ? "Hide Skills" : "Show Skills"}
      </button>

      {/* Skills section - only shows when showDetails is true */}
      {showDetails && (
        <div className="skills-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Like button */}
      <button onClick={handleLike}>Like {likes}</button>
    </div>
  );
}

// Default props
ProfileCard.defaultProps = {
  avatar: "https://via.placeholder.com/100",
  skills: [],
  location: "Unknown"
};

export default ProfileCard;
