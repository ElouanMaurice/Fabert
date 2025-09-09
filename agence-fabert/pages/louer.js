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
  const [typeLocation, setTypeLocation] = useState(router.query.typeLocation || 'locative');

  // Etats pour les biens
  const [locatives, setLocatives] = useState([]);
  const [saisonnieres, setSaisonnieres] = useState([]);

  const [displayedLocatives, setDisplayedLocatives] = useState([]);
  const [displayedSaisonnieres, setDisplayedSaisonnieres] = useState([]);

  // Etats filtres
  const [locativeFilters, setLocativeFilters] = useState({ types: [], location: "", minPrice: null, maxPrice: null, sortOrder: "" });
  const [saisonniereFilters, setSaisonniereFilters] = useState({ types: [], location: "", minPrice: null, maxPrice: null, sortOrder: "" });

  // Loading
  const [loadingLocatives, setLoadingLocatives] = useState(true);
  const [loadingSaisonnieres, setLoadingSaisonnieres] = useState(true);

  // Fetch locatives
  useEffect(() => {
    const fetchLocatives = async () => {
      try {
        setLoadingLocatives(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles`);
        if (!res.ok) throw new Error('Erreur fetch locatives');
        const data = await res.json();
        setLocatives(data);
        setDisplayedLocatives(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLocatives(false);
      }
    };
    fetchLocatives();
  }, []);

  // Fetch saisonnieres
  useEffect(() => {
    const fetchSaisonnieres = async () => {
      try {
        setLoadingSaisonnieres(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres`);
        if (!res.ok) throw new Error('Erreur fetch saisonnieres');
        const data = await res.json();
        setSaisonnieres(data);
        setDisplayedSaisonnieres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSaisonnieres(false);
      }
    };
    fetchSaisonnieres();
  }, []);

  // Appliquer filtres
  useEffect(() => {
    let filtered = [...locatives];
    if (locativeFilters.types.length) filtered = filtered.filter(p => locativeFilters.types.includes(p.type));
    if (locativeFilters.location) filtered = filtered.filter(p => p.location.toLowerCase().includes(locativeFilters.location.toLowerCase()));
    if (locativeFilters.minPrice !== null) filtered = filtered.filter(p => p.price >= locativeFilters.minPrice);
    if (locativeFilters.maxPrice !== null) filtered = filtered.filter(p => p.price <= locativeFilters.maxPrice);
    if (locativeFilters.sortOrder) filtered.sort((a,b) => locativeFilters.sortOrder==='asc'? a.price-b.price : b.price-a.price);
    setDisplayedLocatives(filtered);
  }, [locatives, locativeFilters]);

  useEffect(() => {
    let filtered = [...saisonnieres];
    if (saisonniereFilters.types.length) filtered = filtered.filter(p => saisonniereFilters.types.includes(p.type));
    if (saisonniereFilters.location) filtered = filtered.filter(p => p.location.toLowerCase().includes(saisonniereFilters.location.toLowerCase()));
    if (saisonniereFilters.minPrice !== null) filtered = filtered.filter(p => p.price >= saisonniereFilters.minPrice);
    if (saisonniereFilters.maxPrice !== null) filtered = filtered.filter(p => p.price <= saisonniereFilters.maxPrice);
    if (saisonniereFilters.sortOrder) filtered.sort((a,b) => saisonniereFilters.sortOrder==='asc'? a.price-b.price : b.price-a.price);
    setDisplayedSaisonnieres(filtered);
  }, [saisonnieres, saisonniereFilters]);

  return (
    <div>
      <Header />
      <div className={styles.firstcontainer}>
        <h1 className={styles.h1}>Bienvenue sur la page des locations Kti Immo</h1>

        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${typeLocation==='locative'?styles.active:''}`} onClick={() => setTypeLocation('locative')}>Location Annuelle</button>
          <button className={`${styles.button} ${typeLocation==='saisonniere'?styles.active:''}`} onClick={() => setTypeLocation('saisonniere')}>Location Saisonnière</button>
        </div>

        <div className={styles.container}>
          <div className={styles.sidebar}>
            {typeLocation==='locative' ? (
              <FilterBarLocative filters={locativeFilters} setFilters={setLocativeFilters}/>
            ) : (
              <FilterBarSaisonniere filters={saisonniereFilters} setFilters={setSaisonniereFilters}/>
            )}
          </div>

          <div className={styles.content}>
            {typeLocation==='locative' ? (
              <LocativeBienList locations={displayedLocatives} loading={loadingLocatives}/>
            ) : (
              <SaisonniereBienList saisonnieres={displayedSaisonnieres} loading={loadingSaisonnieres}/>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Louer;
