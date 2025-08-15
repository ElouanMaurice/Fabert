    // admin/components/AdminLayout.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/AdminLayout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>Admin KTI Immo</Link>
        <ul className={styles.menu}>
          <li><Link href="/achat" className={styles.menuItem}>Achat</Link></li>
          <li><Link href="/location-annuelle" className={styles.menuItem}>Locations annuelles</Link></li>
          <li><Link href="/location-saisonniere" className={styles.menuItem}>Locations saisonnières</Link></li>
        </ul>
      </nav>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
