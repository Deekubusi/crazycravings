// App.js
import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import RecipeCard from './Components/RecipeCard';
import './App.css'; // Assuming you have some CSS for styling

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=)";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");  
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes based on the search query
  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(searchApi + query);
      const data = await res.json();
      setRecipes(data.meals || []); // Handle null response
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div>
      <Navbar name="Crazy Cravings" />
      <div className="container mt-5">
        <SearchBar
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />
        <div className="recipes mt-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p>No Results.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
