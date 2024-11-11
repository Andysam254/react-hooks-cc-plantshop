import React, { useState } from "react";

const defaultData = {
  name: "",
  image: "",
  price: "",
};

function NewPlantForm({ createPlant }) {
  const [formData, setFormData] = useState(defaultData);
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPlant({
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price),
    });
    setFormData(defaultData);
    setTouched({});
  };

  const clearForm = () => {
    setFormData(defaultData);
    setTouched({});
  };

  const isFormValid =
    formData.name.trim() &&
    formData.image.trim() &&
    !isNaN(formData.price) &&
    parseFloat(formData.price) > 0;

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Plant name"
          type="text"
          value={formData.name}
          className={touched.name && !formData.name ? "input-error" : ""}
          aria-label="Plant name"
        />
        {touched.name && !formData.name && (
          <span className="error-message">Plant name is required.</span>
        )}
        
        <input
          name="image"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Image URL"
          type="text"
          value={formData.image}
          className={touched.image && !formData.image ? "input-error" : ""}
          aria-label="Image URL"
        />
        {touched.image && !formData.image && (
          <span className="error-message">Image URL is required.</span>
        )}

        <input
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Price"
          step="0.01"
          type="number"
          value={formData.price}
          className={touched.price && (!formData.price || formData.price <= 0) ? "input-error" : ""}
          aria-label="Price"
        />
        {touched.price && (!formData.price || formData.price <= 0) && (
          <span className="error-message">Price must be a positive number.</span>
        )}

        <button type="submit" disabled={!isFormValid}>
          Add Plant
        </button>
        <button type="button" onClick={clearForm} className="clear-button">
          Clear Form
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;
