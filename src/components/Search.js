import React from "react";

function Search({ search, setSearch }) {
  const handleChange = (event) => setSearch(event.target.value);

  const clearSearch = () => setSearch("");

  return (
    <div className="searchbar">
      <label htmlFor="search" className="search-label">Search Plants:</label>
      <div className="search-input-container">
        <input
          type="text"
          id="search"
          placeholder="Type a name to search..."
          onChange={handleChange}
          value={search}
          className="search-input"
        />
        {search && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="clear-button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
