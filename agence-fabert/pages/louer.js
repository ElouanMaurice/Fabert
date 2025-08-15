import React, { useState, useEffect } from 'react';
import styles from '../styles/louer.module.css';
import Header from '../components/Header';
import LocativeBienList from '../components/LocativeBienList';
import SaisonniereBienList from '../components/SaisonniereBienList';
import FilterBarLocative from '../components/FilterBarLocative';
import FilterBarSaisonniere from '../components/FilterBarSaisonniere';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const Louer = () => {
  const router = useRouter();

  // Initialiser typeLocation dès que la query est dispo pour éviter flash vide
  const [typeLocation, setTypeLocation] = useState(router.query.typeLocation || null);

  // Etats des biens locatifs (annuels) et saisonniers
  const [locatives, setLocatives] = useState([]);
  const [saisonnieres, setSaisonnieres] = useState([]);

  // Etats pour afficher un loader pendant fetch
  const [loadingLocatives, setLoadingLocatives] = useState(true);
  const [loadingSaisonnieres, setLoadingSaisonnieres] = useState(true);

  // Etats filtres
  const [locativeFilters, setLocativeFilters] = useState({
    types: [],
    location: "",
    minPrice: null,
    maxPrice: null,
    sortOrder: "",
  });
  const [saisonniereFilters, setSaisonniereFilters] = useState({
    types: [],
    location: "",
    minPrice: null,
    maxPrice: null,
    sortOrder: "",
  });

  // Etats des biens filtrés
  const [displayedLocatives, setDisplayedLocatives] = useState([]);
  const [displayedSaisonnieres, setDisplayedSaisonnieres] = useState([]);

  // Fetch des biens locatifs et saisonniers
  useEffect(() => {
    async function fetchData() {
      try {
        const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles`);
        const resSaison = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres`);
        

        if (!resLoc.ok || !resSaison.ok) {
          throw new Error('Erreur lors du chargement des biens');
        }

        const locativesData = await resLoc.json();
        const saisonnieresData = await resSaison.json();

        setLocatives(locativesData);
        setSaisonnieres(saisonnieresData);
        setDisplayedLocatives(locativesData);
        setDisplayedSaisonnieres(saisonnieresData);

        setLoadingLocatives(false);
        setLoadingSaisonnieres(false);
      } catch (error) {
        console.error(error);
        setLoadingLocatives(false);
        setLoadingSaisonnieres(false);
      }
    }
    fetchData();
  }, []);

  // Met à jour typeLocation quand la query change
  useEffect(() => {
    if (router.query.typeLocation) {
      setTypeLocation(router.query.typeLocation);
    }
  }, [router.query.typeLocation]);

  // Fonction de filtrage générique
  const filterProperties = (properties, filters) => {
    let filtered = [...properties];

    if (filters.types.length > 0) {
      filtered = filtered.filter(p => filters.types.includes(p.type));
    }

    if (filters.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice !== null && filters.minPrice !== "") {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== null && filters.maxPrice !== "") {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.sortOrder) {
      filtered.sort((a, b) =>
        filters.sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return filtered;
  };

  // Appliquer filtres sur locatives
  useEffect(() => {
    setDisplayedLocatives(filterProperties(locatives, locativeFilters));
  }, [locatives, locativeFilters]);

  // Appliquer filtres sur saisonnieres
  useEffect(() => {
    setDisplayedSaisonnieres(filterProperties(saisonnieres, saisonniereFilters));
  }, [saisonnieres, saisonniereFilters]);

  // Gérer clic sur un bien pour aller au détail
  const handleDetailClick = (id) => {
    router.push(`/louer/${id}?typeLocation=${typeLocation}`);
  };

  return (
    <div>
      <Header />
      <div className={styles.firstcontainer}>
        <h1 className={styles.h1}>Bienvenue sur la page des locations Kti Immo</h1>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${typeLocation === 'locative' ? styles.active : ''}`}
            onClick={() => {
              setTypeLocation('locative');
              router.push('/louer?typeLocation=locative');
            }}
          >
            Location Annuelle
          </button>
          <button
            className={`${styles.button} ${typeLocation === 'saisonniere' ? styles.active : ''}`}
            onClick={() => {
              setTypeLocation('saisonniere');
              router.push('/louer?typeLocation=saisonniere');
            }}
          >
            Location Saisonnière
          </button>
        </div>

        {(typeLocation === null || typeLocation === '') && (
          <h4 className={styles.h4}>Sélectionnez un type de location pour commencer.</h4>
        )}

{typeLocation && (
  <div className={styles.container}>
    <div className={styles.sidebar}>
     {typeLocation === 'locative' ? (
  <FilterBarLocative
    filters={locativeFilters}
    setFilters={setLocativeFilters}
  />
) : (
  <FilterBarSaisonniere
    filters={saisonniereFilters}
    setFilters={setSaisonniereFilters}
  />
)}

    </div>
    <div className={styles.content}>
      {typeLocation === 'locative' ? (
        <LocativeBienList locations={displayedLocatives} />
      ) : (
        <SaisonniereBienList saisonnieres={displayedSaisonnieres} />
      )}
    </div>
  </div>
)}

        
      </div>
      <Footer />
    </div>
  );
};

export default Louer;
