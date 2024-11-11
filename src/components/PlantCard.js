import React, { useState } from "react";

function PlantCard({ deletePlant, id, image, name, price, updatePlant }) {
  const [inStock, setInStock] = useState(true);
  const [priceInput, setPriceInput] = useState(price);

  const toggleStock = () => setInStock(!inStock);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deletePlant(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isNaN(priceInput) && priceInput > 0) {
      updatePlant(id, { price: parseFloat(priceInput) });
    } else {
      alert("Please enter a valid price.");
    }
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <div className="price-section">
        <p>Price:</p>
        <form onSubmit={handleSubmit} className="price-form">
          <input
            name="price"
            onChange={(event) => setPriceInput(event.target.value)}
            type="number"
            step="0.01"
            value={priceInput}
            className="price-input"
          />
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="row">
        <button
          className={inStock ? "in-stock" : "out-of-stock"}
          onClick={toggleStock}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
    </li>
  );
}

export default PlantCard;
