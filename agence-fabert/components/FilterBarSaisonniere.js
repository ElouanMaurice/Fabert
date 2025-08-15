import React, { useState } from "react";
import styles from "../styles/FilterBarSaisonniere.module.css";

const PROPERTY_TYPES = ["Maison", "Appartement", "Villa"];

const FilterBarSaisonniere = ({ setFilters }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const applyFilters = () => {
    setFilters({
      location,
      types: selectedTypes,
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      capacity: capacity ? parseInt(capacity, 10) : null,
      bedrooms: bedrooms ? parseInt(bedrooms, 10) : null,
      startDate,
      endDate,
      sortOrder,
    });
  };

  const resetFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedTypes([]);
    setCapacity("");
    setBedrooms("");
    setStartDate("");
    setEndDate("");
    setSortOrder("");

    setFilters({
      location: "",
      types: [],
      minPrice: null,
      maxPrice: null,
      capacity: null,
      bedrooms: null,
      startDate: "",
      endDate: "",
      sortOrder: "",
    });
  };

  const locations = [
    "Rivedoux-Plage", "Sainte-Marie-de-Ré", "La Flotte", "Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré", "La Couarde-sur-Mer", "Loix", "Ars-en-Ré",
    "Saint-Clément-des-Baleines", "Les-Portes-en-Ré"
  ];


  return (
    <div className={styles.filterBar}>

          {/* Tri */}
      <div className={styles.group}>
        <label htmlFor="sort-order">Trier par</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Aucun</option>
          <option value="croissant">Prix croissant</option>
          <option value="décroissant">Prix décroissant</option>
        </select>
      </div>

      {/* Emplacement */}
      <div className={styles.group}>
        <label htmlFor="location-select">Emplacement</label>
      <select
  id="location-select"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">Aucun</option>
  {locations.map((loc) => (
    <option key={loc} value={loc}>
      {loc}
    </option>
  ))}
</select>
      </div>

      {/* Prix */}
      <div className={styles.group}>
        <label>Prix (€)</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Type de bien */}
      <div className={styles.group}>
        <label>Type de bien</label>
        <div className={styles.typeButtons}>
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`${styles.typeButton} ${
                selectedTypes.includes(type) ? styles.selected : ""
              }`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Capacité et chambres */}
      <div className={styles.group}>
        <label>Capacité (personnes)</label>
        <input
          type="number"
          min="1"
          placeholder="Ex: 6"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <label>Nombre de chambres</label>
        <input
          type="number"
          min="0"
          placeholder="Ex: 3"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>

      {/* Dates */}
      <div className={styles.group}>
        <label>Date d’arrivée</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className={styles.group}>
        <label>Date de départ</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

    

      {/* Boutons */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={applyFilters}
          className={styles.filterbouton}
        >
          Filtrer
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className={styles.resetbouton}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default FilterBarSaisonniere;
