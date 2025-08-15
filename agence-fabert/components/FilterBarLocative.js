import React, { useState } from "react";
import styles from "../styles/FilterBarLocative.module.css";

const PROPERTY_TYPES = ["Maison", "Appartement", "Villa", "Studio"];

const FilterBarLocative = ({ setFilters }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasPool, setHasPool] = useState(false);
  const [hasJacuzzi, setHasJacuzzi] = useState(false);
  const [nearBeach, setNearBeach] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  // Toggle type selection in array
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Appliquer les filtres au parent
  const addFilters = () => {
    setFilters({
      types: selectedTypes,
      sortOrder,
      location,
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      capacity: capacity ? parseInt(capacity, 10) : null,
      bedrooms: bedrooms ? parseInt(bedrooms, 10) : null,
      startDate,
      endDate,
      hasPool,
      hasJacuzzi,
      nearBeach,
      hasAC,
      hasHeating,
    });
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedTypes([]);
    setCapacity("");
    setBedrooms("");
    setStartDate("");
    setEndDate("");
    setHasPool(false);
    setHasJacuzzi(false);
    setNearBeach(false);
    setHasAC(false);
    setHasHeating(false);
    setSortOrder("");

    setFilters({
      types: [],
      sortOrder: "",
      location: "",
      minPrice: null,
      maxPrice: null,
      capacity: null,
      bedrooms: null,
      startDate: "",
      endDate: "",
      hasPool: false,
      hasJacuzzi: false,
      nearBeach: false,
      hasAC: false,
      hasHeating: false,
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

      {/* Types de bien */}
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
          placeholder="Ex: 4"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <label>Nombre de chambres</label>
        <input
          type="number"
          min="0"
          placeholder="Ex: 2"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>

      

      {/* Équipements */}
      <fieldset className={styles.checkboxGroup}>
        <legend>Équipements</legend>
        <label>
          <input
            type="checkbox"
            checked={hasPool}
            onChange={() => setHasPool(!hasPool)}
          />{" "}
          Piscine
        </label>
        <label>
          <input
            type="checkbox"
            checked={hasJacuzzi}
            onChange={() => setHasJacuzzi(!hasJacuzzi)}
          />{" "}
          Jacuzzi
        </label>
        <label>
          <input
            type="checkbox"
            checked={nearBeach}
            onChange={() => setNearBeach(!nearBeach)}
          />{" "}
          Proche plage
        </label>
        <label>
          <input
            type="checkbox"
            checked={hasAC}
            onChange={() => setHasAC(!hasAC)}
          />{" "}
          Climatisation
        </label>
        <label>
          <input
            type="checkbox"
            checked={hasHeating}
            onChange={() => setHasHeating(!hasHeating)}
          />{" "}
          Chauffage
        </label>
      </fieldset>

      

      {/* Boutons d'action */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={addFilters}
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

export default FilterBarLocative;
