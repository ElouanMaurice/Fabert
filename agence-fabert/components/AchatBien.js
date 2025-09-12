import styles from '../styles/AchatBien.module.css';
import React from "react";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const AchatBien = ({ property }) => {
  return (
    <div className={styles.propertyCard}>
      <div className={styles.carouselWrapper}>
        <Carousel
          showArrows
          showThumbs={false}
          infiniteLoop
          autoPlay={false}
          showStatus={false}
          swipeable
          emulateTouch
        >
          {property.images && property.images.length > 0 ? (
            property.images.map((imgUrl, index) => (
              <div key={index}>
                <Image
                  src={imgUrl}
                  alt={`Image ${index + 1}`}
                  width={500}
                  height={300}
                  className={styles.image}
                  placeholder="blur"
                  blurDataURL="/placeholder.png" // petit blur tant que l'image charge
                />
              </div>
            ))
          ) : (
            <div>
              <Image
                src="/placeholder.png"
                alt="Pas d'image"
                width={500}
                height={300}
                className={styles.image}
              />
            </div>
          )}
        </Carousel>
      </div>

      <Link href={`/achatdetail/${property._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className={styles.propertyCardInfo}>
          <div className={styles.titleRow}>
            <h3>{property.title}</h3>
            <div className={styles.price}>{property.price}€</div>
          </div>

          <div className={styles.infoRow}>
            <div>Ville : {property.location}</div>
            <div>Type : {property.type}</div>
            <div>Surface : {property.surface} m²</div>
            <div>Pièces : {property.rooms}</div>
            <div>Chambre : {property.chambre}</div>
            <div className={styles.reference}>Réf : {property.reference}</div>
          </div>
        </div>
      </Link>

      <Link href={`/achatdetail/${property._id}`}>
        <button className={styles.button}>Voir Détails</button>
      </Link>
    </div>
  );
};

export default AchatBien;
