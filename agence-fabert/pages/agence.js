import Head from "next/head";
import styles from "../styles/Estimer.module.css"; // on réutilise le style existant
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function NotreAgence() {
  const team = [
    { name: "Cathy Fabert", role: "Fondatrice / Conseillère principale", photo: "/photopré.jpg" },

  ];

  return (
    <div>
      <Header />
      <Head>
        <title>Notre Agence | KTI Immo</title>
        <meta
          name="description"
          content="Découvrez KTI Immo, votre agence immobilière de confiance sur l'île de Ré. Vente, achat, location, conseils personnalisés et accompagnement sur mesure."
        />
      </Head>

    

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Notre Agence</h1>

          <p className={styles.description}>
            KTI Immo – Votre partenaire immobilier sur l'Île de Ré
          </p>

          <p>
            Fondée par Cathy Fabert, KTI Immo est une agence locale qui vous
            accompagne de manière personnalisée dans tous vos projets d’achat,
            de vente ou de location.
          </p>

          <p>
            Grâce à notre connaissance fine du marché et une approche humaine,
            professionnelle et transparente, nous concrétisons vos projets
            immobiliers en toute sérénité.
          </p>

          {/* Notre mission / approche */}
          <h2 className={styles.title}>Notre Mission</h2>
          <p>
            Nous nous engageons à vous offrir un service complet et sur-mesure :
          </p>
          <ul className={styles.list}>
            <li>Estimation précise de votre bien</li>
            <li>Conseils personnalisés et transparence totale</li>
            <li>Accompagnement à chaque étape de votre projet</li>
            <li>Vente, achat et location en toute sécurité</li>
          </ul>

          {/* Notre équipe */}
          <h2 className={styles.title}>L'Agence</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
            {team.map((member, idx) => (
              <div key={idx} style={{ textAlign: 'center', maxWidth: '200px' }}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={200}
                  height={200}
                  style={{ borderRadius: '50%' }}
                />
                <h3 style={{ marginTop: '10px', fontSize: '1.1rem', color: '#2c6e49' }}>{member.name}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{member.role}</p>
              </div>
            ))}
          </div>

          <p className={styles.conclusion}>
            Chez KTI Immo, chaque client est unique. Nous mettons notre expertise
            et notre passion au service de vos projets pour vous garantir sérénité et réussite.
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
