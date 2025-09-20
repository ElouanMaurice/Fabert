import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/AchatDetail.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../../components/Footer';
import dynamic from 'next/dynamic';



const AchatDetail = ({ property }) => {
  const router = useRouter();

  const AchatDetailMap = dynamic(() => import('../../components/AchatDetailMap'), { ssr: false });

  if (router.isFallback) return <p>Chargement...</p>;
  if (!property) return <p>Bien non trouvé...</p>;

  return (
    <>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => router.push("/acheter")}>
          ← Retour aux biens en vente
        </button>

        <div className={styles.publication}>
          {/* Carousel images */}
          {property.images && property.images.length > 0 ? (
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
                {property.images.map((url, idx) => (
                  <div key={idx} className={styles.slide}>
                    <img src={url} alt={`photo-${idx}`} className={styles.slideImage} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <img className={styles.image} src="/placeholder.png" alt="Pas d'image" />
          )}

          {/* Détails */}
          <div className={styles.detailsCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>{property.title}</h1>
              <div className={styles.price}>{property.price} €</div>
            </div>

            {/* Infos principales */}
            <div className={styles.infoRow}>
              <div>Ville: {property.location}</div>
              <div>Surface: {property.surface ?? "N/A"} m²</div>
              <div>Pièces: {property.rooms ?? "N/A"}</div>
              <div>Chambre: {property.chambre ?? "N/A"}</div>
              <div>Salle de bain: {property.bathrooms ?? "N/A"}</div>
              <div>WC: {property.wc ?? "N/A"}</div>
              <div>Type: {property.type}</div>
            </div>

            {/* Description */}
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{property.description || "Pas de description."}</p>
            </div>

             {/* Équipements */}
            <div className={styles.infoSection}>
              <h3>Équipements & prestations</h3>
              <div className={styles.infoGrid}>
                <div>Balcon: {property.balcon ? "Oui" : "Non"}</div>
                <div>Terrasse: {property.terrasse ? "Oui" : "Non"}</div>
                <div>Garage: {property.garage ? "Oui" : "Non"}</div>
                <div>Parking: {property.parking ? "Oui" : "Non"}</div>
                <div>Cave: {property.cave ? "Oui" : "Non"}</div>
                <div>Ascenseur: {property.ascenseur ? "Oui" : "Non"}</div>
                <div>Piscine: {property.piscine ? "Oui" : "Non"}</div>
                <div>Jardin: {property.jardin ? "Oui" : "Non"}</div>
                <div>Climatisation: {property.climatisation ? "Oui" : "Non"}</div>
                <div>Interphone: {property.interphone ? "Oui" : "Non"}</div>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className={styles.infoSection}>
              <h3>Caractéristiques</h3>
              <div className={styles.infoGrid}>
                <div>Année: {property.yearBuilt ?? "N/A"}</div>
                <div>Étage: {property.floor ?? "N/A"}</div>
                <div>Chauffage: {property.heatingType || "N/A"}</div>
                <div>Charges: {property.charge ?? "N/A"} €</div>
                <div>Taxe foncière: {property.taxe ?? "N/A"} €</div>
                <div>Performance énergétique: {property.energyRating || "N/A"}</div>
                <div>GES: {property.ges || "N/A"}</div>
              </div>
            </div>
<div className={styles.mapContainer}>

<AchatDetailMap lat={property.lat} lng={property.lng} address={property.address} />
</div>

            <p className={styles.reference}>Réf: {property.reference}</p>
          </div>

          <Link href="/contact" passHref>
            <button className={styles.contactButton}>Contacter l'agence</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${params.id}`);
    if (!res.ok) throw new Error("Bien non trouvé");

    const property = await res.json();
    return { props: { property } };
  } catch (error) {
    return { notFound: true };
  }
}

export default AchatDetail;
