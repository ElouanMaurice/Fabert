import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/FormulaireAdmin.module.css';

export default function AchatPage() {
  const [biens, setBiens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/properties')
      .then(res => res.json())
      .then(data => setBiens(data));
  }, []);

  const supprimerBien = async (id) => {
    await fetch(`http://localhost:3001/api/properties/${id}`, {
      method: 'DELETE',
    });
    setBiens(biens.filter(b => b._id !== id));
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1 className={styles.formTitle}>🛒 Gérer les ventes (Achat)</h1>

        <Link href="/achat/ajouter" className={styles.submitButton}>
  ➕ Ajouter un bien
</Link>

        <ul className={styles.itemList}>
          {biens.map(bien => (
            <li key={bien._id} className={styles.item}>
              <span className={styles.bienTitle}>
                {bien.title} – {bien.price}€ – {bien.location}
              </span>
              <div className={styles.itemButtons}>
                <Link href={`/achat/modifier/${bien._id}`}>
                  ✏️ Modifier
                </Link>
                <button onClick={() => supprimerBien(bien._id)}>🗑 Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
