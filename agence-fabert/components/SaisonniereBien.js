import styles from '../styles/BienCard.module.css';

import React from "react";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SaisonniereBien = ({ saison }) => {
  return (
    <div className={styles.propertyCard}>
      {/* <Link href={`/saisonnieredetail/${saison._id}`} style={{ textDecoration: "none", color: "inherit" }}> */}
        <div className={styles.carouselWrapper}>
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop
            autoPlay={false}
            showStatus={false}
            showIndicators={true}
            swipeable
            emulateTouch
            dynamicHeight={false}
          >
            {saison.images && saison.images.length > 0 ? (
              saison.images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt={`Photo ${i + 1}`} className={styles.image} />
                </div>
              ))
            ) : (
              <div>
                <img src="/placeholder.png" alt="Image manquante" className={styles.image} />
              </div>
            )}
          </Carousel>
        </div>
        <div className={styles.propertyCardInfo}>
           <div className={styles.titleRow}>
    <h3>{saison.title}</h3>
    <div className={styles.pricesaison}> {saison.price}€/semaine</div>
  </div>
           <div className={styles.infoRow}>
            <div>Ville: {saison.location}</div>

             <div>Surface: {saison.surface}m²</div>
                          <div>Capacité: {saison.capacity}</div>

             <div>Chambres: {saison.chambre}</div>
    <div className={styles.reference}>Réf: {saison.reference}</div> 
           </div>
         </div>
      {/* </Link> */}
      <Link href={`/saisonnieredetail/${saison._id}`}>
        <button className={styles.button}>Voir Détails</button>
      </Link>
    </div>
  );
};

export default SaisonniereBien;
