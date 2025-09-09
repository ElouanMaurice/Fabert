import styles from '../styles/BienCard.module.css';

import React from "react";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LocativeBien = ({ location }) => {
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
            {location.images && location.images.length > 0 ? (
              location.images.map((img, i) => (
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
    <h3>{location.title}</h3>
    <div className={styles.price}> {location.price}€</div>
  </div>
           <div className={styles.infoRow}>
              <div>Ville: {location.location}</div>
             <div>Surface: {location.surface}m²</div>
             <div>Pièces: {location.rooms}</div>
             <div>Réf: {location.reference}</div>
           </div>
         </div>
      {/* </Link> */}
      <Link href={`/locativedetail/${location._id}`}>
        <button className={styles.button}>Voir Détails</button>
      </Link>
    </div>
  );
};

export default LocativeBien;
