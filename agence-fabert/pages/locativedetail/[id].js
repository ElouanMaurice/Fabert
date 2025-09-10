import { useRouter } from "next/router";
import Link from "next/link";
import Slider from "react-slick";
import Footer from '../../components/Footer';
import styles from "../../styles/AchatDetail.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LocativeDetail = ({ location }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Chargement...</p>;
  if (!location) return <p>Bien non trouvé...</p>;

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/louer?typeLocation=locative")}
        >
          ← Retour aux locations
        </button>

        {/* Carousel */}
        {location.images && location.images.length > 0 ? (
          <div className={styles.carouselWrapper}>
            <Slider
              dots={true}
              arrows={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              className={styles.carousel}
            >
              {location.images.map((url, idx) => (
                <div key={idx} className={styles.slide}>
                  <img src={url} alt={`photo-${idx}`} className={styles.slideImage} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <img className={styles.image} src="/placeholder.png" alt="Pas d'image" />
        )}

        <div className={styles.detailsCard}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{location.title}</h1>
            <div className={styles.price}>{location.price} € / mois</div>
          </div>

          {/* Infos principales */}
          <div className={styles.infoRow}>
            <div>Ville: {location.location}</div>
            <div>Surface: {location.surface ?? "N/A"} m²</div>
            <div>Pièces: {location.rooms ?? "N/A"}</div>
            <div>Meublé: {location.furnished ? "Oui" : "Non"}</div>
          </div>

          {/* Description */}
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{location.description || "Pas de description."}</p>
          </div>

        

          {/* Équipements */}
          <div className={styles.infoSection}>
            <h3>Équipements & prestations</h3>
            <div className={styles.infoGrid}>
              <div>Balcon: {location.balcony ? "Oui" : "Non"}</div>
              <div>Terrasse: {location.terrace ? "Oui" : "Non"}</div>
              <div>Garage: {location.garage ? "Oui" : "Non"}</div>
              <div>Parking: {location.parking ? "Oui" : "Non"}</div>
              <div>Cave: {location.cellar ? "Oui" : "Non"}</div>
              <div>Ascenseur: {location.elevator ? "Oui" : "Non"}</div>
              <div>Piscine: {location.pool ? "Oui" : "Non"}</div>
              <div>Jardin: {location.garden ? "Oui" : "Non"}</div>
              <div>Climatisation: {location.airConditioning ? "Oui" : "Non"}</div>
            </div>
          </div>

          {/* Caractéristiques */}
                <div className={styles.infoSection}>
                  <h3>Caractéristiques</h3>
                  <div className={styles.infoGrid}>
                    <div>Année: {location.yearBuilt ?? "N/A"}</div>
                    <div>
                      Étage: {location.floor ?? "N/A"} / {location.totalFloors ?? "N/A"}
                    </div>
                    <div>Chauffage: {location.heatingType || "N/A"}</div>
                  </div>
                </div>

          {/* Référence */}
          <p className={styles.reference}>Réf: {location.reference}</p>

         
        </div>
         {/* Bouton contact */}
          <Link href="/contact">
            <button className={styles.contactButton}>Contacter l'agence</button>
          </Link>
      </div>

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles/${params.id}`);
    if (!res.ok) throw new Error("Bien non trouvé");

    const location = await res.json();
    return { props: { location } };
  } catch (error) {
    return { notFound: true };
  }
}

export default LocativeDetail;
