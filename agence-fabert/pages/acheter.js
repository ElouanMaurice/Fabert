import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import AchatBienList from "../components/AchatBienList";
import FilterBar from "../components/FilterBar";
import styles from "../styles/acheter.module.css"; // Import du CSS
import Footer from '../components/Footer';

const Acheter = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    types: [],
    sortOrder: "",
    location: "",
    minPrice: null,
    maxPrice: null,
  });

  // Récupérer les biens depuis l'API lorsque le composant est monté
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Assure-toi que l'URL est correcte pour récupérer les biens
        const response = await fetch("http://localhost:3001/api/properties");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des biens");
        }
        const data = await response.json();
        console.log("Biens récupérés :", data);  // Ajout du console.log pour debug
        setProperties(data); // Met à jour les propriétés
        setFilteredProperties(data); // Applique les filtres sur les propriétés dès le début
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProperties();
  }, []);

  // Appliquer les filtres aux propriétés
  useEffect(() => {
    const applyFilters = () => {
      let filtered = properties;

      // Filtre par type
      if (filters.types.length > 0) {
        filtered = filtered.filter(property =>
          filters.types.includes(property.type)
        );
      }

      // Filtre par localisation
      if (filters.location) {
        filtered = filtered.filter(property =>
          property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Filtre par prix
      if (filters.minPrice !== null) {
        filtered = filtered.filter(property => property.price >= filters.minPrice);
      }
      if (filters.maxPrice !== null) {
        filtered = filtered.filter(property => property.price <= filters.maxPrice);
      }

      // Trier les propriétés si nécessaire
      if (filters.sortOrder) {
        filtered = filtered.sort((a, b) => {
          if (filters.sortOrder === "asc") {
            return a.price - b.price;
          } else if (filters.sortOrder === "desc") {
            return b.price - a.price;
          }
          return 0;
        });
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  return (
    <div>
      <Header />
      <div className={styles.firstcontainer}>
        <h1 className={styles.title}>Biens Immobiliers Kti Immo</h1>

        {/* Conteneur principal avec Flexbox */}
        <div className={styles.container}>
          {/* Barre de filtre à gauche */}
          <div className={styles.sidebar}>
            <FilterBar setFilters={setFilters} />
          </div>

          {/* Liste des propriétés à droite */}
          <div className={styles.content}>
            <AchatBienList properties={filteredProperties} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Acheter;
