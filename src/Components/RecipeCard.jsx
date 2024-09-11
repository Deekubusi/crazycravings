import React from "react";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strCategory, strMealThumb } = recipe;

  const cardStyle = {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))', // Gradient background
    border: '1px solid rgba(0, 0, 0, 0.1)', // Light border with 10% opacity
    borderRadius: '12px', // Rounded corners
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Deeper shadow for a floating effect
    padding: '1.5rem', // Increased padding for better spacing
    margin: '1rem', // Margin around the card
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effects
    overflow: 'hidden', // Ensure rounded corners for images
  };

  const cardBodyStyle = {
    padding: '1rem',
  };

  const hoverStyle = {
    transform: 'scale(1.03)', // Slightly enlarge the card on hover
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
  };

  return (
    <div className="card" style={{ ...cardStyle, ...hoverStyle }}>
      <div className="card-body" style={cardBodyStyle}>
        <span className="category" style={{ color: '#ff6f61', fontWeight: 'bold' }}>{strCategory}</span>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{strMeal}</h3>
        <a
          href={`https://www.themealdb.com/meal/${idMeal}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Instructions
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
