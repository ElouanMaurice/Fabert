import Head from "next/head";
import styles from "../styles/Honoraire.module.css";

export default function Honoraires() {
  return (
    <>
      <Head>
        <title>Honoraires | Agence Fabert</title>
        <meta
          name="description"
          content="Consultez nos honoraires pour la vente et la location de biens immobiliers sur l'île de Ré."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Honoraires de l'Agence</h1>
          <p className={styles.description}>
            Retrouvez ci-dessous nos honoraires applicables pour la vente et la
            location de biens immobiliers.
          </p>

          <h2 className={styles.subtitle}>Vente</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prix de vente</th>
                <th>Honoraires TTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jusqu'à 150 000 €</td>
                <td>8 %</td>
              </tr>
              <tr>
                <td>De 150 001 € à 300 000 €</td>
                <td>7 %</td>
              </tr>
              <tr>
                <td>Au-delà de 300 000 €</td>
                <td>6 %</td>
              </tr>
            </tbody>
          </table>

          <h2 className={styles.subtitle}>Location</h2>
          <ul className={styles.list}>
            <li>Rédaction de bail : 8 € / m²</li>
            <li>État des lieux : 3 € / m²</li>
          </ul>

          <p className={styles.note}>
            Les honoraires sont calculés TVA incluse, et sont à la charge du
            vendeur sauf mention contraire.
          </p>
        </div>
      </div>
    </>
  );
}
