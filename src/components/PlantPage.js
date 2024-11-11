import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch plants");
        return response.json();
      })
      .then((data) => setPlants(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const createPlant = (newPlant) => {
    setLoading(true);
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create plant");
        return response.json();
      })
      .then((data) => setPlants([...plants, data]))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const deletePlant = (plantId) => {
    if (window.confirm(`Are you sure you want to delete plant ${plantId}?`)) {
      setLoading(true);
      fetch(`http://localhost:6001/plants/${plantId}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete plant");
          setPlants(plants.filter((plant) => plant.id !== plantId));
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  };

  const updatePlant = (plantId, updatedPriceObject) => {
    setLoading(true);
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPriceObject),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update plant");
        return response.json();
      })
      .then((data) => {
        const updatedPlants = plants.map((plant) =>
          plant.id === data.id ? data : plant
        );
        setPlants(updatedPlants);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        alert("Your price has been updated!");
      });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm createPlant={createPlant} />
      <Search search={search} setSearch={setSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <PlantList
        deletePlant={deletePlant}
        plants={filteredPlants}
        updatePlant={updatePlant}
      />
    </main>
  );
}

export default PlantPage;
