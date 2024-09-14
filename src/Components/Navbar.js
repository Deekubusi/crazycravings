import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS file

function Navbar({ onApplyFilters }) {
  const [showCategoriesCheckboxes, setShowCategoriesCheckboxes] = useState(false);
  const [showRatingCheckboxes, setShowRatingCheckboxes] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleCategoriesClick = () => {
    setShowCategoriesCheckboxes(!showCategoriesCheckboxes);
    setShowRatingCheckboxes(false); // Hide other checkboxes
  };

  const handleRatingClick = () => {
    setShowRatingCheckboxes(!showRatingCheckboxes);
    setShowCategoriesCheckboxes(false); // Hide other checkboxes
  };

  const handleCategoriesChange = (category) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings([rating]); // Start fresh with the selected rating
  };

  const backend = "http://13.60.15.198:8000";

  const applyFilters = () => {
    console.log('Selected Categories:', selectedCategories);
    console.log('Selected Ratings:', selectedRatings);

    const data = {
      categories: selectedCategories,
      rating: selectedRatings.length > 0 ? Math.max(...selectedRatings) : null,
    };

    console.log('Sending data:', data);

    // Make the API call
    fetch(`${backend}/filters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Filter response:', result);

        // Close the filters tab
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) {
          offcanvas.hide();
        }

        onApplyFilters(result.data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <nav className="navbar bg-body-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><strong>Crazy Cravings</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end offcanvas-custom" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                  <li><a className="dropdown-item" href="#" onClick={handleCategoriesClick}>Categories</a></li>
                  <li><a className="dropdown-item" href="#" onClick={handleRatingClick}>Rating</a></li>
                </ul>
                <div className={`filter-options ${showCategoriesCheckboxes || showRatingCheckboxes ? 'd-block' : 'd-none'}`}>
                  {showCategoriesCheckboxes && (
                    <div className="checkbox-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Breakfast"
                          id="category1"
                          checked={selectedCategories.includes('Breakfast')}
                          onChange={() => handleCategoriesChange('Breakfast')}
                        />
                        <label className="form-check-label" htmlFor="category1">Breakfast</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Lunch"
                          id="category2"
                          checked={selectedCategories.includes('Lunch')}
                          onChange={() => handleCategoriesChange('Lunch')}
                        />
                        <label className="form-check-label" htmlFor="category2">Lunch</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Brunch"
                          id="category3"
                          checked={selectedCategories.includes('Brunch')}
                          onChange={() => handleCategoriesChange('Brunch')}
                        />
                        <label className="form-check-label" htmlFor="category3">Brunch</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Dinner"
                          id="category4"
                          checked={selectedCategories.includes('Dinner')}
                          onChange={() => handleCategoriesChange('Dinner')}
                        />
                        <label className="form-check-label" htmlFor="category4">Dinner</label>
                      </div>
                    </div>
                  )}
                  {showRatingCheckboxes && (
                    <div className="radio-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value="1"
                          id="rating1"
                          checked={selectedRatings.includes('1')}
                          onChange={() => handleRatingChange('1')}
                        />
                        <label className="form-check-label" htmlFor="rating1">
                          <span className="star">&#9733;</span> and above
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value="2"
                          id="rating2"
                          checked={selectedRatings.includes('2')}
                          onChange={() => handleRatingChange('2')}
                        />
                        <label className="form-check-label" htmlFor="rating2">
                          <span className="star">&#9733;&#9733;</span> and above
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value="3"
                          id="rating3"
                          checked={selectedRatings.includes('3')}
                          onChange={() => handleRatingChange('3')}
                        />
                        <label className="form-check-label" htmlFor="rating3">
                          <span className="star">&#9733;&#9733;&#9733;</span> and above
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value="4"
                          id="rating4"
                          checked={selectedRatings.includes('4')}
                          onChange={() => handleRatingChange('4')}
                        />
                        <label className="form-check-label" htmlFor="rating4">
                          <span className="star">&#9733;&#9733;&#9733;&#9733;</span> and above
                        </label>
                      </div>
                    </div>
                  )}
                  <button className="btn mt-3 btn-custom" onClick={applyFilters}>Apply Filters</button>
                  {(selectedCategories.length > 0 || selectedRatings.length > 0) && (
                    <div className="selected-filters mt-3">
                      <h6>Selected Filters:</h6>
                      <ul>
                        {selectedCategories.length > 0 && (
                          <li><strong>Categories:</strong> {selectedCategories.join(', ')}</li>
                        )}
                        {selectedRatings.length > 0 && (
                          <li><strong>Ratings:</strong> {selectedRatings.join(', ')}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
