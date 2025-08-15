import Link from 'next/link';
import styles from '../styles/AdminHome.module.css'; // adapte le chemin selon ta structure

export default function AdminHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏠 Admin - Tableau de bord</h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/achat" className={styles.link}>🛒 Gérer les ventes </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/location-annuelle" className={styles.link}>📅 Gérer les locations annuelles</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/location-saisonniere" className={styles.link}>🏖️ Gérer les locations saisonnières</Link>
        </li>
      </ul>
    </div>
  );
}
