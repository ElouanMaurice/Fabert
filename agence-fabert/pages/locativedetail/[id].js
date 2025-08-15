import { useRouter } from "next/router";
import styles from "../../styles/LocativeDetail.module.css";
import Slider from "react-slick";
import Link from "next/link";
import Footer from '../../components/Footer';


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
      <div className={styles.publication}>
        <h1 className={styles.title}>{location.title}</h1>

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
                  <img
                    src={url}
                    alt={`photo-${idx}`}
                    className={styles.slideImage}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <img
            className={styles.image}
            src="/placeholder.png"
            alt="Pas d'image"
          />
        )}

        <p className={styles.location}>{location.location}</p>
        <p className={styles.price}>{location.price} € / mois</p>
        <p className={styles.surface}>Surface : {location.surface} m²</p>
        <p className={styles.rooms}>Pièces : {location.rooms}</p>
        <p className={styles.furnished}>Meublé : {location.furnished ? "Oui" : "Non"}</p>
        <p className={styles.description}>{location.description || "Pas de description."}</p>
        <p className={styles.reference}>Référence {location.reference}</p>

        <Link href={'/contact'}>
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
    const res = await fetch(`http://localhost:3001/api/locations-annuelles/${params.id}`);
    if (!res.ok) throw new Error("Bien non trouvé");

    const location = await res.json();
    return { props: { location } };
  } catch (error) {
    return { notFound: true };
  }
}

export default LocativeDetail;