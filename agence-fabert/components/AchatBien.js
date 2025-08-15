import styles from '../styles/AchatBien.module.css';
import React from "react";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AchatBien = ({ property }) => {
  return (
    <div className={styles.propertyCard}>
      {/* 🎯 Le carrousel n'est plus dans le <Link> */}
      <div className={styles.carouselWrapper}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={false}
          showStatus={false}
          swipeable={true}
          emulateTouch={true}
        >
          {property.images && property.images.length > 0 ? (
            property.images.map((imgUrl, index) => (
              <div key={index}>
                <img src={imgUrl} alt={`Image ${index + 1}`} className={styles.image} />
              </div>
            ))
          ) : (
            <div>
              <img src="/placeholder.png" alt="Pas d'image" className={styles.image} />
            </div>
          )}
        </Carousel>
      </div>

      {/* ✅ On clique ici pour aller voir les détails */}
      <Link href={`/achatdetail/${property._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className={styles.propertyCardInfo}>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
          <p>{property.price}€</p>
        </div>
      </Link>

      <Link href={`/achatdetail/${property._id}`}>
        <button className={styles.button}>Voir Détails</button>
      </Link>
    </div>
  );
};

export default AchatBien;
