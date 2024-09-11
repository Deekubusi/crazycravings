import React, { useState } from 'react';

function Navbar() {
  const [showIngredientsCheckboxes, setShowIngredientsCheckboxes] = useState(false);
  const [showRatingCheckboxes, setShowRatingCheckboxes] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleIngredientsClick = () => {
    setShowIngredientsCheckboxes(!showIngredientsCheckboxes);
    setShowRatingCheckboxes(false); // Optionally hide other checkboxes
  };

  const handleRatingClick = () => {
    setShowRatingCheckboxes(!showRatingCheckboxes);
    setShowIngredientsCheckboxes(false); // Optionally hide other checkboxes
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevState) =>
      prevState.includes(ingredient)
        ? prevState.filter((item) => item !== ingredient)
        : [...prevState, ingredient]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prevState) =>
      prevState.includes(rating)
        ? prevState.filter((item) => item !== rating)
        : [...prevState, rating]
    );
  };

  const applyFilters = () => {
    // Here you would apply the selected filters, e.g., by calling an API or updating your UI
    console.log('Selected Ingredients:', selectedIngredients);
    console.log('Selected Ratings:', selectedRatings);
  };

  return (
    <nav className="navbar bg-body-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><strong>Crazy Cravings</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Crazy Cravings</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <strong>Filters</strong>
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={handleIngredientsClick}>Ingredients</a></li>
                  <li><a className="dropdown-item" href="#" onClick={handleRatingClick}>Rating</a></li>
                </ul>
                {showIngredientsCheckboxes && (
                  <div className="checkbox-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="onion"
                        id="ingredient1"
                        onChange={() => handleIngredientChange('onion')}
                      />
                      <label className="form-check-label" htmlFor="ingredient1">Onion</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="tomato"
                        id="ingredient2"
                        onChange={() => handleIngredientChange('tomato')}
                      />
                      <label className="form-check-label" htmlFor="ingredient2">Tomato</label>
                    </div>
                    {/* Add more ingredients as needed */}
                  </div>
                )}
                {showRatingCheckboxes && (
                  <div className="checkbox-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="1 and above"
                        id="rating1"
                        onChange={() => handleRatingChange('1 and above')}
                      />
                      <label className="form-check-label" htmlFor="rating1">1 and above</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="2 and above"
                        id="rating2"
                        onChange={() => handleRatingChange('2 and above')}
                      />
                      <label className="form-check-label" htmlFor="rating2">2 and above</label>
                    </div>
                    {/* Add more ratings as needed */}
                  </div>
                )}
                <button className="btn btn-primary mt-3" onClick={applyFilters}>Apply Filters</button>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
