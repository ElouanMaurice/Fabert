import { useRouter } from "next/router";
import Slider from "react-slick";
import Link from "next/link";
import Footer from '../../components/Footer';
import styles from "../../styles/AchatDetail.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SaisonniereDetail = ({ saison }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Chargement...</p>;
  if (!saison) return <p>Bien non trouvé...</p>;

  // Liste des équipements possibles
  const equipmentList = [
    'garage','garden','pool','terrace','balcony','parking',
    'cellar','elevator','intercom','airConditioning'
  ];

  // Filtrer uniquement ceux activés pour ce bien
  const equipments = equipmentList.filter(e => saison[e]);

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/louer?typeLocation=saisonniere")}
        >
          ← Retour aux locations
        </button>

        {/* Carousel */}
        {saison.images?.length > 0 ? (
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
              {saison.images.map((url, idx) => (
                <div key={idx} className={styles.slide}>
                  <img src={url} alt={`photo-${idx}`} className={styles.slideImage} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <img src="/placeholder.png" alt="Pas d'image" className={styles.image} />
        )}

        <div className={styles.detailsCard}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{saison.title}</h1>
            <div className={styles.price}>{saison.price} € / semaine</div>
          </div>

          {/* Infos principales */}
          <div className={styles.infoRow}>
            <div>Ville: {saison.location}</div>
            <div>Surface: {saison.surface ?? "N/A"} m²</div>
            <div>Pièces: {saison.rooms ?? "N/A"}</div>
            <div>Capacité: {saison.capacity ?? "N/A"} personnes</div>
          </div>

          {/* Description */}
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{saison.description ?? "Pas de description."}</p>
          </div>

          {/* Équipements */}
          {equipments.length > 0 && (
            <div className={styles.infoSection}>
              <h3>Équipements & prestations</h3>
              <div className={styles.infoGrid}>
                {equipments.map((eq, idx) => (
                  <div key={idx}>{eq.charAt(0).toUpperCase() + eq.slice(1)}</div>
                ))}
              </div>
            </div>
          )}

          {/* Référence */}
          <p className={styles.reference}>Réf: {saison.reference}</p>

        
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres/${params.id}`);
    if (!res.ok) throw new Error("Bien non trouvé");
    const saison = await res.json();
    return { props: { saison } };
  } catch (error) {
    return { notFound: true };
  }
}

export default SaisonniereDetail;
