// Components/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const backend = 'http://13.60.15.198:8000';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${backend}/getRecipe?id=${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p><strong>ID:</strong> {recipe.id}</p>
      <p><strong>Categories:</strong> {recipe.categories.join(', ')}</p>
      <p><strong>Instructions:</strong></p>
      <pre>{recipe.instructions}</pre>
    </div>
  );
};

export default RecipeDetail;
