import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const id = recipe.id;
  const title = recipe.source.title;

  // Define the styles for each section
  const cardStyle = {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '1.5rem',
    margin: '1rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    width: 'calc(100% + 0.3cm)', // Increase the width by 0.3 cm
    display: 'flex',
    flexDirection: 'column',
    height: '300px', // Set a fixed height to ensure uniformity
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff6f61', // Orange background
    color: '#fff', // White text
    textDecoration: 'none', // Remove underline
    borderRadius: '8px', // Rounded corners
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  };

  const linkHoverStyle = {
    backgroundColor: '#e55b4e', // Darker orange on hover
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="section" style={{ ...sectionStyle, flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span className="category" style={{ color: '#ff6f61', fontWeight: 'bold' }}>
            {id}
        </span>
      </div>
      <div className="section" style={{ ...sectionStyle, flexGrow: 1 }}>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.0rem' }}>
            {title}
        </h3>
      </div>
      <div className="section" style={{ ...sectionStyle, marginTop: 'auto' }}>
        <Link 
          to={`/recipe/${id}`} 
          style={linkStyle} 
          onMouseOver={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
        >
          Get Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
