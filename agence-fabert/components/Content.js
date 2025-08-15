import styles from '../styles/Content.module.css';
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Content = () => {
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

  return (      
    <div className={styles.Content}>
      <div className={styles.titreh1}>
        <h1 className={styles.h1}>Découvrez Nos Prestations</h1>
      </div>
    
      <div className={styles.explication}>
        <div className={styles.gestionlocative}>
        <img src="/prestation.jpeg" alt="Gestion locative" className={styles.prestationImage} />
          <h2 className={styles.h2}>Gestion locative</h2>
          <p>Confiez-nous la gestion complète de votre bien. Nous nous occupons de la recherche de locataires, de l’administratif et de l’entretien pour une location en toute sérénité.</p>
          <div className={styles.boutonbien}>Voir nos locations</div>
        </div>

        <div className={styles.gestionsaisonniere}>
        <img src="/prestation.jpeg" alt="Gestion locative" className={styles.prestationImage} />
          <h2 className={styles.h2}>Location saisonnière</h2>
          <p>Optimisez vos revenus en louant votre bien en courte durée. Nous gérons les réservations, l’accueil des voyageurs et l’entretien pour une expérience sans souci.</p>
          <div className={styles.boutonbien}>Voir nos locations</div>
        </div>

        <div className={styles.conciergerie}>
        <img src="/prestation.jpeg" alt="Gestion locative" className={styles.prestationImage} />
          <h2 className={styles.h2}>Conciergerie</h2>
          <p>Un service sur-mesure pour les propriétaires et voyageurs : ménage, linge, accueil et assistance personnalisée, pour une tranquillité totale.</p>
        </div>

        <div className={styles.achat}>
        <img src="/prestation.jpeg" alt="Gestion locative" className={styles.prestationImage} />
          <h2 className={styles.h2}>Achat d'un bien</h2>
          <p>Vous cherchez à investir sur l’Île de Ré ? Nous vous accompagnons à chaque étape, de la sélection du bien jusqu’à la signature de l’acte de vente.</p>
          <p onClick={() => window.location.href = '/acheter'} className={styles.boutonbien}>Voir nos biens</p> {/* Utilisation du <p> pour la navigation */}
        </div>
      </div>
      
     
      <div className={styles.presentation}>
  <div className={styles.texte}>
    KTI Immo – Votre partenaire immobilier sur l'Île de Ré
    <br />
    Fondée par Cathy Fabert, KTI Immo est une agence immobilière locale engagée à vous accompagner de manière personnalisée dans tous vos projets d’achat, de vente ou de location sur l’Île de Ré. Grâce à une connaissance fine du marché et une approche humaine, professionnelle et transparente, nous mettons tout en œuvre pour vous aider à concrétiser vos rêves immobiliers en toute sérénité.
    <br />
    Que vous soyez à la recherche d’une maison de vacances, d’un investissement ou d’un bien à vendre, KTI Immo est votre interlocuteur de confiance pour profiter pleinement de cette île unique.

    <div className={styles.textCenterButton}>
  <Link href='agence' legacyBehavior>
    <a className={styles.boutonbienPresentation}>En savoir plus</a>
  </Link>
</div>
  </div>

  <img className={styles.photofb} src="/photopré.jpg" alt="Photo de Présentation" />
</div>
          </div>
         
  );
};

export default Content;
