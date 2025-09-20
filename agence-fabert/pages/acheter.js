import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import AchatBienList from "../components/AchatBienList";
import FilterBar from "../components/FilterBar";
import styles from "../styles/acheter.module.css"; // Import du CSS
import Footer from '../components/Footer';

const Acheter = () => {
  const [properties, setProperties] = useState([]);
 const [loading, setLoading] = React.useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
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


  // Récupérer les biens depuis l'API lorsque le composant est monté
  useEffect(() => {
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`);
      if (!response.ok) throw new Error("Erreur lors du chargement des biens");
      const data = await response.json();
            console.log("Données récupérées:", data); // <-- ici

      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);

useEffect(() => {
  const applyFilters = () => {
    let filtered = [...properties]; // copier pour ne pas muter l'original

    // 🔹 Filtre par type (saison, appartement, etc.)
   if (filters.types && filters.types.length > 0) {
  filtered = filtered.filter(property =>
    filters.types.includes(property.type?.toLowerCase())
  );
}


    // 🔹 Filtre par localisation
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // 🔹 Filtre par prix
    if (filters.minPrice !== null) {
      filtered = filtered.filter(property => property.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice);
    }

    // 🔹 Filtre par surface
    if (filters.surfaceMin !== null) {
      filtered = filtered.filter(property => property.surface >= filters.surfaceMin);
    }
    if (filters.surfaceMax !== null) {
      filtered = filtered.filter(property => property.surface <= filters.surfaceMax);
    }

    // 🔹 Filtre par chambres
    if (filters.chambres !== null) {
      filtered = filtered.filter(property => property.chambre >= filters.chambres);
    }

    // 🔹 Filtre par pièces
    if (filters.pieces !== null) {
      filtered = filtered.filter(property => property.rooms >= filters.pieces);
    }

    // 🔹 Tri par prix
    if (filters.sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (filters.sortOrder === "asc") return a.price - b.price;
        if (filters.sortOrder === "desc") return b.price - a.price;
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
            <AchatBienList properties={filteredProperties} loading={loading}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Acheter;
