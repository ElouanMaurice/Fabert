import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../../styles/AchatDetail.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../../components/Footer';


const AchatDetail = ({ property }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Chargement...</p>;
  if (!property) return <p>Bien non trouvé...</p>;

  return (
    <>
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push("/acheter")}>
        ← Retour aux biens en vente
      </button>
      <div className={styles.publication}>
        <h1 className={styles.title}>{property.title}</h1>

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

        {/* Bloc informations générales */}
<div className={styles.infoSection}>
  <h3 className={styles.sectionTitle}>Informations générales</h3>
  <p><strong>Localisation :</strong> <span className={styles.infoValue}>{property.location}</span></p>
  <p><strong>Prix :</strong> <span className={styles.infoValue}>{property.price} €</span></p>
  <p><strong>Type :</strong> <span className={styles.infoValue}>{property.type}</span></p>
  <p><strong>Surface :</strong> <span className={styles.infoValue}>{property.surface ?? "N/A"} m²</span></p>
  <p><strong>Pièces :</strong> <span className={styles.infoValue}>{property.rooms ?? "N/A"}</span></p>
  <p><strong>Description :</strong> <span className={styles.infoValue}>{property.description || "Pas de description."}</span></p>
  <p className={styles.reference}>Référence {location.reference}</p>

</div>

{/* Bloc caractéristiques */}
<div className={styles.infoSection}>
  <h3 className={styles.sectionTitle}>Caractéristiques</h3>
  <p><strong>Année de construction :</strong> <span className={styles.infoValue}>{property.yearBuilt ?? "N/A"}</span></p>
  <p><strong>Étage :</strong> <span className={styles.infoValue}>{property.floor ?? "N/A"} / {property.totalFloors ?? "N/A"}</span></p>
  <p><strong>Exposition :</strong> <span className={styles.infoValue}>{property.exposure || "N/A"}</span></p>
  <p><strong>Vue :</strong> <span className={styles.infoValue}>{property.view || "N/A"}</span></p>
  <p><strong>Type de chauffage :</strong> <span className={styles.infoValue}>{property.heatingType || "N/A"}</span></p>
  <p><strong>Eau chaude :</strong> <span className={styles.infoValue}>{property.hotWater || "N/A"}</span></p>
</div>

{/* Équipements & prestations */}
<div className={styles.infoSection}>
  <h3 className={styles.sectionTitle}>Équipements & prestations</h3>
  <ul className={styles.equipmentList}>
    <li>Balcon : {property.balcony ? "Oui" : "Non"}</li>
    <li>Terrasse : {property.terrace ? "Oui" : "Non"}</li>
    <li>Garage : {property.garage ? "Oui" : "Non"}</li>
    <li>Parking : {property.parking ? "Oui" : "Non"}</li>
    <li>Cave : {property.cellar ? "Oui" : "Non"}</li>
    <li>Ascenseur : {property.elevator ? "Oui" : "Non"}</li>
    <li>Interphone : {property.intercom ? "Oui" : "Non"}</li>
    <li>Piscine : {property.pool ? "Oui" : "Non"}</li>
    <li>Jardin : {property.garden ? "Oui" : "Non"}</li>
    <li>Climatisation : {property.airConditioning ? "Oui" : "Non"}</li>
  </ul>
</div>

{/* Informations administratives */}
<div className={styles.infoSection}>
  <h3 className={styles.sectionTitle}>Informations administratives</h3>
  <p><strong>Charges :</strong> <span className={styles.infoValue}>{property.charges ?? "N/A"} €</span></p>
  <p><strong>Taxe foncière :</strong> <span className={styles.infoValue}>{property.propertyTax ?? "N/A"} €</span></p>
  <p><strong>Copropriété :</strong> <span className={styles.infoValue}>{property.coOwnership ? "Oui" : "Non"}</span></p>
  <p><strong>Nombre de lots :</strong> <span className={styles.infoValue}>{property.numberOfLots ?? "N/A"}</span></p>
  <p><strong>Classe énergie :</strong> <span className={styles.infoValue}>{property.energyRating || "N/A"}</span></p>
  <p><strong>GES :</strong> <span className={styles.infoValue}>{property.ges || "N/A"}</span></p>
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
    const res = await fetch(`http://localhost:3001/api/properties/${params.id}`);
    if (!res.ok) throw new Error("Bien non trouvé");

    const property = await res.json();
    return { props: { property } };
  } catch (error) {
    return { notFound: true };
  }
}

export default AchatDetail;
