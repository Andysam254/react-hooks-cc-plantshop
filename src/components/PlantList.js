import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ deletePlant, plants, updatePlant }) {
  // Conditional rendering for empty list
  if (plants.length === 0) {
    return <p className="empty-message">No plants available to display.</p>;
  }

  // Rendering the list of plants with additional styling
  const plantCardComponents = plants.map((plant) => (
    <PlantCard
      deletePlant={deletePlant}
      key={plant.id}
      updatePlant={updatePlant}
      {...plant}
    />
  ));

  return (
    <div className="plant-list-container">
      <h2 className="plant-list-title">Our Beautiful Plant Collection</h2>
      <ul className="cards plant-list">{plantCardComponents}</ul>
    </div>
  );
}

export default PlantList;
