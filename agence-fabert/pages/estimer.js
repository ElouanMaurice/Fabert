import Head from "next/head";
import styles from "../styles/Estimer.module.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Estimer() {
  return (
     <div>
        <Header />
      <Head>
        <title>Faire Estimer | Agence Fabert</title>
        <meta
          name="description"
          content="Confiez-nous l’estimation de votre bien immobilier et bénéficiez de notre expérience sur l'île de Ré depuis plus de 45 ans."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Faire Estimer</h1>
          <p className={styles.description}>
            Vous souhaitez vendre votre bien immobilier ?
          </p>

          <p>
            <strong>Confiez-nous l’estimation de votre bien</strong> et
            bénéficiez de notre parfaite connaissance du marché immobilier
            réthais depuis plus de 45 ans.
          </p>

          <p>
            Nous vous proposons un <strong>service personnalisé de qualité</strong> :
          </p>

          <ul className={styles.list}>
            <li>
              Une estimation précise de votre bien en fonction de ses
              spécificités et de son environnement
            </li>
            <li>Des conseils adaptés à vos besoins</li>
            <li>Une mise en vente au meilleur prix en toute transparence</li>
            <li>
              Un accompagnement en toute sérénité au cours des étapes de la
              vente
            </li>
          </ul>

          <p className={styles.conclusion}>
            Vous souhaitez faire estimer votre bien immobilier ?
          </p>

          <a href="/contact" className={styles.button}>
            Demander une estimation
          </a>
        </div>
      </div>
    <Footer/>
</div>
  
  );
}
