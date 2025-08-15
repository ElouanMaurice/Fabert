import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/FormulaireAdmin.module.css';

export default function ListeLocationsAnnuelles() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles')
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  const supprimerLocation = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles/${id}`, {
      method: 'DELETE',
    });
    setLocations(locations.filter(l => l._id !== id));
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1 className={styles.formTitle}>📅 Locations à l'année</h1>
        <Link href="/location-annuelle/ajouter" className={styles.submitButton}>
          ➕ Ajouter une location
        </Link>

        <ul className={styles.itemList}>
          {locations.map(loc => (
            <li key={loc._id} className={styles.item}>
              <strong>{loc.title}</strong> – {loc.price}€/mois – {loc.location}
              <div className={styles.itemButtons}>
                <Link href={`/location-annuelle/modifier/${loc._id}`}>✏️ Modifier</Link>
                <button onClick={() => supprimerLocation(loc._id)}>🗑 Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
