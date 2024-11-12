import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

function PlantList({ deletePlant, plants, updatePlant }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading by setting a delay (adjust based on your app's needs)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [plants]);

  // Show loading indicator while data is loading
  if (isLoading) {
    return <p className="loading-message">Loading plants...</p>;
  }

  // Conditional rendering for empty list
  if (plants.length === 0) {
    return <p className="empty-message">No plants available to display.</p>;
  }

  // Rendering the list of plants
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
