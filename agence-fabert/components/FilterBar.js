import React, { useState } from "react";
import styles from "../styles/FilterBar.module.css";

const FilterBar = ({ setFilters }) => {
  const [types, setTypes] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [surfaceMin, setSurfaceMin] = useState("");
  const [surfaceMax, setSurfaceMax] = useState("");
  const [chambres, setChambres] = useState("");
  const [pieces, setPieces] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleReset = () => {
    setTypes("");
    setLocalisation("");
    setPrixMin("");
    setPrixMax("");
    setSurfaceMin("");
    setSurfaceMax("");
    setChambres("");
    setPieces("");
    setSortOrder("");
    setFilters({
      types: [],
      sortOrder: "",
      location: "",
      minPrice: null,
      maxPrice: null,
      surfaceMin: null,
      surfaceMax: null,
      chambres: null,
      pieces: null,
    });
  };

  const handleApplyFilters = () => {
    setFilters({
types: types ? [types.toLowerCase()] : [],
      sortOrder: sortOrder,
      location: localisation,
      minPrice: prixMin ? parseInt(prixMin, 10) : null,
      maxPrice: prixMax ? parseInt(prixMax, 10) : null,
      surfaceMin: surfaceMin ? parseInt(surfaceMin, 10) : null,
      surfaceMax: surfaceMax ? parseInt(surfaceMax, 10) : null,
      chambres: chambres ? parseInt(chambres, 10) : null,
      pieces: pieces ? parseInt(pieces, 10) : null,
    });
  };

  const locations = [
    "Rivedoux-Plage","Sainte-Marie-de-Ré","La Flotte","Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré","La Couarde-sur-Mer","Loix","Ars-en-Ré",
    "Saint-Clément-des-Baleines","Les-Portes-en-Ré"
  ];

  return (
    <div className={styles.filterBar}>
      {/* Type de bien */}
      <div className={styles.group}>
        <label>Type de bien</label>
        <select
          value={types}
          onChange={(e) => setTypes(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
          <option value="Garage">Garage</option>
          <option value="Terrain">Terrain</option>
          <option value="Bureau">Bureau</option>
          <option value="Local commercial">Local commercial</option>
          <option value="Parking">Parking</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {/* Trier par */}
      <div className={styles.group}>
        <label htmlFor="sort-order">Trier par</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Aucun</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      {/* Localisation */}
      <div className={styles.group}>
        <label htmlFor="location-select">Emplacement</label>
        <select
          id="location-select"
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
        >
          <option value="">Aucun</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Prix */}
      <div className={styles.priceGroup}>
        <label>Prix</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            value={prixMin}
            onChange={(e) => setPrixMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
          />
        </div>
      </div>

      {/* Surface */}
      <div className={styles.group}>
        <label>Surface min (m²)</label>
        <input type="number" placeholder="Ex: 25" value={surfaceMin} onChange={(e) => setSurfaceMin(e.target.value)} />
      </div>
      <div className={styles.group}>
        <label>Surface max (m²)</label>
        <input type="number" placeholder="Ex: 55" value={surfaceMax} onChange={(e) => setSurfaceMax(e.target.value)} />
      </div>

      {/* Chambres */}
      <div className={styles.group}>
        <label>Nombre min. de chambres</label>
        <input type="number" placeholder="Ex: 1" value={chambres} onChange={(e) => setChambres(e.target.value)} />
      </div>

      {/* Pièces */}
      <div className={styles.group}>
        <label>Nombre min. de pièces</label>
        <input type="number" placeholder="Ex: 3" value={pieces} onChange={(e) => setPieces(e.target.value)} />
      </div>

      {/* Boutons */}
      <div className={styles.buttonGroup}>
        <button onClick={handleReset}>Réinitialiser</button>
        <button onClick={handleApplyFilters}>Filtrer</button>
      </div>
    </div>
  );
};

export default FilterBar;
