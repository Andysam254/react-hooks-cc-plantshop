import React, { useState } from "react";

function PlantCard({ deletePlant, id, image, name, price, updatePlant }) {
  const [inStock, setInStock] = useState(true);
  const [priceInput, setPriceInput] = useState(price);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const toggleStock = () => setInStock(!inStock);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deletePlant(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isNaN(priceInput) && priceInput > 0) {
      setIsUpdating(true);
      updatePlant(id, { price: parseFloat(priceInput) })
        .then(() => {
          setIsUpdating(false);
          setMessage("Price updated successfully!");
          setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        })
        .catch(() => {
          setIsUpdating(false);
          setMessage("Failed to update price. Please try again.");
          setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        });
    } else {
      setMessage("Please enter a valid price.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
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
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
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
