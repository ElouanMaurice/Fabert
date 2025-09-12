import Head from "next/head";
import styles from "../styles/Estimer.module.css"; // Même style que pour Estimer
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Honoraires() {
  return (
    <div>
      <Header />
      <Head>
        <title>Honoraires | Agence Fabert</title>
        <meta
          name="description"
          content="Découvrez les honoraires de l'agence Fabert pour la vente, l'achat et la gestion de votre bien immobilier sur l'île de Ré."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Nos Honoraires</h1>
          <p className={styles.description}>
            Transparence et clarté dans nos tarifs pour tous vos projets immobiliers.
          </p>

          <p>
            <strong>Nos honoraires s’adaptent à chaque type de service :</strong>
          </p>

          <ul className={styles.list}>
            <li>Vente de biens : X% du prix de vente</li>
            <li>Achat de biens : frais fixes ou pourcentage selon le contrat</li>
            <li>Gestion locative : X% des loyers perçus</li>
            <li>Estimations et conseils personnalisés : inclus dans le suivi global</li>
          </ul>

          <p className={styles.conclusion}>
            Pour connaître nos tarifs exacts selon votre projet, n’hésitez pas à nous contacter.
          </p>

          <a href="/contact" className={styles.button}>
            Nous contacter
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
