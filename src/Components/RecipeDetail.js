import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css'; // Custom styles for the recipe detail card

const backend = 'http://13.60.15.198:8000';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`${backend}/getRecipe?id=${id}`);
      setRecipe(res.data.data || []); 
      console.dir(res.data.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setRecipe(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-detail-card">
      <div className="recipe-header">
        <h2>{recipe.source.title}</h2>
        <p className="recipe-id"><strong>ID:</strong> {recipe.id}</p>
      </div>

      <div className="recipe-body">

        <p><strong>Calories : </strong>{recipe.source.calories}</p>
        <p><strong>Categories:</strong> {recipe.source.categories.join(', ')}</p>
        

        <h3><strong>Ingredients: </strong></h3>
        <ul className="recipe-ingredients">
          {recipe.source.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h3><strong>Instructions: </strong></h3>
        <ol className="recipe-instructions">
          {recipe.source.directions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
