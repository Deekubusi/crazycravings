import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import RecipeCard from "./Components/RecipeCard";
import RecipeDetail from './Components/RecipeDetail'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css"; // Assuming you have some CSS for styling

const backend = "http://13.60.15.198:8000";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes based on the search query
  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backend}/toprated`);
      const resData = await res.json();
      setRecipes(resData.data || []); // Handle null response
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipesWithFilters = (filteredRecipes) => {
    setRecipes(filteredRecipes);
    console.dir("filters : "+filteredRecipes)
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // searchRecipes();
    searchRecipesByKeyword()
  };

  const searchRecipesByKeyword = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backend}/search?keyword=${query}`);
      const resData = await res.json();
      setRecipes(resData.data || []); // Handle null response
      console.log(resData.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div>
        {/* Navbar and SearchBar are always visible */}
        {/* <Navbar name="Crazy Cravings" /> */}
        <Navbar onApplyFilters={updateRecipesWithFilters} />
        <div className="container mt-5">
          <SearchBar
            isLoading={isLoading}
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />

          {/* Render Recipe Cards only on the homepage ("/") */}
          <Routes>
            <Route
              path="/"
              element={
                <div className="recipes mt-4">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                  ) : (
                    <p>No Results.</p>
                  )}
                </div>
              }
            />
            {/* Recipe Detail Page */}
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
